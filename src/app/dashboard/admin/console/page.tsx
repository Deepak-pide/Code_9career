
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
import { collection, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { Plus, Trash2, CheckCircle2, XCircle, Layout, MessageSquare, ShieldCheck, BarChart3, FileText, Briefcase, Users, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";

const ADMIN_EMAIL = "codenine0504@gmail.com";

export default function AdminConsole() {
  const { user } = useUser();
  const db = useFirestore();

  // Firestore Collections
  const specializationsQuery = useMemo(() => db ? collection(db, "specializations") : null, [db]);
  const requestsQuery = useMemo(() => db ? collection(db, "requests") : null, [db]);
  const enquiriesQuery = useMemo(() => db ? collection(db, "enquiries") : null, [db]);

  const { data: specializations } = useCollection(specializationsQuery);
  const { data: requests } = useCollection(requestsQuery);
  const { data: enquiries } = useCollection(enquiriesQuery);

  const [newSpec, setNewSpec] = useState({ label: "", description: "", icon: "Code", color: "blue" });

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
        setNewSpec({ label: "", description: "", icon: "Code", color: "blue" });
      });
  };

  const handleDeleteSpecialization = (docId: string) => {
    if (!db) return;
    deleteDoc(doc(db, "specializations", docId));
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
            <Badge variant="outline" className="text-primary font-bold border-primary/20 bg-primary/5">
              Root Admin: {ADMIN_EMAIL}
            </Badge>
          </header>

          <main className="flex-1 p-8 overflow-y-auto">
            <Tabs defaultValue="specializations" className="space-y-8">
              <TabsList className="bg-white border p-1 rounded-2xl h-14">
                <TabsTrigger value="specializations" className="rounded-xl px-8 h-12 data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                  <Layout className="w-4 h-4 mr-2" /> Specializations
                </TabsTrigger>
                <TabsTrigger value="requests" className="rounded-xl px-8 h-12 data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                  <Users className="w-4 h-4 mr-2" /> Team Requests
                </TabsTrigger>
                <TabsTrigger value="enquiries" className="rounded-xl px-8 h-12 data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                  <MessageSquare className="w-4 h-4 mr-2" /> Service Enquiries
                </TabsTrigger>
              </TabsList>

              <TabsContent value="specializations" className="space-y-6">
                <Card className="bento-card border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl font-headline font-bold">Add New Specialization</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                    <div className="space-y-2">
                      <Label>Label</Label>
                      <Input placeholder="e.g. AI Specialist" value={newSpec.label} onChange={e => setNewSpec({ ...newSpec, label: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Icon Name</Label>
                      <Input placeholder="e.g. Brain" value={newSpec.icon} onChange={e => setNewSpec({ ...newSpec, icon: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Input placeholder="Brief overview..." value={newSpec.description} onChange={e => setNewSpec({ ...newSpec, description: e.target.value })} />
                    </div>
                    <Button onClick={handleAddSpecialization} className="rounded-xl h-10 vibrant-gradient border-none font-bold">
                      <Plus className="w-4 h-4 mr-2" /> Add Category
                    </Button>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {specializations?.map((spec: any) => (
                    <Card key={spec._id} className="bento-card border-none p-6 group">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <h3 className="font-bold text-xl">{spec.label}</h3>
                          <p className="text-sm text-muted-foreground italic leading-relaxed">"{spec.description}"</p>
                        </div>
                        <Button variant="ghost" size="icon" className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleDeleteSpecialization(spec._id)}>
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="requests">
                <Card className="bento-card border-none overflow-hidden bg-white">
                  <Table>
                    <TableHeader className="bg-muted/30">
                      <TableRow>
                        <TableHead className="font-bold">Applicant</TableHead>
                        <TableHead className="font-bold">Team</TableHead>
                        <TableHead className="font-bold">Status</TableHead>
                        <TableHead className="font-bold text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {requests?.map((req: any) => (
                        <TableRow key={req._id}>
                          <TableCell>
                            <div className="font-bold">{req.userName}</div>
                            <div className="text-xs text-muted-foreground">{req.userEmail}</div>
                          </TableCell>
                          <TableCell className="font-medium">{req.teamName}</TableCell>
                          <TableCell>
                            <Badge variant={req.status === 'accepted' ? 'default' : 'secondary'} className="rounded-full">
                              {req.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button size="sm" variant="ghost" className="text-green-600 h-8 w-8 p-0" onClick={() => handleUpdateStatus('requests', req._id, 'accepted')}>
                              <CheckCircle2 size={18} />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-red-600 h-8 w-8 p-0" onClick={() => handleUpdateStatus('requests', req._id, 'rejected')}>
                              <XCircle size={18} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>

              <TabsContent value="enquiries">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {enquiries?.map((enq: any) => (
                    <Card key={enq._id} className="bento-card border-none p-8 space-y-6">
                      <div className="flex justify-between items-center">
                        <Badge className="bg-primary/10 text-primary border-none">{enq.service}</Badge>
                        <span className="text-xs text-muted-foreground font-bold">{new Date(enq.timestamp).toLocaleDateString()}</span>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-bold text-lg">{enq.name}</h4>
                        <div className="flex gap-4 text-xs font-medium text-muted-foreground">
                          <span>{enq.email}</span>
                          <span>{enq.phone}</span>
                        </div>
                      </div>
                      <p className="bg-muted/30 p-4 rounded-xl text-sm italic border">"{enq.message}"</p>
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
