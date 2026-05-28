
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TeamCard } from "@/components/teams/TeamCard";
import { Input } from "@/components/ui/input";
import { Search, Filter, SlidersHorizontal, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const SAMPLE_TEAMS = [
  {
    name: "Neural Systems Unit",
    company: "NextGen AI",
    description: "Developing decentralized LLM architectures. We need high-bandwidth collaborators who understand distributed systems.",
    seats: "3/5",
    stipend: "$1,200/mo per member",
    skills: ["PyTorch", "Rust", "Distributed Systems"],
    theme: "purple" as const
  },
  {
    name: "Creative Front-End Lab",
    company: "Creative Labs",
    description: "A tight-knit unit focused on pushing the boundaries of web animation and interaction design.",
    seats: "2/4",
    stipend: "$1,500/mo per member",
    skills: ["Three.js", "GSAP", "React"],
    theme: "pink" as const
  },
  {
    name: "DataStream Infrastructure",
    company: "DataStream",
    description: "Building the backbone of real-time data processing. Join our core engineering squad.",
    seats: "4/6",
    stipend: "$2,000/mo per member",
    skills: ["Go", "Kafka", "Postgres"],
    theme: "blue" as const
  },
  {
    name: "Growth Ops Unit",
    company: "TechBrief",
    description: "Cross-functional team merging content engineering with data-driven marketing.",
    seats: "1/3",
    stipend: "$1,000/mo per member",
    skills: ["Python", "SQL", "Copywriting"],
    theme: "amber" as const
  }
];

export default function TeamsPage() {
  const [search, setSearch] = useState("");

  const filtered = SAMPLE_TEAMS.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <header className="mb-12 space-y-4">
            <h1 className="text-4xl md:text-5xl font-headline font-bold">Join a <span className="text-primary">Core Team</span></h1>
            <p className="text-muted-foreground text-lg max-w-2xl font-medium">
              Don't just apply for a job. Apply to join a high-functioning team building real products.
            </p>
          </header>

          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                placeholder="Search teams or companies..." 
                className="pl-12 h-14 rounded-2xl shadow-sm border-muted focus-visible:ring-primary font-medium"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="h-14 rounded-2xl px-6 flex gap-2 font-bold border-2">
                <SlidersHorizontal size={20} />
                Filters
              </Button>
              <Button className="h-14 rounded-2xl px-6 shadow-lg shadow-primary/20 vibrant-gradient border-none font-bold">
                Search
              </Button>
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((team, idx) => (
                <TeamCard key={idx} {...team} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4 shadow-inner">
                <Users className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-headline font-bold">No teams found</h2>
              <p className="text-muted-foreground font-medium">Try adjusting your search to find an active core team.</p>
              <Button variant="link" onClick={() => setSearch("")} className="text-primary font-bold">Clear all filters</Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
