
"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { LogIn, UserPlus, ShieldCheck, Sparkles, Loader2 } from "lucide-react";

export default function AuthPage() {
  const auth = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async (type: "login" | "signup") => {
    if (!auth) return;
    setLoading(true);
    try {
      if (type === "login") {
        await signInWithEmailAndPassword(auth, email, password);
        toast({ title: "Welcome back!", description: "Successfully signed in." });
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        toast({ title: "Account created!", description: "Welcome to Code-9." });
      }
      router.push("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: error.message || "An error occurred during authentication.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-6 flex items-center justify-center relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
        
        <div className="w-full max-w-md">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-muted/50 p-1 rounded-2xl h-14">
              <TabsTrigger value="login" className="rounded-xl font-bold h-12 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="rounded-xl font-bold h-12 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card className="bento-card border-none shadow-2xl">
                <CardHeader className="space-y-2 text-center">
                  <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-primary/20">
                    <LogIn size={24} />
                  </div>
                  <CardTitle className="text-3xl font-headline font-bold">Welcome Back</CardTitle>
                  <CardDescription className="text-muted-foreground font-medium italic">
                    "Access your core team dashboard."
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="name@example.com" 
                      className="h-12 rounded-xl"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••" 
                      className="h-12 rounded-xl"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full h-14 rounded-2xl font-bold text-lg vibrant-gradient border-none shadow-xl shadow-primary/20 transition-all hover:scale-[1.02]"
                    disabled={loading}
                    onClick={() => handleAuth("login")}
                  >
                    {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Sign In to Portal"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="signup">
              <Card className="bento-card border-none shadow-2xl">
                <CardHeader className="space-y-2 text-center">
                  <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-primary/20">
                    <UserPlus size={24} />
                  </div>
                  <CardTitle className="text-3xl font-headline font-bold">Join the Elite</CardTitle>
                  <CardDescription className="text-muted-foreground font-medium italic">
                    "Start building your collective legacy today."
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email Address</Label>
                    <Input 
                      id="signup-email" 
                      type="email" 
                      placeholder="name@example.com" 
                      className="h-12 rounded-xl"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input 
                      id="signup-password" 
                      type="password" 
                      placeholder="••••••••" 
                      className="h-12 rounded-xl"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full h-14 rounded-2xl font-bold text-lg vibrant-gradient border-none shadow-xl shadow-primary/20 transition-all hover:scale-[1.02]"
                    disabled={loading}
                    onClick={() => handleAuth("signup")}
                  >
                    {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Create Your Profile"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-12 flex items-center gap-4 bg-muted/30 p-4 rounded-2xl border border-muted/50">
            <ShieldCheck className="h-10 w-10 text-primary opacity-50" />
            <p className="text-xs text-muted-foreground font-medium leading-relaxed">
              By continuing, you agree to Code-9's <span className="font-bold text-foreground underline underline-offset-2">Terms of Service</span> and <span className="font-bold text-foreground underline underline-offset-2">Privacy Policy</span>.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
