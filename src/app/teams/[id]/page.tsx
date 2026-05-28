
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TeamCard } from "@/components/teams/TeamCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Sparkles, Briefcase, Users } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CATEGORIES, SAMPLE_TEAMS } from "@/lib/teams-data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function CategoryTeamsPage() {
  const params = useParams();
  const categoryId = params.id as string;
  
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-6 bg-muted/10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <Link href="/teams">
              <Button variant="ghost" className="gap-2 font-bold mb-8 hover:bg-white rounded-full">
                <ChevronLeft size={18} /> Back to Specializations
              </Button>
            </Link>

            <div className="bento-card p-10 bg-white border-2 border-primary/10 relative overflow-hidden">
              <div className={cn(
                "absolute -right-20 -top-20 w-80 h-80 opacity-5 rounded-full blur-3xl",
                category.color === 'blue' && "bg-blue-500",
                category.color === 'pink' && "bg-pink-500",
                category.color === 'purple' && "bg-purple-500",
                category.color === 'amber' && "bg-amber-500",
                category.color === 'rose' && "bg-rose-500",
                category.color === 'cyan' && "bg-cyan-500",
                category.color === 'indigo' && "bg-indigo-500",
              )}></div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 relative z-10">
                <div className="flex gap-8 items-center">
                  <div className={cn(
                    "w-24 h-24 rounded-[32px] flex items-center justify-center text-white shadow-2xl",
                    category.color === 'blue' && "bg-blue-500",
                    category.color === 'pink' && "bg-pink-500",
                    category.color === 'purple' && "bg-purple-500",
                    category.color === 'amber' && "bg-amber-500",
                    category.color === 'rose' && "bg-rose-500",
                    category.color === 'cyan' && "bg-cyan-500",
                    category.color === 'indigo' && "bg-indigo-500",
                  )}>
                    <Icon size={48} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h1 className="text-4xl md:text-5xl font-headline font-bold">{category.label}</h1>
                      <Badge variant="secondary" className="rounded-full px-4 py-1.5 font-bold uppercase tracking-widest text-[10px] animate-pulse">
                        {teams.length} Active Squads
                      </Badge>
                    </div>
                    <p className="text-xl text-muted-foreground font-medium max-w-xl">{category.description}</p>
                  </div>
                </div>
                <Button size="lg" className="rounded-full h-16 px-10 text-lg font-bold shadow-xl shadow-primary/20 vibrant-gradient border-none hover:scale-105 transition-transform shrink-0">
                  Apply for this Post
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl font-headline font-bold flex items-center gap-3 px-2">
              <Sparkles className="text-primary" />
              Available Core Teams
            </h2>

            {teams.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {teams.map((team, idx) => (
                  <TeamCard key={idx} {...team} />
                ))}
              </div>
            ) : (
              <div className="py-32 text-center bento-card border-2 border-dashed bg-white">
                <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-6 opacity-20" />
                <h3 className="text-2xl font-headline font-bold text-muted-foreground">No active squads right now</h3>
                <p className="text-muted-foreground mt-2 max-w-sm mx-auto">But you can still submit a general application for this specialization above.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
