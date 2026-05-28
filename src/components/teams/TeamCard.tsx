
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, DollarSign, ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface Member {
  name: string;
  role: string;
  avatar: string;
}

interface TeamCardProps {
  name: string;
  company: string;
  description: string;
  seats: string;
  stipend: string;
  skills: string[];
  theme: "blue" | "pink" | "purple" | "green" | "amber" | "cyan" | "rose";
  members?: Member[];
}

const themeStyles = {
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  pink: "bg-pink-50 text-pink-700 border-pink-200",
  purple: "bg-purple-50 text-purple-700 border-purple-200",
  green: "bg-green-50 text-green-700 border-green-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  cyan: "bg-cyan-50 text-cyan-700 border-cyan-200",
  rose: "bg-rose-50 text-rose-700 border-rose-200",
};

const badgeStyles = {
  blue: "bg-blue-100 text-blue-700 border-blue-200",
  pink: "bg-pink-100 text-pink-700 border-pink-200",
  purple: "bg-purple-100 text-purple-700 border-purple-200",
  green: "bg-green-100 text-green-700 border-green-200",
  amber: "bg-amber-100 text-amber-700 border-amber-200",
  cyan: "bg-cyan-100 text-cyan-700 border-cyan-200",
  rose: "bg-rose-100 text-rose-700 border-rose-200",
};

const accentColors = {
  blue: "bg-blue-500",
  pink: "bg-pink-500",
  purple: "bg-purple-500",
  green: "bg-green-500",
  amber: "bg-amber-500",
  cyan: "bg-cyan-500",
  rose: "bg-rose-500",
};

export function TeamCard({ name, company, description, seats, stipend, skills, theme, members = [] }: TeamCardProps) {
  return (
    <div className="bento-card group h-full flex flex-col overflow-hidden relative border-2 hover:border-primary/20 transition-all duration-500 bg-white shadow-xl shadow-black/[0.02]">
      <div className={cn("h-2.5 w-full", accentColors[theme])}></div>
      
      <div className="p-10 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <h3 className="text-3xl font-headline font-bold leading-tight tracking-tight group-hover:text-primary transition-colors">{name}</h3>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-muted/30">
                {company}
              </Badge>
              <ShieldCheck size={14} className="text-primary animate-pulse" />
            </div>
          </div>
          <div className={cn(
            "p-4 rounded-[24px] shadow-sm border-2 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 flex items-center justify-center", 
            themeStyles[theme]
          )}>
            <Sparkles size={24} />
          </div>
        </div>

        <p className="text-base text-muted-foreground line-clamp-2 mb-8 flex-grow leading-relaxed font-medium italic">
          "{description}"
        </p>

        {members.length > 0 && (
          <div className="mb-8 space-y-3">
            <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Active Members</p>
            <div className="flex -space-x-3">
              {members.map((member, i) => (
                <div key={i} className="relative group/avatar">
                  <div className="w-12 h-12 rounded-2xl border-4 border-white overflow-hidden bg-muted shadow-lg transition-transform group-hover/avatar:scale-110 group-hover/avatar:z-10 z-0">
                    <Image src={member.avatar} alt={member.name} width={48} height={48} />
                  </div>
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/avatar:opacity-100 transition-opacity whitespace-nowrap z-50">
                    {member.name} • {member.role}
                  </div>
                </div>
              ))}
              <div className="w-12 h-12 rounded-2xl border-4 border-white bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                +{parseInt(seats.split('/')[1]) - members.length}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3 mb-8">
          <Badge variant="secondary" className="flex items-center gap-2 rounded-full px-5 py-2 border-2 font-bold text-[11px] uppercase tracking-widest bg-white">
            <Users size={14} className="text-primary" />
            {seats} Open
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-2 rounded-full px-5 py-2 border-2 font-bold text-[11px] uppercase tracking-widest bg-white">
            <DollarSign size={14} className="text-emerald-500" />
            {stipend}
          </Badge>
        </div>

        <div className="space-y-8">
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <span key={skill} className={cn(
                "text-[10px] font-black uppercase px-4 py-1.5 rounded-full border-2 transition-all duration-300 group-hover:shadow-md", 
                badgeStyles[theme]
              )}>
                {skill}
              </span>
            ))}
          </div>
          <Link href={`/teams/apply?name=${encodeURIComponent(name)}`} className="block">
            <Button className={cn(
              "w-full h-16 rounded-[24px] font-bold text-lg group-hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.03] border-none shadow-lg",
              "bg-muted text-foreground group-hover:vibrant-gradient group-hover:text-white"
            )}>
              Join This Unit
              <ArrowUpRight size={20} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
