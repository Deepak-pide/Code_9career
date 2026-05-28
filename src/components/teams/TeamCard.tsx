
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, MapPin, DollarSign, ArrowUpRight, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface TeamCardProps {
  name: string;
  company: string;
  description: string;
  seats: string;
  stipend: string;
  skills: string[];
  theme: "blue" | "pink" | "purple" | "green" | "amber" | "cyan";
}

const themeStyles = {
  blue: "bg-blue-50 text-blue-700 border-blue-100",
  pink: "bg-pink-50 text-pink-700 border-pink-100",
  purple: "bg-purple-50 text-purple-700 border-purple-100",
  green: "bg-green-50 text-green-700 border-green-100",
  amber: "bg-amber-50 text-amber-700 border-amber-100",
  cyan: "bg-cyan-50 text-cyan-700 border-cyan-100",
};

const badgeStyles = {
  blue: "bg-blue-100 text-blue-700 border-blue-200",
  pink: "bg-pink-100 text-pink-700 border-pink-200",
  purple: "bg-purple-100 text-purple-700 border-purple-200",
  green: "bg-green-100 text-green-700 border-green-200",
  amber: "bg-amber-100 text-amber-700 border-amber-200",
  cyan: "bg-cyan-100 text-cyan-700 border-cyan-200",
};

export function TeamCard({ name, company, description, seats, stipend, skills, theme }: TeamCardProps) {
  return (
    <div className="bento-card group h-full flex flex-col overflow-hidden relative">
      <div className={cn("h-1.5 w-full", 
        theme === 'blue' && 'bg-blue-500',
        theme === 'pink' && 'bg-pink-500',
        theme === 'purple' && 'bg-purple-500',
        theme === 'green' && 'bg-green-500',
        theme === 'amber' && 'bg-amber-500',
        theme === 'cyan' && 'bg-cyan-500',
      )}></div>
      
      <div className="p-10 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-headline font-bold leading-none tracking-tight">{name}</h3>
              <ShieldCheck size={18} className="text-primary" />
            </div>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{company}</p>
          </div>
          <div className={cn("p-3 rounded-2xl shadow-sm border transition-transform group-hover:scale-110 duration-500", themeStyles[theme])}>
            <Users size={24} />
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3 mb-8 flex-grow leading-relaxed font-medium italic">
          "{description}"
        </p>

        <div className="flex flex-wrap gap-3 mb-8">
          <Badge variant="secondary" className="flex items-center gap-2 rounded-full px-4 py-1.5 border font-bold text-[10px] uppercase tracking-widest">
            <Users size={12} className="text-primary" />
            {seats} Seats
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-2 rounded-full px-4 py-1.5 border font-bold text-[10px] uppercase tracking-widest">
            <DollarSign size={12} className="text-emerald-500" />
            {stipend}
          </Badge>
        </div>

        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <span key={skill} className={cn("text-[9px] font-black uppercase px-3 py-1 rounded-full border transition-colors", badgeStyles[theme])}>
                {skill}
              </span>
            ))}
          </div>
          <Link href={`/teams/apply?name=${encodeURIComponent(name)}`} className="block">
            <Button className="w-full h-14 rounded-full font-bold group-hover:vibrant-gradient group-hover:shadow-xl transition-all duration-500 group-hover:scale-[1.02] border-none shadow-sm" variant="secondary">
              Apply to Team
              <ArrowUpRight size={18} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
