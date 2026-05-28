"use client";

import { Navbar } from "@/components/layout/Navbar";
import { OpportunityCard } from "@/components/opportunities/OpportunityCard";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const SAMPLE_OPPORTUNITIES = [
  {
    title: "Frontend Developer",
    company: "Code-9 Studio",
    description: "Building modern user interfaces with React and Tailwind CSS. Looking for someone with a passion for UX.",
    type: "Remote" as const,
    stipend: "$1,200/mo",
    skills: ["React", "Next.js", "Tailwind"],
    theme: "blue" as const
  },
  {
    title: "UI/UX Designer",
    company: "Creative Labs",
    description: "Designing beautiful, intuitive interfaces for our upcoming SaaS product launch.",
    type: "Hybrid" as const,
    stipend: "$1,500/mo",
    skills: ["Figma", "Prototyping", "UX Research"],
    theme: "pink" as const
  },
  {
    title: "Backend Engineer",
    company: "DataStream",
    description: "Architecting robust APIs and database schemas for high-traffic applications.",
    type: "Remote" as const,
    stipend: "$2,000/mo",
    skills: ["Node.js", "PostgreSQL", "Redis"],
    theme: "purple" as const
  },
  {
    title: "AI/ML Intern",
    company: "NeuroTech",
    description: "Working on cutting-edge LLM integrations and data preprocessing for our core models.",
    type: "On-site" as const,
    stipend: "Unpaid",
    skills: ["Python", "PyTorch", "OpenAI"],
    theme: "green" as const
  },
  {
    title: "Content Writer",
    company: "TechBrief",
    description: "Crafting engaging articles and documentation for a global developer community.",
    type: "Remote" as const,
    stipend: "$800/mo",
    skills: ["Writing", "SEO", "Tech Knowledge"],
    theme: "amber" as const
  },
  {
    title: "Video Editor",
    company: "FrameFlow",
    description: "Creating high-impact video content for social media and marketing campaigns.",
    type: "Hybrid" as const,
    stipend: "$1,000/mo",
    skills: ["Premiere Pro", "After Effects"],
    theme: "cyan" as const
  }
];

export default function OpportunitiesPage() {
  const [search, setSearch] = useState("");

  const filtered = SAMPLE_OPPORTUNITIES.filter(op => 
    op.title.toLowerCase().includes(search.toLowerCase()) || 
    op.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <header className="mb-12 space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-headline font-bold">Find Your Next <span className="text-primary">Opportunity</span></h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
              Discover roles that match your skills and ambition. Filter by type, stipend, or tech stack.
            </p>
          </header>

          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                placeholder="Search roles or companies..." 
                className="pl-12 h-14 rounded-2xl shadow-sm border-muted focus-visible:ring-primary"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="h-14 rounded-2xl px-6 flex gap-2">
                <SlidersHorizontal size={20} />
                Filters
              </Button>
              <Button className="h-14 rounded-2xl px-6 shadow-lg shadow-primary/20">
                Search
              </Button>
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((op, idx) => (
                <OpportunityCard key={idx} {...op} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-headline font-bold">No results found</h2>
              <p className="text-muted-foreground">Try adjusting your search or filters to find what you're looking for.</p>
              <Button variant="link" onClick={() => setSearch("")} className="text-primary font-bold">Clear all filters</Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
