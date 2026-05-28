
"use client";

import { SidebarProvider, SidebarInset, SidebarTrigger, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, FileText, CheckCircle, BarChart3, Settings, LogOut, Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const DATA = [
  { name: 'Mon', apps: 40 },
  { name: 'Tue', apps: 30 },
  { name: 'Wed', apps: 65 },
  { name: 'Thu', apps: 45 },
  { name: 'Fri', apps: 90 },
  { name: 'Sat', apps: 55 },
  { name: 'Sun', apps: 70 },
];

export default function AdminDashboard() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background w-full">
        <Sidebar variant="inset">
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-2 font-headline font-bold text-xl px-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-sm">C9</div>
              <span>Admin Panel</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu className="px-2">
              <SidebarMenuItem>
                <SidebarMenuButton isActive tooltip="Overview">
                  <BarChart3 /> <span>Overview</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/dashboard/admin/applications" className="w-full">
                  <SidebarMenuButton tooltip="Applications">
                    <FileText /> <span>Applications</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Opportunities">
                  <Briefcase /> <span>Opportunities</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Talent">
                  <Users /> <span>Talent Management</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Settings">
                  <Settings /> <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <div className="mt-auto p-4">
            <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground">
              <LogOut size={18} />
              Logout
            </Button>
          </div>
        </Sidebar>

        <SidebarInset className="flex flex-col">
          <header className="flex h-16 shrink-0 items-center justify-between px-6 border-b">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div className="h-6 w-px bg-border hidden md:block"></div>
              <h2 className="font-headline font-bold text-lg hidden md:block">Dashboard Overview</h2>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              <div className="w-8 h-8 rounded-full bg-primary/10 border flex items-center justify-center font-bold text-xs">
                AD
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-headline font-bold">Welcome back, Admin</h1>
                <p className="text-muted-foreground">Here's what's happening with your recruitment funnel today.</p>
              </div>
              <Button className="rounded-full shadow-lg shadow-primary/20 gap-2">
                <Plus size={18} />
                New Opportunity
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Total Applicants", value: "1,284", trend: "+12.5%", icon: Users, color: "blue" },
                { label: "Active Openings", value: "14", trend: "+2", icon: Briefcase, color: "purple" },
                { label: "Applications", value: "48", trend: "new today", icon: FileText, color: "amber" },
                { label: "Hired Students", value: "156", trend: "+8.2%", icon: CheckCircle, color: "green" },
              ].map((stat, i) => (
                <Card key={i} className="bento-card border-none shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-headline font-bold">{stat.value}</div>
                    <p className="text-xs font-medium text-green-600 mt-1">{stat.trend}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-2 bento-card border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-headline font-bold">Application Trends</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={DATA}>
                      <defs>
                        <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                      <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                      <Area type="monotone" dataKey="apps" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorApps)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bento-card border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-headline font-bold">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      { user: "Alex Rivera", action: "applied for", role: "Frontend Dev", time: "2m ago" },
                      { user: "System", action: "summarized", role: "Elena's Resume", time: "15m ago" },
                      { user: "Admin", action: "approved", role: "Marcus Thorne", time: "1h ago" },
                      { user: "Sarah Chen", action: "joined", role: "Core Team", time: "4h ago" },
                    ].map((activity, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-muted flex-shrink-0 flex items-center justify-center text-[10px] font-bold uppercase">
                          {activity.user[0]}
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm">
                            <span className="font-bold">{activity.user}</span> {activity.action} <span className="font-bold text-primary">{activity.role}</span>
                          </p>
                          <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
