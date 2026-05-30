
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn, Menu, LogOut, User as UserIcon, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useUser, useAuth } from "@/firebase";
import { signOut } from "firebase/auth";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const ADMIN_EMAIL = "codenine0504@gmail.com";

export function Navbar() {
  const { user } = useUser();
  const auth = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    if (!auth) return;
    await signOut(auth);
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      scrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg shadow-primary/20">
            C9
          </div>
          <span className="font-headline text-xl font-bold tracking-tight hidden sm:block">
            Code-9 <span className="text-primary">Teams</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link href="/teams" className="text-sm font-bold hover:text-primary transition-colors">Join a Team</Link>
          <Link href="/showcase" className="text-sm font-bold hover:text-primary transition-colors">Elite Members</Link>
          <Link href="/services" className="text-sm font-bold hover:text-primary transition-colors">Services</Link>
          <Link href="/about" className="text-sm font-bold hover:text-primary transition-colors">About</Link>
        </div>

        <div className="flex items-center space-x-4">
          {!user ? (
            <>
              <Link href="/auth/login">
                <Button variant="ghost" className="hidden sm:flex items-center gap-2 font-bold">
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button className="rounded-full px-6 shadow-lg shadow-primary/20 font-bold vibrant-gradient border-none">
                  Apply for Teams
                </Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              {user.email === ADMIN_EMAIL && (
                <Link href="/dashboard/admin/console">
                  <Button variant="outline" size="sm" className="hidden sm:flex gap-2 rounded-full border-primary/20 text-primary font-bold">
                    <Settings size={14} />
                    Admin Console
                  </Button>
                </Link>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {user.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 rounded-2xl p-2" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-bold leading-none">{user.email?.split('@')[0]}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="rounded-xl h-10 cursor-pointer">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                  </DropdownMenuItem>
                  {user.email === ADMIN_EMAIL && (
                    <DropdownMenuItem className="rounded-xl h-10 cursor-pointer" asChild>
                      <Link href="/dashboard/admin/console">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Admin Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="rounded-xl h-10 cursor-pointer text-destructive focus:text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
