
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TeamCard } from "@/components/teams/TeamCard";
import { Input } from "@/components/ui/input";
import { Search, Filter, SlidersHorizontal, Users, Palette, Code, Film, PlayCircle, Image as ImageIcon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "all", label: "All Roles", icon: Sparkles, color: "primary" },
  { id: "web", label: "Web Developer", icon: Code, color: "blue" },
  { id: "uiux", label: "UI/UX", icon: Palette, color: "pink" },
  { id: "animation", label: "Animation", icon: PlayCircle, color: "purple" },
  { id: "thumbnail", label: "Thumbnail", icon: ImageIcon, color: "amber" },
  { id: "reel", label: "Reel Creator", icon: Film, color: "rose" },
  { id: "film", label: "Film Producer", icon: Film, color: "cyan" },
  { id: "media", label: "Media Production", icon: Film, color: "indigo" },
  { id: "other", label: "Other", icon: Users, color: "green" },
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
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = SAMPLE_TEAMS.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || 
                         t.company.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "all" || t.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <header className="mb-12 space-y-6">
            <h1 className="text-5xl md:text-7xl font-headline font-bold leading-[1.1]">
              Choose Your <span className="vibrant-text italic underline decoration-primary/20">Specialization.</span>
            </h1>
            <p className="text-muted-foreground text-xl max-w-2xl font-medium leading-relaxed">
              Find a core team looking for your specific expertise. From high-end code to cinematic production.
            </p>
          </header>

          {/* Category Scroller */}
          <div className="flex overflow-x-auto pb-6 gap-3 no-scrollbar mb-10">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                variant={activeCategory === cat.id ? "default" : "outline"}
                className={cn(
                  "rounded-full h-12 px-6 flex items-center gap-2 font-bold whitespace-nowrap transition-all duration-300",
                  activeCategory === cat.id 
                    ? "vibrant-gradient border-none shadow-lg scale-105" 
                    : "hover:bg-muted/50 border-2"
                )}
              >
                <cat.icon size={18} />
                {cat.label}
              </Button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-grow">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                placeholder="Search specific teams or roles..." 
                className="pl-14 h-16 rounded-[24px] shadow-sm border-2 border-muted focus-visible:ring-primary font-bold text-lg"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button className="h-16 rounded-[24px] px-10 shadow-xl shadow-primary/20 vibrant-gradient border-none font-bold text-lg">
              Find Synergy
            </Button>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((team, idx) => (
                <TeamCard key={idx} {...team} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 space-y-6 bg-muted/30 rounded-[48px] border-2 border-dashed">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white mb-4 shadow-xl">
                <Users className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-3xl font-headline font-bold">No active teams found</h2>
              <p className="text-muted-foreground font-medium text-lg">No teams currently recruiting for "{activeCategory === 'all' ? 'this role' : activeCategory}".</p>
              <Button 
                onClick={() => {setActiveCategory('all'); setSearch('');}} 
                className="rounded-full px-8 font-bold"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
