
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Calendar, Building2, MapPin, ExternalLink, Github, Linkedin, CheckCircle2 } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

const HIRED_STUDENTS = [
  {
    name: "Alex Rivera",
    role: "Web Developer",
    company: "NextGen AI",
    college: "Stanford University",
    skills: ["React", "Typescript", "Tailwind"],
    joined: "Feb 2024",
    status: "Hired",
    image: PlaceHolderImages.find(img => img.id === 'student-1')?.imageUrl,
    theme: "blue"
  },
  {
    name: "Sarah Chen",
    role: "UI/UX Designer",
    company: "Creative Labs",
    college: "MIT",
    skills: ["Figma", "UX Strategy", "Cinema4D"],
    joined: "Jan 2024",
    status: "Core Team",
    image: PlaceHolderImages.find(img => img.id === 'student-2')?.imageUrl,
    theme: "pink"
  },
  {
    name: "Marcus Thorne",
    role: "Film Producer",
    company: "SecureLink",
    college: "UC Berkeley",
    skills: ["Directing", "Editing", "Sound Design"],
    joined: "Mar 2024",
    status: "Active",
    image: PlaceHolderImages.find(img => img.id === 'student-3')?.imageUrl,
    theme: "cyan"
  },
  {
    name: "Elena Rodriguez",
    role: "Animation Expert",
    company: "DeepNeural",
    college: "Georgia Tech",
    skills: ["Maya", "After Effects", "Rive"],
    joined: "Dec 2023",
    status: "Hired",
    image: PlaceHolderImages.find(img => img.id === 'student-4')?.imageUrl,
    theme: "purple"
  }
];

export default function ShowcasePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <header className="mb-20 space-y-6 text-center">
            <h1 className="text-5xl md:text-7xl font-headline font-bold">The <span className="vibrant-text italic underline">Alumni</span> Network</h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Meet the elite students who landed roles in world-class squads through the Code-9 ecosystem.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {HIRED_STUDENTS.map((student, idx) => (
              <div key={idx} className="bento-card overflow-hidden group hover:shadow-2xl transition-all duration-700 flex flex-col border-2 hover:border-primary/20">
                <div className="relative aspect-[4/5]">
                  {student.image && (
                    <Image 
                      src={student.image} 
                      alt={student.name} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      data-ai-hint="person portrait"
                    />
                  )}
                  <div className="absolute top-5 right-5">
                    <Badge className={cn(
                      "rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest shadow-lg",
                      student.status === 'Hired' && "bg-green-500 hover:bg-green-600",
                      student.status === 'Core Team' && "bg-primary hover:bg-primary/90",
                      student.status === 'Active' && "bg-blue-500 hover:bg-blue-600",
                    )}>
                      {student.status}
                    </Badge>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <h3 className="text-2xl font-headline font-bold text-white mb-1">{student.name}</h3>
                    <p className="text-sm font-bold text-white/80 uppercase tracking-widest">{student.role}</p>
                  </div>
                </div>
                
                <div className="p-8 flex-grow flex flex-col bg-white">
                  <div className="mb-6 space-y-4">
                    <div className="flex items-center gap-3 bg-muted/50 p-3 rounded-2xl border border-muted">
                      <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-md">
                        <Building2 size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Hired By</p>
                        <p className="font-bold text-sm">{student.company}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8 flex-grow">
                    <div className="flex items-center text-xs font-bold text-muted-foreground space-x-3">
                      <MapPin size={16} className="text-primary" />
                      <span>{student.college}</span>
                    </div>
                    <div className="flex items-center text-xs font-bold text-muted-foreground space-x-3">
                      <Calendar size={16} className="text-primary" />
                      <span>Class of {student.joined}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {student.skills.map(skill => (
                        <span key={skill} className="text-[9px] px-3 py-1 rounded-full bg-muted font-black text-muted-foreground uppercase border transition-colors hover:bg-primary/10 hover:text-primary">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t">
                    <div className="flex space-x-4">
                      <Github size={20} className="text-muted-foreground hover:text-foreground cursor-pointer transition-all hover:scale-110" />
                      <Linkedin size={20} className="text-muted-foreground hover:text-primary cursor-pointer transition-all hover:scale-110" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 border border-green-100">
                      <CheckCircle2 size={20} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-32 text-center space-y-10 bg-primary rounded-[64px] p-20 md:p-32 text-white relative overflow-hidden shadow-2xl shadow-primary/30">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-white/10 rounded-full blur-[150px]"></div>
            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-6xl font-headline font-bold leading-tight italic">"The core team model allowed me to show how I work in a squad, not just how I code in a vacuum."</h2>
              <div className="space-y-2">
                <p className="text-2xl font-bold">Alex Rivera</p>
                <p className="text-sm uppercase tracking-[0.3em] font-black opacity-70">Senior Web Developer @ NextGen AI</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
