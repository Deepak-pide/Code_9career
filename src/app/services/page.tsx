
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SERVICES } from "@/lib/services-data";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle2, Phone, Mail, User, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Footer } from "@/components/layout/Footer";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const enquiryFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  service: z.string({ required_error: "Please select a service." }),
  message: z.string().min(10, { message: "Please tell us a bit more about your project (min 10 chars)." }),
});

type EnquiryFormValues = z.infer<typeof enquiryFormSchema>;

export default function ServicesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");

  const form = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquiryFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  const handleEnquireClick = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    form.setValue("service", serviceTitle);
    setIsDialogOpen(true);
  };

  function onSubmit(data: EnquiryFormValues) {
    console.log(data);
    toast({
      title: "Enquiry Sent!",
      description: "We've received your request and will get back to you within 24 hours.",
    });
    setIsDialogOpen(false);
    form.reset();
  }

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
                      onClick={() => handleEnquireClick(service.title)}
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
             <div className="relative z-10 space-y-8">
                <h2 className="text-4xl md:text-6xl font-headline font-bold tracking-tight italic">Need something more custom?</h2>
                <p className="text-xl text-muted-foreground max-w-xl mx-auto font-medium">
                  We offer bespoke talent partnership agreements for enterprise partners looking for dedicated engineering pipelines.
                </p>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-4">
                  <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm px-8 py-4 rounded-3xl border shadow-sm">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white">
                      <Phone size={24} />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Call Us</p>
                      <a href="tel:9179349919" className="text-lg font-bold hover:text-primary transition-colors">917-934-9919</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm px-8 py-4 rounded-3xl border shadow-sm">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white">
                      <Mail size={24} />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Email Us</p>
                      <a href="mailto:codenine0504@gmail.com" className="text-lg font-bold hover:text-primary transition-colors">codenine0504@gmail.com</a>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="h-16 px-12 rounded-full font-bold text-xl border-2 hover:bg-white transition-all shadow-lg"
                    onClick={() => handleEnquireClick("Custom Enterprise Solution")}
                  >
                    Book a Strategy Call
                  </Button>
                </div>
             </div>
          </div>
        </div>
      </main>
      <Footer />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px] rounded-[32px] p-0 overflow-hidden border-none shadow-2xl">
          <div className="vibrant-gradient p-8 text-white relative">
            <div className="absolute top-0 right-0 p-8 opacity-20">
              <Send size={80} strokeWidth={1} />
            </div>
            <DialogHeader>
              <DialogTitle className="text-3xl font-headline font-bold">Start Your Project</DialogTitle>
              <DialogDescription className="text-primary-foreground/80 text-lg">
                Tell us what you're building, and we'll match you with the perfect squad.
              </DialogDescription>
            </DialogHeader>
          </div>
          
          <div className="p-8 bg-white">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-xs uppercase tracking-widest">Full Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Jane Doe" className="pl-10 h-12 rounded-xl" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-xs uppercase tracking-widest">Email Address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="jane@company.com" className="pl-10 h-12 rounded-xl" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-xs uppercase tracking-widest">Phone Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="917-000-0000" className="pl-10 h-12 rounded-xl" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-xs uppercase tracking-widest">Service Interested In</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 rounded-xl">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl">
                            {SERVICES.map((s) => (
                              <SelectItem key={s.id} value={s.title}>{s.title}</SelectItem>
                            ))}
                            <SelectItem value="Custom Enterprise Solution">Custom Enterprise Solution</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-xs uppercase tracking-widest">Project Details</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your goals, timeline, and any specific requirements..." 
                          className="min-h-[120px] rounded-xl resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full h-14 rounded-2xl text-lg font-bold vibrant-gradient border-none shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
                  Submit Enquiry
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
