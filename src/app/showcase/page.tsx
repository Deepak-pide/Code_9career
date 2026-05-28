
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Calendar, Building2, MapPin, ExternalLink, Github, Linkedin } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const HIRED_STUDENTS = [
  {
    name: "Alex Rivera",
    role: "Frontend Engineer",
    company: "NextGen AI",
    college: "Stanford University",
    skills: ["React", "Typescript", "Tailwind"],
    joined: "Feb 2024",
    status: "Hired",
    image: PlaceHolderImages.find(img => img.id === 'student-1')?.imageUrl
  },
  {
    name: "Sarah Chen",
    role: "Product Designer",
    company: "Creative Labs",
    college: "MIT",
    skills: ["Figma", "UX Strategy", "Cinema4D"],
    joined: "Jan 2024",
    status: "Core Team",
    image: PlaceHolderImages.find(img => img.id === 'student-2')?.imageUrl
  },
  {
    name: "Marcus Thorne",
    role: "Backend Architect",
    company: "SecureLink",
    college: "UC Berkeley",
    skills: ["Go", "Kubernetes", "Postgres"],
    joined: "Mar 2024",
    status: "Active",
    image: PlaceHolderImages.find(img => img.id === 'student-3')?.imageUrl
  },
  {
    name: "Elena Rodriguez",
    role: "AI Researcher",
    company: "DeepNeural",
    college: "Georgia Tech",
    skills: ["Python", "TensorFlow", "Math"],
    joined: "Dec 2023",
    status: "Hired",
    image: PlaceHolderImages.find(img => img.id === 'student-4')?.imageUrl
  }
];

export default function ShowcasePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <header className="mb-16 space-y-4 text-center">
            <h1 className="text-4xl md:text-6xl font-headline font-bold">Our <span className="text-primary">Talent</span> Showcase</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Meet the students who turned their skills into careers through the Code-9 portal.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {HIRED_STUDENTS.map((student, idx) => (
              <div key={idx} className="bento-card overflow-hidden group hover:shadow-xl transition-all duration-500 flex flex-col">
                <div className="relative aspect-square">
                  {student.image && (
                    <Image 
                      src={student.image} 
                      alt={student.name} 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      data-ai-hint="person portrait"
                    />
                  )}
                  <div className="absolute top-4 right-4">
                    <Badge className={cn(
                      "rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest",
                      student.status === 'Hired' && "bg-green-500 hover:bg-green-600",
                      student.status === 'Core Team' && "bg-purple-500 hover:bg-purple-600",
                      student.status === 'Active' && "bg-blue-500 hover:bg-blue-600",
                    )}>
                      {student.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-xl font-headline font-bold mb-1">{student.name}</h3>
                    <p className="text-sm font-medium text-primary mb-2">{student.role}</p>
                    <div className="flex items-center text-xs text-muted-foreground space-x-2">
                      <Building2 size={14} />
                      <span>{student.company}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 flex-grow">
                    <div className="flex items-center text-xs text-muted-foreground space-x-2">
                      <MapPin size={14} />
                      <span>{student.college}</span>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground space-x-2">
                      <Calendar size={14} />
                      <span>Joined {student.joined}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {student.skills.slice(0, 3).map(skill => (
                        <span key={skill} className="text-[9px] px-2 py-0.5 rounded-full bg-muted font-bold text-muted-foreground uppercase">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex space-x-3">
                      <Github size={18} className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
                      <Linkedin size={18} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                    </div>
                    <ExternalLink size={18} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 text-center space-y-8 bg-muted/50 rounded-[40px] p-12 md:p-24 border border-white/50">
            <div className="max-w-3xl mx-auto space-y-4">
              <h2 className="text-3xl md:text-4xl font-headline font-bold italic">"Code-9 was the missing link between my side projects and my dream job at NextGen AI."</h2>
              <p className="text-lg font-medium">Alex Rivera, Frontend Engineer</p>
              <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Class of 2024</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
