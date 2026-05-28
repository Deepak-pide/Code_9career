
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, DollarSign, ArrowUpRight, ShieldCheck, Sparkles, Plus } from "lucide-react";
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

const themeConfigs = {
  blue: { bg: "bg-blue-500", light: "bg-blue-50", border: "border-blue-100", text: "text-blue-600" },
  pink: { bg: "bg-pink-500", light: "bg-pink-50", border: "border-pink-100", text: "text-pink-600" },
  purple: { bg: "bg-purple-500", light: "bg-purple-50", border: "border-purple-100", text: "text-purple-600" },
  green: { bg: "bg-green-500", light: "bg-green-50", border: "border-green-100", text: "text-green-600" },
  amber: { bg: "bg-amber-500", light: "bg-amber-50", border: "border-amber-100", text: "text-amber-600" },
  cyan: { bg: "bg-cyan-500", light: "bg-cyan-50", border: "border-cyan-100", text: "text-cyan-600" },
  rose: { bg: "bg-rose-500", light: "bg-rose-50", border: "border-rose-100", text: "text-rose-600" },
};

export function TeamCard({ name, company, description, seats, stipend, skills, theme, members = [] }: TeamCardProps) {
  const config = themeConfigs[theme];
  const maxSeats = parseInt(seats.split('/')[1]);

  return (
    <div className="group relative flex flex-col bg-white rounded-[40px] p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border hover:border-primary/20 transition-all duration-700 overflow-hidden">
      {/* Dynamic Background Element */}
      <div className={cn(
        "absolute -right-20 -top-20 w-80 h-80 opacity-5 rounded-full blur-[100px] transition-all duration-700 group-hover:opacity-10",
        config.bg
      )}></div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="rounded-full px-4 py-1 font-bold text-[10px] uppercase tracking-[0.2em] border-2">
                {company}
              </Badge>
              <div className={cn("w-2 h-2 rounded-full animate-pulse", config.bg)}></div>
            </div>
            <h3 className="text-4xl md:text-5xl font-headline font-bold leading-tight tracking-tighter group-hover:text-primary transition-colors">
              {name}
            </h3>
          </div>
          <div className={cn(
            "w-16 h-16 rounded-3xl flex items-center justify-center text-white shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6",
            config.bg
          )}>
            <Sparkles size={32} />
          </div>
        </div>

        <p className="text-lg text-muted-foreground leading-relaxed mb-12 italic font-medium">
          "{description}"
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/50">Current Squad</p>
            <div className="flex flex-wrap gap-3">
              {members.map((member, i) => (
                <div key={i} className="flex items-center gap-3 bg-muted/30 p-2 pr-4 rounded-2xl border transition-colors group-hover:bg-white">
                  <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm">
                    <Image src={member.avatar} alt={member.name} width={40} height={40} className="object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold">{member.name}</span>
                    <span className="text-[9px] text-muted-foreground font-medium">{member.role}</span>
                  </div>
                </div>
              ))}
              {Array.from({ length: maxSeats - members.length }).map((_, i) => (
                <div key={i} className="w-10 h-10 rounded-xl border-2 border-dashed border-muted flex items-center justify-center text-muted-foreground/30">
                  <Plus size={16} />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/50">Key Outcomes</p>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <span key={skill} className={cn(
                  "text-[10px] font-bold uppercase px-4 py-2 rounded-xl border-2 transition-all",
                  config.light, config.text, config.border
                )}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto flex flex-col sm:flex-row items-center gap-6">
          <div className="flex gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 mb-1">Stipend</span>
              <div className="flex items-center gap-2 text-xl font-bold">
                <DollarSign size={20} className="text-emerald-500" />
                {stipend}
              </div>
            </div>
            <div className="w-px h-10 bg-border hidden sm:block"></div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 mb-1">Availability</span>
              <div className="flex items-center gap-2 text-xl font-bold">
                <Users size={20} className="text-primary" />
                {seats} Seats
              </div>
            </div>
          </div>
          
          <Link href={`/teams/apply?name=${encodeURIComponent(name)}`} className="w-full sm:ml-auto">
            <Button className={cn(
              "w-full h-16 rounded-3xl font-bold text-lg shadow-2xl transition-all duration-500 hover:scale-[1.03] border-none",
              config.bg, "text-white shadow-lg", `shadow-${theme}-500/20`
            )}>
              Request to Join
              <ArrowUpRight size={20} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
