
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TeamCard } from "@/components/teams/TeamCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Sparkles, Briefcase } from "lucide-react";
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
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="space-y-4">
              <Link href="/teams">
                <Button variant="ghost" size="sm" className="gap-2 font-bold -ml-2 text-muted-foreground hover:text-primary">
                  <ChevronLeft size={16} /> Back
                </Button>
              </Link>
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg",
                  category.color === 'blue' && "bg-blue-500",
                  category.color === 'pink' && "bg-pink-500",
                  category.color === 'purple' && "bg-purple-500",
                  category.color === 'amber' && "bg-amber-500",
                  category.color === 'rose' && "bg-rose-500",
                  category.color === 'cyan' && "bg-cyan-500",
                  category.color === 'indigo' && "bg-indigo-500",
                )}>
                  <Icon size={24} />
                </div>
                <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter">
                  {category.label} <span className="text-muted-foreground/30">Squads</span>
                </h1>
              </div>
              <p className="text-xl text-muted-foreground max-w-2xl font-medium">
                {category.description}
              </p>
            </div>
            
            <Button size="lg" className="rounded-full px-8 h-14 font-bold vibrant-gradient border-none shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
              Apply for this Specialization
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {teams.length > 0 ? (
              teams.map((team, idx) => (
                <TeamCard key={idx} {...team} />
              ))
            ) : (
              <div className="col-span-full py-32 text-center bento-card border-2 border-dashed bg-muted/10">
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
