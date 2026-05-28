
"use client";

import { SidebarProvider, SidebarInset, SidebarTrigger, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { FileText, Briefcase, BarChart3, Users, Settings, LogOut, Bell, Sparkles, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { useState } from "react";
import { adminApplicantSummarizer } from "@/ai/flows/admin-applicant-summarizer";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

const APPLICATIONS = [
  { id: "1", name: "Alex Rivera", role: "Frontend Developer", date: "2024-03-20", status: "Pending", portfolio: "https://alex.dev", github: "https://github.com/alex" },
  { id: "2", name: "Elena Rodriguez", role: "AI Researcher", date: "2024-03-18", status: "Accepted", portfolio: "https://elena.ai", github: "https://github.com/elena" },
  { id: "3", name: "Marcus Thorne", role: "Backend Architect", date: "2024-03-15", status: "Pending", portfolio: "https://marcus.cloud", github: "https://github.com/marcus" },
];

export default function ApplicationsPage() {
  const [summaries, setSummaries] = useState<Record<string, { summary: string; score: number }>>({});
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [selectedSummary, setSelectedSummary] = useState<{ name: string; summary: string; score: number } | null>(null);

  const handleSummarize = async (appId: string, name: string) => {
    setLoadingId(appId);
    try {
      // For demo, using a mock resume data URI or real flow if data is available
      // In real scenario, we'd fetch this from Firebase
      const result = await adminApplicantSummarizer({
        resumeDataUri: "data:text/plain;base64,VGhpcyBpcyBhIHJlc3VtZSBmb3IgYSBza2lsbGVkIGRldmVsb3BlciB3aXRoIDUgeWVhcnMgb2YgZXhwZXJpZW5jZS4=",
        jobDescription: "Looking for a proactive developer who understands React and systems architecture.",
        portfolioLink: "https://example.com",
        linkedInGitHubLink: "https://github.com/example"
      });
      
      setSummaries(prev => ({ ...prev, [appId]: { summary: result.summary, score: result.relevanceScore } }));
      setSelectedSummary({ name, summary: result.summary, score: result.relevanceScore });
      toast({ title: "AI Analysis Complete", description: `Successfully analyzed ${name}'s application.` });
    } catch (error) {
      toast({ variant: "destructive", title: "AI Error", description: "Failed to summarize resume. Please try again." });
    } finally {
      setLoadingId(null);
    }
  };

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
                <Link href="/dashboard/admin" className="w-full">
                  <SidebarMenuButton tooltip="Overview">
                    <BarChart3 /> <span>Overview</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive tooltip="Applications">
                  <FileText /> <span>Applications</span>
                </SidebarMenuButton>
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
              <h2 className="font-headline font-bold text-lg hidden md:block">Manage Applications</h2>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-headline font-bold">Inbound Applications</h1>
              <Badge variant="secondary" className="px-4 py-1 rounded-full uppercase tracking-widest text-[10px] font-bold">
                {APPLICATIONS.length} Pending
              </Badge>
            </div>

            <div className="bento-card border-none shadow-sm overflow-hidden bg-white">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead className="font-bold">Applicant</TableHead>
                    <TableHead className="font-bold">Position</TableHead>
                    <TableHead className="font-bold">Date</TableHead>
                    <TableHead className="font-bold">Status</TableHead>
                    <TableHead className="font-bold text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {APPLICATIONS.map((app) => (
                    <TableRow key={app.id} className="hover:bg-muted/10 transition-colors">
                      <TableCell>
                        <div className="font-bold">{app.name}</div>
                        <div className="text-xs text-muted-foreground flex gap-2">
                          <Link href={app.github} className="hover:text-primary">GitHub</Link>
                          <span>•</span>
                          <Link href={app.portfolio} className="hover:text-primary">Portfolio</Link>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{app.role}</TableCell>
                      <TableCell className="text-muted-foreground">{app.date}</TableCell>
                      <TableCell>
                        <Badge variant={app.status === 'Accepted' ? 'default' : 'secondary'} className="rounded-full px-3">
                          {app.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="rounded-full gap-2 border-primary/20 hover:bg-primary/5 text-primary"
                          onClick={() => handleSummarize(app.id, app.name)}
                          disabled={loadingId === app.id}
                        >
                          <Sparkles size={14} className={loadingId === app.id ? "animate-pulse" : ""} />
                          {summaries[app.id] ? "View AI Summary" : (loadingId === app.id ? "Analyzing..." : "AI Summarize")}
                        </Button>
                        <Button size="sm" variant="ghost" className="rounded-full h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50">
                          <CheckCircle2 size={18} />
                        </Button>
                        <Button size="sm" variant="ghost" className="rounded-full h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50">
                          <XCircle size={18} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </main>
        </SidebarInset>

        <Dialog open={!!selectedSummary} onOpenChange={(open) => !open && setSelectedSummary(null)}>
          <DialogContent className="max-w-2xl rounded-[32px] overflow-hidden border-none p-0">
            <div className="bg-primary p-8 text-white">
              <DialogHeader>
                <DialogTitle className="text-3xl font-headline font-bold flex items-center gap-2">
                  <Sparkles className="h-6 w-6" />
                  AI Candidate Insight
                </DialogTitle>
                <DialogDescription className="text-primary-foreground/80 text-lg">
                  Deep analysis for {selectedSummary?.name}
                </DialogDescription>
              </DialogHeader>
            </div>
            <div className="p-8 space-y-8 bg-white">
              <div className="space-y-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Match Score</span>
                  <span className="text-2xl font-headline font-bold text-primary">{selectedSummary?.score}%</span>
                </div>
                <Progress value={selectedSummary?.score} className="h-3 rounded-full bg-muted" />
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Executive Summary
                </h4>
                <div className="bg-muted/30 rounded-[20px] p-6 text-muted-foreground leading-relaxed italic border">
                  "{selectedSummary?.summary}"
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" className="rounded-full px-8" onClick={() => setSelectedSummary(null)}>Close</Button>
                <Button className="rounded-full px-8 shadow-lg shadow-primary/20">Proceed to Interview</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </SidebarProvider>
  );
}
