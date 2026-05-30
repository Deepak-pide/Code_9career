
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, Loader2, Code, Layout, Play, Image as ImageIcon, Video, Camera, Mic2, Palette, Globe, Cpu, Smartphone, PenTool, Database, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { useFirestore, useCollection } from "@/firebase";
import { collection } from "firebase/firestore";
import { Footer } from "@/components/layout/Footer";

const ICON_MAP: Record<string, any> = {
  Code, Layout, Play, ImageIcon, Video, Camera, Mic2, Palette, Globe, Cpu, Smartphone, PenTool, Database, Terminal
};

export default function TeamsPage() {
  const [search, setSearch] = useState("");
  const db = useFirestore();

  const specsQuery = useMemo(() => db ? collection(db, "specializations") : null, [db]);
  const { data: specializations, loading } = useCollection(specsQuery);

  const filteredCategories = useMemo(() => {
    if (!specializations) return [];
    return specializations.filter(cat => 
      cat.label.toLowerCase().includes(search.toLowerCase()) || 
      cat.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [specializations, search]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12 space-y-6 text-center">
            <h1 className="text-5xl md:text-7xl font-headline font-bold leading-[1.1]">
              Choose Your <span className="vibrant-text italic underline decoration-primary/20">Specialization.</span>
            </h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Select a discipline to explore active core teams and find where you belong.
            </p>
          </header>

          <div className="relative mb-16 max-w-2xl mx-auto">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input 
              placeholder="Search specializations..." 
              className="pl-14 h-16 rounded-[24px] shadow-sm border-2 border-muted focus-visible:ring-primary font-bold text-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((cat: any) => {
                const Icon = ICON_MAP[cat.icon] || Layout;
                return (
                  <Link key={cat._id} href={`/teams/${cat.id}`}>
                    <div className={cn(
                      "bento-card group h-full p-8 transition-all duration-500 hover:-translate-y-2 border-2 hover:border-primary/40 relative overflow-hidden flex flex-col justify-between",
                      "hover:shadow-2xl hover:shadow-primary/5"
                    )}>
                      <div className={cn(
                        "absolute -right-8 -bottom-8 w-32 h-32 opacity-5 rounded-full",
                        cat.color === 'blue' && "bg-blue-500",
                        cat.color === 'pink' && "bg-pink-500",
                        cat.color === 'purple' && "bg-purple-500",
                        cat.color === 'amber' && "bg-amber-500",
                        cat.color === 'rose' && "bg-rose-500",
                        cat.color === 'cyan' && "bg-cyan-500",
                        cat.color === 'indigo' && "bg-indigo-500",
                      )}></div>

                      <div className="space-y-6 relative z-10">
                        <div className={cn(
                          "w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 overflow-hidden bg-muted",
                          cat.color === 'blue' && "bg-blue-500 shadow-blue-500/20",
                          cat.color === 'pink' && "bg-pink-500 shadow-pink-500/20",
                          cat.color === 'purple' && "bg-purple-500 shadow-purple-500/20",
                          cat.color === 'amber' && "bg-amber-500 shadow-amber-500/20",
                          cat.color === 'rose' && "bg-rose-500 shadow-rose-500/20",
                          cat.color === 'cyan' && "bg-cyan-500 shadow-cyan-500/20",
                          cat.color === 'indigo' && "bg-indigo-500 shadow-indigo-500/20",
                        )}>
                          {cat.imageUrl ? (
                            <div className="relative w-full h-full">
                               <Image 
                                 src={cat.imageUrl} 
                                 alt={cat.label} 
                                 fill 
                                 className="object-cover" 
                               />
                            </div>
                          ) : (
                            <Icon size={32} />
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="text-3xl font-headline font-bold group-hover:text-primary transition-colors">{cat.label}</h3>
                          <p className="text-muted-foreground font-medium leading-relaxed">{cat.description}</p>
                        </div>
                      </div>

                      <div className="pt-8 flex items-center gap-2 text-primary font-bold group-hover:translate-x-2 transition-transform">
                        Explore Teams <ArrowRight size={18} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
