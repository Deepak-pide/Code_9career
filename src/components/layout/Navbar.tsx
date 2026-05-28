
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User, LogIn, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      scrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-xl">
            C9
          </div>
          <span className="font-headline text-xl font-bold tracking-tight hidden sm:block">
            Code-9 <span className="text-primary">Portal</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link href="/opportunities" className="text-sm font-medium hover:text-primary transition-colors">Opportunities</Link>
          <Link href="/showcase" className="text-sm font-medium hover:text-primary transition-colors">Showcase</Link>
          <Link href="/community" className="text-sm font-medium hover:text-primary transition-colors">Community</Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/auth/login">
            <Button variant="ghost" className="hidden sm:flex items-center gap-2">
              <LogIn className="w-4 h-4" />
              Sign In
            </Button>
          </Link>
          <Link href="/opportunities">
            <Button className="rounded-full px-6 shadow-lg shadow-primary/20">
              Apply Now
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
