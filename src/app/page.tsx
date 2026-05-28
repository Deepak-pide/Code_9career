
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Users, Zap, Briefcase } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32">
        {/* Hero Section */}
        <section className="px-6 mb-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge variant="secondary" className="px-4 py-1 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full">
                Now accepting applications for 2024
              </Badge>
              <h1 className="text-5xl md:text-7xl font-headline font-bold leading-tight">
                Build. Collaborate. <span className="text-primary italic">Get Hired.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                Connect with exclusive high-growth startups and tech giants. Your journey from a student to a core team member starts here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/opportunities">
                  <Button size="lg" className="rounded-full px-8 h-14 text-lg shadow-xl shadow-primary/20 group">
                    Explore Roles
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg">
                    Create Profile
                  </Button>
                </Link>
              </div>
              <div className="flex items-center space-x-4 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-muted">
                      <Image 
                        src={`https://picsum.photos/seed/face${i}/100/100`} 
                        alt="User avatar" 
                        width={40} 
                        height={40} 
                        data-ai-hint="person portrait"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Joined by <span className="font-bold text-foreground">1,200+</span> ambitious students
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-purple-500/20 blur-3xl rounded-full opacity-50 -z-10"></div>
              <div className="bento-card overflow-hidden aspect-video relative shadow-2xl">
                {heroImage && (
                  <Image 
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={heroImage.imageHint}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <div className="text-white space-y-2">
                    <p className="text-sm font-medium opacity-80 uppercase tracking-widest">Featured Opportunity</p>
                    <h3 className="text-2xl font-headline font-bold">Frontend Engineer @ NextGen AI</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white dark:bg-card border-y py-16 px-6 mb-24">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <div className="text-4xl font-headline font-bold text-primary">500+</div>
              <p className="text-sm text-muted-foreground uppercase font-semibold">Roles Filled</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-headline font-bold text-primary">45+</div>
              <p className="text-sm text-muted-foreground uppercase font-semibold">Active Startups</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-headline font-bold text-primary">12k</div>
              <p className="text-sm text-muted-foreground uppercase font-semibold">Applications</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-headline font-bold text-primary">92%</div>
              <p className="text-sm text-muted-foreground uppercase font-semibold">Hire Rate</p>
            </div>
          </div>
        </section>

        {/* Features / Why Us */}
        <section className="px-6 mb-24 max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-headline font-bold">The Code-9 Advantage</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide more than just job listings. We provide a platform for growth and community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bento-card p-8 group hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-headline font-bold mb-4">AI Ranking</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our proprietary AI summarizer ensures your best skills are highlighted to recruiters instantly.
              </p>
            </div>
            <div className="bento-card p-8 group hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-headline font-bold mb-4">Core Community</h3>
              <p className="text-muted-foreground leading-relaxed">
                Connect with fellow student developers and designers. Build together, grow together.
              </p>
            </div>
            <div className="bento-card p-8 group hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Star size={24} />
              </div>
              <h3 className="text-xl font-headline font-bold mb-4">Verified Talent</h3>
              <p className="text-muted-foreground leading-relaxed">
                Earn badges and "Top Talent" status through successful project completions and applications.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 mb-24">
          <div className="max-w-7xl mx-auto bg-primary rounded-[32px] p-12 md:p-24 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-6xl font-headline font-bold">Ready to take the leap?</h2>
              <p className="text-xl text-primary-foreground/80 max-w-xl mx-auto">
                Join the fastest growing student talent network and get discovered by top teams.
              </p>
              <div className="flex justify-center">
                <Link href="/opportunities">
                  <Button size="lg" variant="secondary" className="rounded-full px-12 h-16 text-lg font-bold shadow-2xl">
                    Apply Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
