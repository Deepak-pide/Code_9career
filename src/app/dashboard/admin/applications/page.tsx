
"use client";

import { SidebarProvider, SidebarInset, SidebarTrigger, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { FileText, Briefcase, BarChart3, Users, Settings, LogOut, Sparkles, CheckCircle2, XCircle, Loader2, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { useState, useMemo } from "react";
import { adminApplicantSummarizer } from "@/ai/flows/admin-applicant-summarizer";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { useFirestore, useCollection } from "@/firebase";
import { collection, updateDoc, doc } from "firebase/firestore";
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export default function ApplicationsPage() {
  const db = useFirestore();
  const requestsQuery = useMemo(() => db ? collection(db, "requests") : null, [db]);
  const { data: applications, loading: requestsLoading } = useCollection(requestsQuery);

  const [summaries, setSummaries] = useState<Record<string, { summary: string; score: number }>>({});
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [selectedSummary, setSelectedSummary] = useState<{ name: string; summary: string; score: number } | null>(null);

  const handleSummarize = async (appId: string, name: string) => {
    setLoadingId(appId);
    try {
      const result = await adminApplicantSummarizer({
        resumeDataUri: "data:text/plain;base64,VGhpcyBpcyBhIHJlc3VtZSBmb3IgYSBza2lsbGVkIGRldmVsb3BlciB3aXRoIDUgeWVhcnMgb2YgZXhwZXJpZW5jZS4=",
        jobDescription: "Looking for a proactive developer who understands React and systems architecture.",
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

  const handleUpdateStatus = (appId: string, status: 'accepted' | 'rejected') => {
    if (!db) return;
    updateDoc(doc(db, "requests", appId), { status })
      .then(() => toast({ title: "Updated", description: `Application ${status}.` }))
      .catch(async (err) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: `requests/${appId}`,
          operation: 'update',
          requestResourceData: { status },
        }));
      });
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
              <SidebarMenuItem><Link href="/dashboard/admin"><SidebarMenuButton tooltip="Overview"><BarChart3 /> <span>Overview</span></SidebarMenuButton></Link></SidebarMenuItem>
              <SidebarMenuItem><SidebarMenuButton isActive tooltip="Applications"><FileText /> <span>Applications</span></SidebarMenuButton></SidebarMenuItem>
              <SidebarMenuItem><Link href="/dashboard/admin/console"><SidebarMenuButton tooltip="Control Center"><Settings /> <span>Control Center</span></SidebarMenuButton></Link></SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="flex flex-col">
          <header className="flex h-16 shrink-0 items-center justify-between px-6 border-b">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div className="h-6 w-px bg-border"></div>
              <h2 className="font-headline font-bold text-lg">Manage Applications</h2>
            </div>
          </header>

          <main className="flex-1 p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-headline font-bold">Inbound Applications</h1>
              <Badge variant="secondary" className="px-4 py-1 rounded-full">
                {applications?.length || 0} Total
              </Badge>
            </div>

            <div className="bento-card border-none shadow-sm overflow-hidden bg-white min-h-[400px]">
              {requestsLoading ? (
                <div className="p-12 flex justify-center items-center h-full"><Loader2 className="animate-spin text-primary h-8 w-8" /></div>
              ) : applications && applications.length > 0 ? (
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow>
                      <TableHead className="font-bold">Applicant</TableHead>
                      <TableHead className="font-bold">Team</TableHead>
                      <TableHead className="font-bold">Status</TableHead>
                      <TableHead className="font-bold text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.map((app: any) => (
                      <TableRow key={app._id} className="hover:bg-muted/10 transition-colors">
                        <TableCell>
                          <div className="font-bold">{app.userName}</div>
                          <div className="text-xs text-muted-foreground">{app.userEmail}</div>
                        </TableCell>
                        <TableCell className="font-medium">{app.teamName}</TableCell>
                        <TableCell>
                          <Badge variant={app.status === 'accepted' ? 'default' : 'secondary'} className="rounded-full px-3">
                            {app.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="rounded-full gap-2 border-primary/20 hover:bg-primary/5 text-primary"
                            onClick={() => handleSummarize(app._id, app.userName)}
                            disabled={loadingId === app._id}
                          >
                            <Sparkles size={14} className={loadingId === app._id ? "animate-pulse" : ""} />
                            {summaries[app._id] ? "View AI Summary" : (loadingId === app._id ? "Analyzing..." : "AI Summarize")}
                          </Button>
                          <Button size="sm" variant="ghost" className="rounded-full h-8 w-8 p-0 text-green-600" onClick={() => handleUpdateStatus(app._id, 'accepted')}>
                            <CheckCircle2 size={18} />
                          </Button>
                          <Button size="sm" variant="ghost" className="rounded-full h-8 w-8 p-0 text-red-600" onClick={() => handleUpdateStatus(app._id, 'rejected')}>
                            <XCircle size={18} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center p-20 text-center space-y-4">
                  <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center text-muted-foreground/30">
                    <Inbox size={32} />
                  </div>
                  <h3 className="text-xl font-headline font-bold">No applications yet</h3>
                  <p className="text-muted-foreground max-w-xs mx-auto">Incoming requests from students will appear here for your review.</p>
                </div>
              )}
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
                <h4 className="font-bold text-lg flex items-center gap-2"><FileText className="h-5 w-5 text-primary" />Executive Summary</h4>
                <div className="bg-muted/30 rounded-[20px] p-6 text-muted-foreground leading-relaxed italic border">"{selectedSummary?.summary}"</div>
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
