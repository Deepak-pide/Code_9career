import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Users, Zap, Sparkles, Target, Rocket } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image');

  return (
    <div className="min-h-screen flex flex-col selection:bg-primary selection:text-white">
      <Navbar />
      
      <main className="flex-grow pt-32 overflow-hidden">
        {/* Hero Section */}
        <section className="px-6 mb-32 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-primary/5 via-transparent to-transparent -z-20"></div>
          
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10 relative">
              <div className="absolute -left-20 -top-20 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -z-10 animate-pulse"></div>
              
              <Badge variant="outline" className="px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] border-primary/20 text-primary bg-primary/5 rounded-full backdrop-blur-sm">
                Next-Gen Talent Ecosystem
              </Badge>
              
              <h1 className="text-6xl md:text-8xl font-headline font-bold leading-[0.95] tracking-tighter">
                Build. <br />
                Collaborate. <br />
                <span className="vibrant-text italic">Get Hired.</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed font-medium">
                The premier platform connecting ambitious students with high-growth startups. Your career velocity starts here.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5">
                <Link href="/opportunities">
                  <Button size="lg" className="rounded-full px-10 h-16 text-lg font-bold shadow-2xl shadow-primary/30 group vibrant-gradient border-none transition-transform hover:scale-105">
                    Explore Roles
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button size="lg" variant="outline" className="rounded-full px-10 h-16 text-lg font-bold border-2 hover:bg-muted/50">
                    Create Profile
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-background overflow-hidden bg-muted shadow-lg">
                      <Image 
                        src={`https://picsum.photos/seed/face${i}/100/100`} 
                        alt="User avatar" 
                        width={48} 
                        height={48} 
                        data-ai-hint="person portrait"
                      />
                    </div>
                  ))}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-foreground">
                    Trusted by 2,500+ students
                  </p>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={12} className="fill-amber-400 text-amber-400" />)}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-10 bg-gradient-to-tr from-primary/30 to-fuchsia-500/30 blur-[120px] rounded-full opacity-60 -z-10 group-hover:opacity-80 transition-opacity duration-700"></div>
              
              <div className="bento-card overflow-hidden aspect-[4/3] relative shadow-[0_32px_64px_rgba(0,0,0,0.15)] group-hover:-translate-y-2 transition-transform duration-700">
                {heroImage && (
                  <Image 
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    data-ai-hint={heroImage.imageHint}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-10">
                  <div className="text-white space-y-3">
                    <Badge className="bg-white/20 backdrop-blur-md border-white/30 text-white uppercase tracking-widest text-[10px]">Featured Opening</Badge>
                    <h3 className="text-3xl font-headline font-bold">Principal Frontend Architect</h3>
                    <p className="text-white/70 font-medium">NextGen AI Systems • Remote • $120k+</p>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 bento-card p-6 glassmorphism hidden md:block animate-bounce shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl vibrant-gradient flex items-center justify-center text-white">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">AI Match Rate</p>
                    <p className="text-xl font-headline font-bold">98.4% Match</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white dark:bg-card border-y border-border/40 py-24 px-6 mb-32 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.02)_100%)]"></div>
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
            {[
              { label: "Placements", value: "850+", icon: Target },
              { label: "Partner Startups", value: "62", icon: Rocket },
              { label: "App Volume", value: "24k", icon: Users },
              { label: "Retention Rate", value: "96%", icon: Zap },
            ].map((stat, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                  <stat.icon size={24} />
                </div>
                <div>
                  <div className="text-5xl font-headline font-bold text-foreground tracking-tighter">{stat.value}</div>
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-[0.2em] mt-2">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Advantage Section */}
        <section className="px-6 mb-32 max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-5xl font-headline font-bold tracking-tight">The Code-9 <span className="vibrant-text">Difference</span></h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
              We've engineered a platform that doesn't just list jobs, but accelerates career trajectories through data and community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "AI-Powered Matching", desc: "Our proprietary neural engine deciphers your true potential and matches you with roles where you'll thrive.", color: "blue", icon: Zap },
              { title: "High-Growth Network", desc: "Gain exclusive access to Tier-1 startups and venture-backed teams that aren't hiring anywhere else.", color: "purple", icon: Rocket },
              { title: "Verified Reputation", desc: "Build a persistent career profile with verified skill badges and performance history that recruiters trust.", color: "rose", icon: Star },
            ].map((feature, i) => (
              <div key={i} className="bento-card p-10 group hover:-translate-y-3 transition-all duration-500 relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>
                <div className="w-16 h-16 rounded-[24px] bg-muted flex items-center justify-center text-foreground mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 rotate-3 group-hover:rotate-0">
                  <feature.icon size={32} />
                </div>
                <h3 className="text-2xl font-headline font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-medium">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 mb-32">
          <div className="max-w-7xl mx-auto vibrant-gradient rounded-[48px] p-16 md:p-32 text-center text-white relative shadow-[0_48px_96px_rgba(79,70,229,0.3)] overflow-hidden">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-black/10 rounded-full blur-[100px]"></div>
            
            <div className="relative z-10 space-y-10 max-w-3xl mx-auto">
              <h2 className="text-5xl md:text-7xl font-headline font-bold tracking-tight">Your next chapter starts today.</h2>
              <p className="text-xl text-white/80 max-w-xl mx-auto font-medium leading-relaxed">
                Join the elite network of students building the future. Your core team seat is waiting.
              </p>
              <div className="flex justify-center pt-4">
                <Link href="/opportunities">
                  <Button size="lg" variant="secondary" className="rounded-full px-16 h-20 text-xl font-bold shadow-2xl bg-white text-primary hover:bg-white/90 transition-all hover:scale-105">
                    Start Applying
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
