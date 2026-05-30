
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { TeamCard } from "@/components/teams/TeamCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Briefcase, Loader2, Code, Layout, Play, Image as ImageIcon, Video, Camera, Mic2, Palette, Globe, Cpu, Smartphone, PenTool, Database, Terminal } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/layout/Footer";
import { useFirestore, useCollection, useDoc } from "@/firebase";
import { collection, query, where, doc } from "firebase/firestore";
import { useMemo } from "react";

const ICON_MAP: Record<string, any> = {
  Code, Layout, Play, ImageIcon, Video, Camera, Mic2, Palette, Globe, Cpu, Smartphone, PenTool, Database, Terminal
};

export default function CategoryTeamsPage() {
  const params = useParams();
  const categoryId = params?.id as string;
  const db = useFirestore();

  // Fetch the specific category details from the specialization ID (slug)
  const specRef = useMemo(() => {
    if (!db || !categoryId) return null;
    return doc(db, "specializations", categoryId);
  }, [db, categoryId]);
  
  const { data: category, loading: catLoading } = useDoc(specRef);

  // Fetch teams filtered by this category
  const teamsQuery = useMemo(() => {
    if (!db || !categoryId) return null;
    return query(collection(db, "teams"), where("categoryId", "==", categoryId));
  }, [db, categoryId]);

  const { data: teams, loading: teamsLoading } = useCollection(teamsQuery);

  if (catLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-headline font-bold mb-4">Category Not Found</h1>
        <Link href="/teams">
          <Button>Back to Specializations</Button>
        </Link>
      </div>
    );
  }

  const Icon = ICON_MAP[category.icon] || Briefcase;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
            <div className="space-y-6 flex-1">
              <Link href="/teams">
                <Button variant="ghost" size="sm" className="gap-2 font-bold -ml-2 text-muted-foreground hover:text-primary transition-colors">
                  <ChevronLeft size={16} /> Back to Specializations
                </Button>
              </Link>
              
              <div className="space-y-4">
                <div className="flex items-center gap-5">
                  <div className={cn(
                    "w-16 h-16 rounded-[24px] flex items-center justify-center text-white shadow-2xl transition-transform hover:scale-110 duration-500 bg-muted overflow-hidden",
                    category.color === 'blue' && "bg-blue-500 shadow-blue-500/20",
                    category.color === 'pink' && "bg-pink-500 shadow-pink-500/20",
                    category.color === 'purple' && "bg-purple-500 shadow-purple-500/20",
                    category.color === 'amber' && "bg-amber-500 shadow-amber-500/20",
                    category.color === 'rose' && "bg-rose-500 shadow-rose-500/20",
                    category.color === 'cyan' && "bg-cyan-500 shadow-cyan-500/20",
                    category.color === 'indigo' && "bg-indigo-500 shadow-indigo-500/20",
                  )}>
                    {category.imageUrl ? (
                      <div className="relative w-full h-full">
                        <Image src={category.imageUrl} alt={category.label} fill className="object-cover" />
                      </div>
                    ) : (
                      <Icon size={32} />
                    )}
                  </div>
                  <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-tighter leading-none">
                    {category.label} <span className="text-muted-foreground/20 italic">Units</span>
                  </h1>
                </div>
                <p className="text-xl text-muted-foreground max-w-2xl font-medium leading-relaxed">
                  {category.description} Join a high-impact squad and build your collective portfolio.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {teamsLoading ? (
               <div className="col-span-full flex justify-center py-12">
                 <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
               </div>
            ) : teams && teams.length > 0 ? (
              teams.map((team: any) => (
                <TeamCard key={team._id} {...team} />
              ))
            ) : (
              <div className="col-span-full py-32 text-center bento-card border-2 border-dashed bg-muted/5 group">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Briefcase className="h-10 w-10 text-muted-foreground/40" />
                </div>
                <h3 className="text-3xl font-headline font-bold text-muted-foreground">No active squads right now</h3>
                <p className="text-muted-foreground mt-3 max-w-sm mx-auto text-lg">
                  New units form every week. Keep an eye on this space!
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
