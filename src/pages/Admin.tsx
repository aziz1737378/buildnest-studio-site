import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
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
  Download
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
    today: 0
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
      const todayMessages = data?.filter(msg => 
        new Date(msg.created_at).toDateString() === today
      ) || [];
      const unreadMessages = data?.filter(msg => msg.status === 'new') || [];

      setStats({
        total: data?.length || 0,
        unread: unreadMessages.length,
        today: todayMessages.length
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading admin panel...</p>
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
      <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Buildnest Admin</h1>
            <p className="text-muted-foreground">Manage contact messages</p>
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={exportMessages} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button onClick={handleSignOut} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MessageSquare className="w-8 h-8 text-primary mr-3" />
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-muted-foreground">Total Messages</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Mail className="w-8 h-8 text-destructive mr-3" />
                <div>
                  <p className="text-2xl font-bold">{stats.unread}</p>
                  <p className="text-muted-foreground">Unread Messages</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-green-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold">{stats.today}</p>
                  <p className="text-muted-foreground">Today's Messages</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Messages List */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Messages</CardTitle>
              <CardDescription>
                Click on a message to view details and manage it
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedMessage?.id === message.id
                        ? 'border-primary bg-primary/5'
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => {
                      setSelectedMessage(message);
                      setAdminNotes(message.admin_notes || "");
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <UserIcon className="w-4 h-4" />
                        <span className="font-medium">{message.name}</span>
                        <Badge variant={message.status === 'new' ? 'destructive' : 'secondary'}>
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
                        <Building className="w-3 h-3" />
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
              <CardTitle>
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
                        <Eye className="w-4 h-4 mr-2" />
                        Mark as Read
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-4 h-4 mr-2" />
                        Mark as Unread
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {selectedMessage ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Contact Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Name:</strong> {selectedMessage.name}</p>
                      <p><strong>Email:</strong> {selectedMessage.email}</p>
                      {selectedMessage.business && (
                        <p><strong>Business:</strong> {selectedMessage.business}</p>
                      )}
                      <p><strong>Date:</strong> {new Date(selectedMessage.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Message</h4>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm whitespace-pre-wrap">{selectedMessage.message}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Admin Notes</h4>
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
                      <Save className="w-4 h-4 mr-2" />
                      Save Notes
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select a message from the list to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </>
  );
};

export default Admin;