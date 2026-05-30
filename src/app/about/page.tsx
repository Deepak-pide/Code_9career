
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rocket, ShieldCheck, Zap, Globe, Sparkles } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <header className="mb-32 text-center space-y-6">
            <Badge variant="outline" className="px-6 py-2 rounded-full border-primary/20 text-primary font-bold uppercase tracking-[0.2em] bg-primary/5">
              Our Vision
            </Badge>
            <h1 className="text-5xl md:text-8xl font-headline font-bold tracking-tighter leading-[1.1]">
              The Future of Talent is <span className="vibrant-text italic">Collective.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed">
              Code-9 isn't just a job board. We are a talent accelerator that assembles high-performance student squads and connects them with the world's most ambitious startups.
            </p>
          </header>

          {/* Values Grid */}
          <div className="mb-32">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Zap, title: "Velocity", desc: "Rapid deployment of skill-matched core teams." },
                { icon: ShieldCheck, title: "Trust", desc: "Vetted talent pipelines with proven synergy." },
                { icon: Rocket, title: "Growth", desc: "Accelerating careers through collective impact." },
                { icon: Globe, title: "Reach", desc: "Connecting global startups with elite local talent." },
              ].map((value, i) => (
                <div key={i} className="bento-card p-8 border hover:border-primary/20 transition-all group">
                  <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                    <value.icon size={24} />
                  </div>
                  <h3 className="text-xl font-headline font-bold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground font-medium">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* The Core Team Model */}
          <section className="mb-32 space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-6xl font-headline font-bold tracking-tight">The <span className="text-primary italic">Core Team</span> Philosophy</h2>
              <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-medium">
                Why hire one when you can hire an engine?
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bento-card p-10 space-y-6 border-none bg-muted/30">
                <div className="text-primary font-black text-6xl opacity-20 italic">01</div>
                <h3 className="text-2xl font-headline font-bold">Sourcing & Synergy</h3>
                <p className="text-muted-foreground font-medium leading-relaxed">
                  We don't just find talent; we find synergy. We match students based on complementary skills and shared ambitions to form balanced, cohesive units.
                </p>
              </div>

              <div className="bento-card p-10 space-y-6 border-none bg-muted/30">
                <div className="text-primary font-black text-6xl opacity-20 italic">02</div>
                <h3 className="text-2xl font-headline font-bold">Rapid Integration</h3>
                <p className="text-muted-foreground font-medium leading-relaxed">
                  Our squads are pre-aligned and ready to build. We eliminate the friction of team-forming, allowing companies to ship faster from day one.
                </p>
              </div>

              <div className="bento-card p-10 space-y-6 border-none bg-muted/30">
                <div className="text-primary font-black text-6xl opacity-20 italic">03</div>
                <h3 className="text-2xl font-headline font-bold">Measured Impact</h3>
                <p className="text-muted-foreground font-medium leading-relaxed">
                  Every squad operates under our "Elite" framework, ensuring consistent quality, professional communication, and measurable project outcomes.
                </p>
              </div>
            </div>
          </section>

          {/* Join Us CTA */}
          <section className="p-16 md:p-24 rounded-[64px] bg-primary text-white text-center space-y-10 relative overflow-hidden shadow-2xl shadow-primary/30">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-[100px]"></div>
            <div className="relative z-10 space-y-8">
              <Sparkles className="h-16 w-16 mx-auto opacity-50" />
              <h2 className="text-5xl md:text-7xl font-headline font-bold italic">Ready to redefine your career?</h2>
              <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto font-medium leading-relaxed">
                Whether you're a student looking for a squad or a company looking for an engine, Code-9 is your bridge to the next level.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                <Link href="/teams">
                  <Button size="lg" className="h-16 px-12 rounded-full bg-white text-primary font-bold text-xl hover:bg-white/90 transition-all hover:scale-105">
                    Join a Squad
                  </Button>
                </Link>
                <Link href="/services">
                  <Button size="lg" variant="outline" className="h-16 px-12 rounded-full border-2 border-white bg-white text-primary font-bold text-xl hover:bg-white/90 transition-all hover:scale-105">
                    Partner with Us
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
