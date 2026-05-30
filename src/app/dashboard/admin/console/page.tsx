"use client";

import { useState, useMemo } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { useUser, useFirestore, useCollection } from "@/firebase";
import { collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Plus, Trash2, CheckCircle2, XCircle, Layout, MessageSquare, ShieldCheck, BarChart3, FileText, Settings, LogOut, Sparkles } from "lucide-react";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";

const ADMIN_EMAIL = "codenine0504@gmail.com";

export default function AdminConsole() {
  const { user } = useUser();
  const db = useFirestore();

  const specializationsQuery = useMemo(() => db ? collection(db, "specializations") : null, [db]);
  const teamsQuery = useMemo(() => db ? collection(db, "teams") : null, [db]);
  const requestsQuery = useMemo(() => db ? collection(db, "requests") : null, [db]);
  const enquiriesQuery = useMemo(() => db ? collection(db, "enquiries") : null, [db]);

  const { data: specializations } = useCollection(specializationsQuery);
  const { data: teams } = useCollection(teamsQuery);
  const { data: requests } = useCollection(requestsQuery);
  const { data: enquiries } = useCollection(enquiriesQuery);

  const [newSpec, setNewSpec] = useState({ label: "", description: "", icon: "Code", imageUrl: "", color: "blue" });
  const [newTeam, setNewTeam] = useState({ name: "", company: "", description: "", categoryId: "", seats: "1/3", stipend: "$1,500/mo", skills: "", theme: "blue" });

  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/20 p-6">
        <Card className="max-w-md w-full p-8 text-center space-y-6">
          <ShieldCheck className="h-16 w-16 mx-auto text-destructive opacity-50" />
          <h1 className="text-3xl font-headline font-bold">Access Denied</h1>
          <p className="text-muted-foreground">This area is reserved for systems administrators only.</p>
          <Link href="/">
            <Button variant="outline" className="w-full">Return Home</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const handleAddSpecialization = () => {
    if (!db) return;
    const id = newSpec.label.toLowerCase().replace(/\s+/g, "-");
    addDoc(collection(db, "specializations"), { ...newSpec, id })
      .then(() => {
        toast({ title: "Success", description: "Specialization added." });
        setNewSpec({ label: "", description: "", icon: "Code", imageUrl: "", color: "blue" });
      });
  };

  const handleAddTeam = () => {
    if (!db) return;
    const teamData = {
      ...newTeam,
      skills: newTeam.skills.split(",").map(s => s.trim()),
      timestamp: Date.now()
    };
    addDoc(collection(db, "teams"), teamData)
      .then(() => {
        toast({ title: "Success", description: "Team squad created." });
        setNewTeam({ name: "", company: "", description: "", categoryId: "", seats: "1/3", stipend: "$1,500/mo", skills: "", theme: "blue" });
      });
  };

  const handleDeleteDoc = (coll: string, docId: string) => {
    if (!db) return;
    deleteDoc(doc(db, coll, docId)).then(() => toast({ title: "Deleted", description: "Record removed." }));
  };

  const handleUpdateStatus = (coll: string, docId: string, status: string) => {
    if (!db) return;
    updateDoc(doc(db, coll, docId), { status });
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background w-full">
        <Sidebar variant="inset">
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-2 font-headline font-bold text-xl px-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-sm">C9</div>
              <span>Admin Console</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu className="px-2">
              <SidebarMenuItem><Link href="/dashboard/admin"><SidebarMenuButton><BarChart3 /> <span>Overview</span></SidebarMenuButton></Link></SidebarMenuItem>
              <SidebarMenuItem><Link href="/dashboard/admin/applications"><SidebarMenuButton><FileText /> <span>Applications</span></SidebarMenuButton></Link></SidebarMenuItem>
              <SidebarMenuItem><SidebarMenuButton isActive><Settings /> <span>Control Center</span></SidebarMenuButton></SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="flex flex-col bg-muted/10">
          <header className="flex h-16 shrink-0 items-center justify-between px-6 border-b bg-white">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div className="h-6 w-px bg-border"></div>
              <h2 className="font-headline font-bold text-lg">System Management</h2>
            </div>
          </header>

          <main className="flex-1 p-8 overflow-y-auto">
            <Tabs defaultValue="specializations" className="space-y-8">
              <TabsList className="bg-white border p-1 rounded-2xl h-14">
                <TabsTrigger value="specializations" className="rounded-xl px-6 h-12">Categories</TabsTrigger>
                <TabsTrigger value="teams" className="rounded-xl px-6 h-12">Active Teams</TabsTrigger>
                <TabsTrigger value="requests" className="rounded-xl px-6 h-12">Requests</TabsTrigger>
                <TabsTrigger value="enquiries" className="rounded-xl px-6 h-12">Enquiries</TabsTrigger>
              </TabsList>

              <TabsContent value="specializations" className="space-y-6">
                <Card className="bento-card">
                  <CardHeader><CardTitle>Add Specialization</CardTitle></CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2"><Label>Label</Label><Input value={newSpec.label} onChange={e => setNewSpec({ ...newSpec, label: e.target.value })} /></div>
                    <div className="space-y-2"><Label>Icon (Lucide Name)</Label><Input value={newSpec.icon} onChange={e => setNewSpec({ ...newSpec, icon: e.target.value })} /></div>
                    <div className="space-y-2"><Label>Image URL (Optional)</Label><Input placeholder="https://..." value={newSpec.imageUrl} onChange={e => setNewSpec({ ...newSpec, imageUrl: e.target.value })} /></div>
                    <div className="space-y-2 md:col-span-2 lg:col-span-3"><Label>Description</Label><Input value={newSpec.description} onChange={e => setNewSpec({ ...newSpec, description: e.target.value })} /></div>
                    <Button onClick={handleAddSpecialization} className="col-span-full rounded-xl h-12">Add Specialization</Button>
                  </CardContent>
                </Card>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {specializations?.map((spec: any) => (
                    <Card key={spec._id} className="bento-card p-6 flex justify-between items-center group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center overflow-hidden">
                           {spec.imageUrl ? <img src={spec.imageUrl} alt={spec.label} className="w-full h-full object-cover" /> : <Layout size={20} className="text-primary" />}
                        </div>
                        <div><h4 className="font-bold">{spec.label}</h4></div>
                      </div>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDeleteDoc('specializations', spec._id)}><Trash2 size={16} /></Button>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="teams" className="space-y-6">
                <Card className="bento-card">
                  <CardHeader><CardTitle>Create Team</CardTitle></CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2"><Label>Team Name</Label><Input value={newTeam.name} onChange={e => setNewTeam({ ...newTeam, name: e.target.value })} /></div>
                    <div className="space-y-2"><Label>Company</Label><Input value={newTeam.company} onChange={e => setNewTeam({ ...newTeam, company: e.target.value })} /></div>
                    <div className="space-y-2"><Label>Category ID</Label><Input value={newTeam.categoryId} onChange={e => setNewTeam({ ...newTeam, categoryId: e.target.value })} /></div>
                    <Button onClick={handleAddTeam} className="col-span-full">Launch Team</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="requests">
                <Card className="bento-card overflow-hidden">
                  <Table>
                    <TableHeader className="bg-muted/30">
                      <TableRow>
                        <TableHead>Applicant</TableHead>
                        <TableHead>Team</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {requests?.map((req: any) => (
                        <TableRow key={req._id}>
                          <TableCell><div className="font-bold">{req.userName}</div><div className="text-xs">{req.userEmail}</div></TableCell>
                          <TableCell>{req.teamName}</TableCell>
                          <TableCell><Badge variant={req.status === 'accepted' ? 'default' : 'secondary'}>{req.status}</Badge></TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button size="sm" variant="ghost" className="text-green-600" onClick={() => handleUpdateStatus('requests', req._id, 'accepted')}><CheckCircle2 size={18} /></Button>
                            <Button size="sm" variant="ghost" className="text-red-600" onClick={() => handleUpdateStatus('requests', req._id, 'rejected')}><XCircle size={18} /></Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>

              <TabsContent value="enquiries">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {enquiries?.map((enq: any) => (
                    <Card key={enq._id} className="bento-card p-8 space-y-4">
                      <div className="flex justify-between"><Badge>{enq.service}</Badge></div>
                      <div><h4 className="font-bold">{enq.name}</h4><p className="text-xs">{enq.email}</p></div>
                      <p className="bg-muted/30 p-4 rounded-xl text-sm italic">"{enq.message}"</p>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
