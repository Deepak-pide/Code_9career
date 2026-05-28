
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { TeamCard } from "@/components/teams/TeamCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Briefcase } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CATEGORIES, SAMPLE_TEAMS } from "@/lib/teams-data";
import { cn } from "@/lib/utils";

export default function CategoryTeamsPage() {
  const params = useParams();
  const categoryId = params?.id as string;
  
  const category = CATEGORIES.find(c => c.id === categoryId);
  const teams = SAMPLE_TEAMS.filter(t => t.category === categoryId);

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

  const Icon = category.icon;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Refined Header Section */}
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
                    "w-16 h-16 rounded-[24px] flex items-center justify-center text-white shadow-2xl transition-transform hover:scale-110 duration-500",
                    category.color === 'blue' && "bg-blue-500 shadow-blue-500/20",
                    category.color === 'pink' && "bg-pink-500 shadow-pink-500/20",
                    category.color === 'purple' && "bg-purple-500 shadow-purple-500/20",
                    category.color === 'amber' && "bg-amber-500 shadow-amber-500/20",
                    category.color === 'rose' && "bg-rose-500 shadow-rose-500/20",
                    category.color === 'cyan' && "bg-cyan-500 shadow-cyan-500/20",
                    category.color === 'indigo' && "bg-indigo-500 shadow-indigo-500/20",
                  )}>
                    <Icon size={32} />
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
            
            <div className="shrink-0 w-full md:w-auto">
              <Button size="lg" className="w-full md:w-auto rounded-[24px] px-10 h-16 text-lg font-bold vibrant-gradient border-none shadow-2xl shadow-primary/30 hover:scale-105 transition-all active:scale-95">
                Apply for this Specialization
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {teams.length > 0 ? (
              teams.map((team, idx) => (
                <TeamCard key={idx} {...team} />
              ))
            ) : (
              <div className="col-span-full py-32 text-center bento-card border-2 border-dashed bg-muted/5 group">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Briefcase className="h-10 w-10 text-muted-foreground/40" />
                </div>
                <h3 className="text-3xl font-headline font-bold text-muted-foreground">No active squads right now</h3>
                <p className="text-muted-foreground mt-3 max-w-sm mx-auto text-lg">
                  Submit a general application above to be the first to know when new units form.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
