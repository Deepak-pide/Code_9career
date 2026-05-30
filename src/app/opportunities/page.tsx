
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { OpportunityCard } from "@/components/opportunities/OpportunityCard";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { Footer } from "@/components/layout/Footer";
import { useFirestore, useCollection } from "@/firebase";
import { collection } from "firebase/firestore";

export default function OpportunitiesPage() {
  const [search, setSearch] = useState("");
  const db = useFirestore();

  const teamsQuery = useMemo(() => db ? collection(db, "teams") : null, [db]);
  const { data: teams, loading } = useCollection(teamsQuery);

  const filtered = useMemo(() => {
    if (!teams) return [];
    return teams.filter(op => 
      op.name.toLowerCase().includes(search.toLowerCase()) || 
      op.company.toLowerCase().includes(search.toLowerCase())
    );
  }, [teams, search]);

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
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-24">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((op: any) => (
                <OpportunityCard 
                  key={op._id} 
                  title={op.name}
                  company={op.company}
                  description={op.description}
                  type="Remote" // Defaulting for MVP as it's not in schema yet
                  stipend={op.stipend}
                  skills={op.skills || []}
                  theme={op.theme || 'blue'}
                />
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
      <Footer />
    </div>
  );
}
