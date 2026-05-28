"use client";

import { SidebarProvider, SidebarInset, SidebarTrigger, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, FileText, CheckCircle, BarChart3, Settings, LogOut, Bell, Plus, TrendingUp, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { cn } from "@/lib/utils";

const DATA = [
  { name: 'Mon', apps: 40, active: 20 },
  { name: 'Tue', apps: 30, active: 25 },
  { name: 'Wed', apps: 65, active: 45 },
  { name: 'Thu', apps: 45, active: 30 },
  { name: 'Fri', apps: 90, active: 70 },
  { name: 'Sat', apps: 55, active: 40 },
  { name: 'Sun', apps: 70, active: 55 },
];

export default function AdminDashboard() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background w-full">
        <Sidebar variant="inset" className="border-r-0">
          <SidebarHeader className="p-6">
            <div className="flex items-center gap-3 font-headline font-bold text-2xl px-2">
              <div className="w-10 h-10 vibrant-gradient rounded-xl flex items-center justify-center text-white text-lg shadow-lg">C9</div>
              <span className="tracking-tighter">Admin <span className="text-primary italic">X</span></span>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-4">
            <SidebarMenu className="gap-2">
              {[
                { label: "Overview", icon: BarChart3, active: true, path: "/dashboard/admin" },
                { label: "Applications", icon: FileText, active: false, path: "/dashboard/admin/applications" },
                { label: "Opportunities", icon: Briefcase, active: false, path: "#" },
                { label: "Talent Registry", icon: Users, active: false, path: "#" },
                { label: "Systems", icon: Settings, active: false, path: "#" },
              ].map((item, idx) => (
                <SidebarMenuItem key={idx}>
                  <Link href={item.path} className="w-full">
                    <SidebarMenuButton isActive={item.active} className={cn(
                      "h-12 rounded-xl transition-all duration-300",
                      item.active ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "hover:bg-muted"
                    )}>
                      <item.icon className="w-5 h-5" /> <span className="font-bold text-sm ml-2">{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <div className="mt-auto p-6 space-y-4">
            <div className="bg-primary/5 rounded-[24px] p-6 border border-primary/10">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Pro Plan</p>
              <p className="text-sm font-medium text-muted-foreground leading-snug mb-4">You have 14 days left on your premium trial.</p>
              <Button size="sm" className="w-full rounded-full bg-primary font-bold">Upgrade Now</Button>
            </div>
            <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground h-12 rounded-xl">
              <LogOut size={20} />
              <span className="font-bold text-sm">Logout</span>
            </Button>
          </div>
        </Sidebar>

        <SidebarInset className="flex flex-col bg-muted/20">
          <header className="flex h-20 shrink-0 items-center justify-between px-8 bg-background/50 backdrop-blur-xl border-b sticky top-0 z-50">
            <div className="flex items-center gap-6">
              <SidebarTrigger className="h-10 w-10 hover:bg-muted rounded-xl" />
              <div className="h-6 w-px bg-border hidden md:block"></div>
              <div className="hidden md:block">
                <h2 className="font-headline font-bold text-xl tracking-tight">Command Center</h2>
                <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground">Analytics Engine 2.0</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden sm:flex items-center gap-2 bg-muted/50 p-1.5 rounded-full px-4 border">
                <Filter size={14} className="text-muted-foreground" />
                <span className="text-xs font-bold text-muted-foreground">Last 7 Days</span>
              </div>
              <Button variant="ghost" size="icon" className="relative h-11 w-11 rounded-2xl bg-background shadow-sm border">
                <Bell size={20} />
                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-background"></span>
              </Button>
              <div className="w-11 h-11 rounded-2xl vibrant-gradient border-2 border-white flex items-center justify-center font-bold text-white shadow-lg">
                AD
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-8 space-y-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div>
                <h1 className="text-4xl font-headline font-bold tracking-tight">System Health</h1>
                <p className="text-muted-foreground font-medium mt-1">Real-time recruitment performance monitoring.</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="rounded-full h-12 px-6 font-bold gap-2">
                  Generate Report
                </Button>
                <Button className="rounded-full h-12 px-8 font-bold gap-2 vibrant-gradient shadow-xl shadow-primary/30 border-none transition-transform hover:scale-105">
                  <Plus size={20} />
                  Post Opportunity
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { label: "Inbound Pipeline", value: "2,842", trend: "+14.2%", icon: Users, color: "indigo" },
                { label: "Active Roles", value: "24", trend: "+4 this week", icon: Briefcase, color: "fuchsia" },
                { label: "AI Screenings", value: "156", trend: "42 pending", icon: FileText, color: "amber" },
                { label: "Successful Hires", value: "312", trend: "92% rate", icon: CheckCircle, color: "emerald" },
              ].map((stat, i) => (
                <Card key={i} className="bento-card overflow-hidden group">
                  <div className={cn("h-1.5 w-full", 
                    stat.color === 'indigo' && "bg-indigo-500",
                    stat.color === 'fuchsia' && "bg-fuchsia-500",
                    stat.color === 'amber' && "bg-amber-500",
                    stat.color === 'emerald' && "bg-emerald-500",
                  )}></div>
                  <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</CardTitle>
                    <div className={cn("p-2 rounded-xl bg-muted group-hover:bg-primary group-hover:text-white transition-all duration-500")}>
                      <stat.icon size={16} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-headline font-bold tracking-tighter">{stat.value}</div>
                    <div className="flex items-center gap-1.5 mt-2">
                      <TrendingUp size={12} className="text-emerald-500" />
                      <p className="text-[11px] font-bold text-emerald-600">{stat.trend}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <Card className="lg:col-span-2 bento-card border-none overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-headline font-bold">Activity Velocity</CardTitle>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Applications vs Interviews</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Applications</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Active</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="h-[350px] pt-6 pr-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={DATA}>
                      <defs>
                        <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#a855f7" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border)/0.5)" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700}} />
                      <Tooltip 
                        contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', padding: '12px'}} 
                        labelStyle={{fontWeight: 800, marginBottom: '4px', fontSize: '12px'}}
                      />
                      <Area type="monotone" dataKey="apps" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorApps)" strokeWidth={4} dot={{r: 4, fill: 'hsl(var(--primary))', strokeWidth: 2, stroke: '#fff'}} />
                      <Area type="monotone" dataKey="active" stroke="#a855f7" fillOpacity={1} fill="url(#colorActive)" strokeWidth={3} strokeDasharray="5 5" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bento-card border-none overflow-hidden flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl font-headline font-bold">Recent Intelligence</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 space-y-8">
                  {[
                    { user: "Alex Rivera", action: "final stage with", role: "NextGen AI", time: "2m ago", status: "priority" },
                    { user: "AI Engine", action: "summarized", role: "Elena Rodriguez", time: "15m ago", status: "success" },
                    { user: "Marcus Thorne", action: "updated", role: "Backend Repo", time: "1h ago", status: "neutral" },
                    { user: "System", action: "flagged", role: "Potential Match", time: "4h ago", status: "warning" },
                  ].map((activity, i) => (
                    <div key={i} className="flex gap-5 items-start group">
                      <div className="relative">
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center text-sm font-bold shadow-sm transition-transform group-hover:scale-110 duration-500",
                          activity.status === 'priority' ? "bg-primary text-white" : "bg-muted"
                        )}>
                          {activity.user[0]}
                        </div>
                        {activity.status === 'priority' && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
                        )}
                      </div>
                      <div className="space-y-1 flex-1">
                        <p className="text-sm leading-tight">
                          <span className="font-bold text-foreground">{activity.user}</span> <span className="text-muted-foreground">{activity.action}</span> <span className="font-bold text-primary">{activity.role}</span>
                        </p>
                        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <div className="p-6 pt-0 mt-auto border-t">
                  <Button variant="ghost" className="w-full text-xs font-bold uppercase tracking-[0.2em] text-primary">View Full Audit Log</Button>
                </div>
              </Card>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
