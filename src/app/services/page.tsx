
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SERVICES } from "@/lib/services-data";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function ServicesPage() {
  const handleEnquire = (serviceName: string) => {
    toast({
      title: "Enquiry Received",
      description: `We've received your interest in ${serviceName}. Our team will contact you within 24 hours.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-24 text-center space-y-6">
            <Badge variant="outline" className="px-6 py-2 rounded-full border-primary/20 text-primary font-bold uppercase tracking-[0.2em] bg-primary/5">
              Premium Solutions
            </Badge>
            <h1 className="text-5xl md:text-8xl font-headline font-bold tracking-tighter leading-none">
              Elite <span className="vibrant-text italic">Hiring Services.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
              From individual sourcing to fully-managed core teams, we provide the infrastructure for high-growth startups to leverage student talent.
            </p>
          </header>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.id} className="bento-card group p-10 flex flex-col justify-between border-2 hover:border-primary/20 transition-all duration-700">
                  <div className="space-y-8">
                    <div className={cn(
                      "w-16 h-16 rounded-[24px] flex items-center justify-center text-white shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3",
                      service.color === 'blue' && "bg-blue-500 shadow-blue-500/20",
                      service.color === 'purple' && "bg-purple-500 shadow-purple-500/20",
                      service.color === 'emerald' && "bg-emerald-500 shadow-emerald-500/20",
                      service.color === 'amber' && "bg-amber-500 shadow-amber-500/20",
                      service.color === 'rose' && "bg-rose-500 shadow-rose-500/20",
                      service.color === 'cyan' && "bg-cyan-500 shadow-cyan-500/20",
                    )}>
                      <Icon size={32} />
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-3xl font-headline font-bold">{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed font-medium italic">
                        "{service.description}"
                      </p>
                    </div>

                    <ul className="space-y-3 pt-4">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm font-bold text-muted-foreground/80">
                          <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-12">
                    <Button 
                      onClick={() => handleEnquire(service.title)}
                      className="w-full h-14 rounded-2xl font-bold text-lg vibrant-gradient border-none shadow-xl shadow-primary/10 transition-transform hover:scale-[1.02]"
                    >
                      Enquire Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-32 p-16 md:p-24 rounded-[64px] bg-muted/30 border border-muted text-center space-y-10 relative overflow-hidden">
             <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full"></div>
             <div className="relative z-10 space-y-6">
                <h2 className="text-4xl md:text-6xl font-headline font-bold tracking-tight italic">Need something more custom?</h2>
                <p className="text-xl text-muted-foreground max-w-xl mx-auto font-medium">
                  We offer bespoke talent partnership agreements for enterprise partners looking for dedicated engineering pipelines.
                </p>
                <div className="pt-6">
                  <Button size="lg" variant="outline" className="h-16 px-12 rounded-full font-bold text-xl border-2">
                    Book a Strategy Call
                  </Button>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
