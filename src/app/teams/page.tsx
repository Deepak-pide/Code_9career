
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TeamCard } from "@/components/teams/TeamCard";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, ChevronUp, Sparkles, Layout, Code, Play, Image as ImageIcon, Video, Camera, Mic2, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const CATEGORIES = [
  { id: "web", label: "Web Developer", icon: Code, color: "blue", description: "Full-stack and front-end engineering units." },
  { id: "uiux", label: "UI/UX Designer", icon: Layout, color: "pink", description: "Visual and interaction design squads." },
  { id: "animation", label: "Animation", icon: Play, color: "purple", description: "3D and 2D motion graphics experts." },
  { id: "thumbnail", label: "Thumbnail Artist", icon: ImageIcon, color: "amber", description: "High-CTR visual asset creation." },
  { id: "reel", label: "Reel Creator", icon: Video, color: "rose", description: "Short-form content and viral strategy." },
  { id: "film", label: "Film Producer", icon: Camera, color: "cyan", description: "Cinematic production and directing." },
  { id: "media", label: "Media Production", icon: Mic2, color: "indigo", description: "Podcast and multi-channel content units." },
];

const SAMPLE_TEAMS = [
  {
    name: "Pixel Perfect Squad",
    company: "Creative Labs",
    description: "Specializing in high-end UI/UX and web interactions. We need a visionary designer to lead our next product launch.",
    seats: "1/3",
    stipend: "$1,800/mo",
    skills: ["Figma", "Next.js", "Tailwind"],
    theme: "pink" as const,
    category: "uiux"
  },
  {
    name: "Motion Engine Unit",
    company: "NeuroTech",
    description: "Crafting the future of 3D animations for technical demonstrations and cinematic trailers.",
    seats: "2/5",
    stipend: "$2,200/mo",
    skills: ["Blender", "After Effects", "C4D"],
    theme: "purple" as const,
    category: "animation"
  },
  {
    name: "Vertical Viral Team",
    company: "TechBrief Media",
    description: "Dedicated Reel creators focused on short-form storytelling and high-retention editing strategies.",
    seats: "3/4",
    stipend: "$1,200/mo",
    skills: ["Premiere", "CapCut", "Viral Strategy"],
    theme: "rose" as const,
    category: "reel"
  },
  {
    name: "Full Stack Nexus",
    company: "DataStream",
    description: "Building robust cloud architectures. Looking for disciplined Web Developers to scale our infrastructure.",
    seats: "2/6",
    stipend: "$2,500/mo",
    skills: ["Go", "React", "Postgres"],
    theme: "blue" as const,
    category: "web"
  },
  {
    name: "Cinematic Core",
    company: "FrameFlow Studio",
    description: "Film producers and directors building a new-age documentary series for global tech founders.",
    seats: "1/4",
    stipend: "$3,000/mo",
    skills: ["Directing", "Scripting", "Production"],
    theme: "cyan" as const,
    category: "film"
  },
  {
    name: "Clickbait Artists",
    company: "Creator Hub",
    description: "Specialized Thumbnail unit focused on psychological design and high CTR visual assets.",
    seats: "4/5",
    stipend: "$1,000/mo",
    skills: ["Photoshop", "AI Design", "Visual Arts"],
    theme: "amber" as const,
    category: "thumbnail"
  }
];

export default function TeamsPage() {
  const [search, setSearch] = useState("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  const getTeamsForCategory = (catId: string) => {
    return SAMPLE_TEAMS.filter(t => t.category === catId && 
      (t.name.toLowerCase().includes(search.toLowerCase()) || 
       t.company.toLowerCase().includes(search.toLowerCase()))
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <header className="mb-12 space-y-6">
            <h1 className="text-5xl md:text-7xl font-headline font-bold leading-[1.1]">
              Browse <span className="vibrant-text italic underline decoration-primary/20">Specializations.</span>
            </h1>
            <p className="text-muted-foreground text-xl max-w-2xl font-medium leading-relaxed">
              Select a discipline to discover active core teams looking for your expertise.
            </p>
          </header>

          <div className="relative mb-12">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input 
              placeholder="Search for teams within specializations..." 
              className="pl-14 h-16 rounded-[24px] shadow-sm border-2 border-muted focus-visible:ring-primary font-bold text-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            {CATEGORIES.map((cat) => {
              const teams = getTeamsForCategory(cat.id);
              const isExpanded = expandedCategory === cat.id;
              const Icon = cat.icon;

              if (search && teams.length === 0) return null;

              return (
                <div key={cat.id} className="group">
                  <button
                    onClick={() => toggleCategory(cat.id)}
                    className={cn(
                      "w-full text-left bento-card p-6 flex items-center justify-between transition-all duration-300",
                      isExpanded ? "ring-2 ring-primary bg-primary/5 rounded-b-none" : "hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-center gap-6">
                      <div className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110",
                        cat.color === 'blue' && "bg-blue-500 shadow-blue-500/20",
                        cat.color === 'pink' && "bg-pink-500 shadow-pink-500/20",
                        cat.color === 'purple' && "bg-purple-500 shadow-purple-500/20",
                        cat.color === 'amber' && "bg-amber-500 shadow-amber-500/20",
                        cat.color === 'rose' && "bg-rose-500 shadow-rose-500/20",
                        cat.color === 'cyan' && "bg-cyan-500 shadow-cyan-500/20",
                        cat.color === 'indigo' && "bg-indigo-500 shadow-indigo-500/20",
                      )}>
                        <Icon size={28} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-headline font-bold">{cat.label}</h3>
                        <p className="text-sm text-muted-foreground font-medium">{cat.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary" className="px-4 py-1.5 rounded-full font-bold">
                        {teams.length} Active Teams
                      </Badge>
                      {isExpanded ? <ChevronUp className="text-primary" /> : <ChevronDown className="text-muted-foreground" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="bg-white border-x-2 border-b-2 border-primary/20 rounded-b-[32px] p-8 space-y-8 animate-in slide-in-from-top-2 duration-300">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b">
                        <div>
                          <h4 className="text-xl font-headline font-bold flex items-center gap-2">
                            <Sparkles className="text-primary h-5 w-5" />
                            Available {cat.label} Units
                          </h4>
                          <p className="text-sm text-muted-foreground font-medium">Browse active squads or submit a general application for this specialization.</p>
                        </div>
                        <Button className="rounded-full h-12 px-8 font-bold vibrant-gradient shadow-lg shadow-primary/20">
                          Apply for this Post
                        </Button>
                      </div>

                      {teams.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {teams.map((team, idx) => (
                            <TeamCard key={idx} {...team} />
                          ))}
                        </div>
                      ) : (
                        <div className="py-12 text-center bg-muted/30 rounded-[24px] border-2 border-dashed">
                          <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <p className="font-bold text-muted-foreground">No specific teams matching your search in this category.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!search && (
            <div className="mt-16 text-center space-y-4">
              <p className="text-muted-foreground font-medium">Don't see your specific expertise?</p>
              <Button variant="outline" className="rounded-full px-8 font-bold border-2">
                Join our Global Talent Registry
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
