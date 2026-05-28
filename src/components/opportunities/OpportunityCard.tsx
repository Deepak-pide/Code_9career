
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, DollarSign, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface OpportunityCardProps {
  title: string;
  company: string;
  description: string;
  type: "Remote" | "Hybrid" | "On-site";
  stipend: string;
  skills: string[];
  theme: "blue" | "pink" | "purple" | "green" | "amber" | "cyan";
}

const themeStyles = {
  blue: "bg-blue-50 border-blue-100 text-blue-700",
  pink: "bg-pink-50 border-pink-100 text-pink-700",
  purple: "bg-purple-50 border-purple-100 text-purple-700",
  green: "bg-green-50 border-green-100 text-green-700",
  amber: "bg-amber-50 border-amber-100 text-amber-700",
  cyan: "bg-cyan-50 border-cyan-100 text-cyan-700",
};

const badgeStyles = {
  blue: "bg-blue-100 text-blue-700",
  pink: "bg-pink-100 text-pink-700",
  purple: "bg-purple-100 text-purple-700",
  green: "bg-green-100 text-green-700",
  amber: "bg-amber-100 text-amber-700",
  cyan: "bg-cyan-100 text-cyan-700",
};

export function OpportunityCard({ title, company, description, type, stipend, skills, theme }: OpportunityCardProps) {
  return (
    <div className="bento-card group h-full flex flex-col overflow-hidden hover:-translate-y-1">
      <div className={cn("h-2 w-full", 
        theme === 'blue' && 'bg-blue-500',
        theme === 'pink' && 'bg-pink-500',
        theme === 'purple' && 'bg-purple-500',
        theme === 'green' && 'bg-green-500',
        theme === 'amber' && 'bg-amber-500',
        theme === 'cyan' && 'bg-cyan-500',
      )}></div>
      <div className="p-8 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-1">
            <h3 className="text-xl font-headline font-bold">{title}</h3>
            <p className="text-sm font-medium text-muted-foreground">{company}</p>
          </div>
          <div className={cn("p-2 rounded-lg", themeStyles[theme])}>
            <Briefcase size={20} />
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-6 flex-grow">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="outline" className="flex items-center gap-1 rounded-full px-3">
            <MapPin size={12} />
            {type}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1 rounded-full px-3">
            <DollarSign size={12} />
            {stipend}
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {skills.map(skill => (
              <span key={skill} className={cn("text-[10px] font-bold uppercase px-2 py-0.5 rounded-md", badgeStyles[theme])}>
                {skill}
              </span>
            ))}
          </div>
          <Link href="/opportunities/apply" className="block">
            <Button className="w-full rounded-full group-hover:shadow-lg transition-all" variant="default">
              Apply Now
              <ArrowUpRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
