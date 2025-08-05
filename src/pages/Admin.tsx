import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { ScrollAnimatedDiv } from "@/hooks/useScrollAnimation";
import { 
  Mail, 
  MessageSquare, 
  Calendar, 
  User as UserIcon, 
  Building, 
  LogOut,
  Eye,
  EyeOff,
  Save,
  Download,
  BarChart3,
  Settings,
  Users,
  FileText,
  Globe,
  Shield,
  Activity,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  MoreHorizontal
} from "lucide-react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  business: string | null;
  message: string;
  status: string;
  created_at: string;
  admin_notes: string | null;
}

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    today: 0,
    thisWeek: 0
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check authentication
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (!session?.user) {
          navigate('/auth');
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchMessages();
      
      // Set up real-time subscription
      const channel = supabase
        .channel('contact_messages_changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'contact_messages'
          },
          () => {
            fetchMessages();
            toast({
              title: "New message received!",
              description: "The messages list has been updated.",
            });
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user, toast]);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setMessages(data || []);
      
      // Calculate stats
      const today = new Date().toDateString();
      const thisWeek = new Date();
      thisWeek.setDate(thisWeek.getDate() - 7);
      
      const todayMessages = data?.filter(msg => 
        new Date(msg.created_at).toDateString() === today
      ) || [];
      const unreadMessages = data?.filter(msg => msg.status === 'new') || [];
      const thisWeekMessages = data?.filter(msg => 
        new Date(msg.created_at) >= thisWeek
      ) || [];

      setStats({
        total: data?.length || 0,
        unread: unreadMessages.length,
        today: todayMessages.length,
        thisWeek: thisWeekMessages.length
      });
    } catch (error: any) {
      toast({
        title: "Error fetching messages",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (messageId: string, isRead: boolean) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status: isRead ? 'read' : 'new' })
        .eq('id', messageId);

      if (error) throw error;

      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, status: isRead ? 'read' : 'new' } : msg
      ));

      toast({
        title: `Message marked as ${isRead ? 'read' : 'unread'}`,
      });
    } catch (error: any) {
      toast({
        title: "Error updating message",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const saveNotes = async () => {
    if (!selectedMessage) return;

    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ admin_notes: adminNotes })
        .eq('id', selectedMessage.id);

      if (error) throw error;

      toast({
        title: "Notes saved successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error saving notes",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteMessage = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', messageId);

      if (error) throw error;

      setMessages(prev => prev.filter(msg => msg.id !== messageId));
      if (selectedMessage?.id === messageId) {
        setSelectedMessage(null);
      }

      toast({
        title: "Message deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting message",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const exportMessages = () => {
    const csvContent = [
      ['Date', 'Name', 'Email', 'Business', 'Message', 'Status'].join(','),
      ...messages.map(msg => [
        new Date(msg.created_at).toLocaleDateString(),
        `"${msg.name}"`,
        msg.email,
        `"${msg.business || ''}"`,
        `"${msg.message.replace(/"/g, '""')}"`,
        msg.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contact_messages_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  if (!user || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center animate-fade-in-up">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-6 shadow-lg"></div>
          <p className="text-lg font-medium animate-pulse">Loading admin panel...</p>
          <div className="flex justify-center mt-4 space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Buildnest</title>
        <meta name="description" content="Buildnest admin dashboard for managing contact messages and website administration." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="min-h-screen bg-muted/30">
        {/* Fixed Header */}
        <header className="h-16 border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
          <div className="h-full flex items-center justify-between px-4 lg:px-6">
            {/* Left side - Company branding */}
            <div className="flex items-center space-x-3">
              <Building className="h-6 w-6 text-primary" />
              <div>
                <h1 className="text-lg font-semibold">Buildnest</h1>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
              </div>
            </div>

            {/* Right side - User info and controls */}
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Globe className="h-4 w-4 mr-2" />
                EN
              </Button>
              <span className="text-sm text-muted-foreground">{user.email}</span>
              <Button 
                onClick={handleSignOut} 
                variant="outline" 
                size="sm"
                className="hover:bg-destructive hover:text-destructive-foreground"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 lg:px-6 py-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Welcome back, Admin</h2>
            <p className="text-muted-foreground">Here's what's happening with your platform today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground">All time messages</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">{stats.unread}</div>
                <p className="text-xs text-muted-foreground">Requires attention</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Messages</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.today}</div>
                <p className="text-xs text-muted-foreground">Received today</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Week</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.thisWeek}</div>
                <p className="text-xs text-muted-foreground">Last 7 days</p>
              </CardContent>
            </Card>
          </div>

          {/* Management Tabs */}
          <Tabs defaultValue="messages" className="space-y-6">
            <TabsList className="grid w-full lg:w-auto lg:grid-cols-4">
              <TabsTrigger value="messages" className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>Messages</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Users</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </TabsTrigger>
            </TabsList>

            {/* Messages Tab */}
            <TabsContent value="messages" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">Contact Messages</h3>
                  <p className="text-muted-foreground">Manage incoming contact form submissions</p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={exportMessages} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Messages List */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      All Messages
                    </CardTitle>
                    <CardDescription>
                      Click on a message to view details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-sm ${
                            selectedMessage?.id === message.id
                              ? 'border-primary bg-primary/5'
                              : 'hover:border-primary/50'
                          }`}
                          onClick={() => {
                            setSelectedMessage(message);
                            setAdminNotes(message.admin_notes || "");
                          }}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <UserIcon className="h-4 w-4" />
                              <span className="font-medium">{message.name}</span>
                              <Badge 
                                variant={message.status === 'new' ? 'destructive' : 'secondary'}
                              >
                                {message.status}
                              </Badge>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {new Date(message.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{message.email}</p>
                          {message.business && (
                            <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                              <Building className="h-3 w-3" />
                              {message.business}
                            </p>
                          )}
                          <p className="text-sm line-clamp-2">{message.message}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Message Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      {selectedMessage ? 'Message Details' : 'Select a Message'}
                    </CardTitle>
                    {selectedMessage && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => markAsRead(selectedMessage.id, selectedMessage.status === 'new')}
                        >
                          {selectedMessage.status === 'new' ? (
                            <>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Mark as Read
                            </>
                          ) : (
                            <>
                              <XCircle className="h-4 w-4 mr-2" />
                              Mark as Unread
                            </>
                          )}
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive hover:text-destructive-foreground">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the message.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => deleteMessage(selectedMessage.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    {selectedMessage ? (
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <UserIcon className="h-4 w-4" />
                            Contact Information
                          </h4>
                          <div className="space-y-2 text-sm p-3 bg-muted/50 rounded-lg">
                            <p><strong>Name:</strong> {selectedMessage.name}</p>
                            <p><strong>Email:</strong> {selectedMessage.email}</p>
                            {selectedMessage.business && (
                              <p><strong>Business:</strong> {selectedMessage.business}</p>
                            )}
                            <p><strong>Date:</strong> {new Date(selectedMessage.created_at).toLocaleString()}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <MessageSquare className="h-4 w-4" />
                            Message
                          </h4>
                          <div className="p-3 bg-muted rounded-lg">
                            <p className="text-sm whitespace-pre-wrap">{selectedMessage.message}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Admin Notes
                          </h4>
                          <Textarea
                            placeholder="Add your notes about this message..."
                            value={adminNotes}
                            onChange={(e) => setAdminNotes(e.target.value)}
                            className="min-h-[100px]"
                          />
                          <Button 
                            size="sm" 
                            className="mt-2"
                            onClick={saveNotes}
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Save Notes
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground py-8">
                        <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Select a message to view details</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Analytics Dashboard
                  </CardTitle>
                  <CardDescription>
                    View detailed analytics and insights
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-muted-foreground py-12">
                    <Activity className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">Analytics Coming Soon</p>
                    <p>Detailed analytics and reporting features will be available here.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    User Management
                  </CardTitle>
                  <CardDescription>
                    Manage user accounts and permissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-muted-foreground py-12">
                    <Shield className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">User Management Coming Soon</p>
                    <p>User account management features will be available here.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    System Settings
                  </CardTitle>
                  <CardDescription>
                    Configure system preferences and settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-muted-foreground py-12">
                    <Settings className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">Settings Coming Soon</p>
                    <p>System configuration options will be available here.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  );
};

export default Admin;