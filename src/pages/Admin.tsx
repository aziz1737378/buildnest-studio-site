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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/30">
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
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header */}
      <div className="border-b bg-card/90 backdrop-blur-sm sticky top-0 z-10 animate-fade-in">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Buildnest Admin
            </h1>
            <p className="text-muted-foreground">Manage contact messages</p>
          </div>
          <div className="flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <Button 
              onClick={exportMessages} 
              variant="outline" 
              size="sm"
              className="hover-glow hover:scale-105 transition-all duration-300"
            >
              <Download className="w-4 h-4 mr-2 animate-bounce-subtle" />
              Export CSV
            </Button>
            <Button 
              onClick={handleSignOut} 
              variant="outline" 
              size="sm"
              className="hover:bg-destructive hover:text-destructive-foreground hover:scale-105 transition-all duration-300"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <ScrollAnimatedDiv className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" triggerOnce>
          <Card className="group hover-glow hover:scale-105 hover:-translate-y-2 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MessageSquare className="w-8 h-8 text-primary mr-3 group-hover:animate-pulse-scale transition-all duration-300" />
                <div>
                  <p className="text-2xl font-bold animate-number-count">{stats.total}</p>
                  <p className="text-muted-foreground">Total Messages</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="group hover-glow hover:scale-105 hover:-translate-y-2 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Mail className="w-8 h-8 text-destructive mr-3 group-hover:animate-wiggle transition-all duration-300" />
                <div>
                  <p className="text-2xl font-bold animate-number-count">{stats.unread}</p>
                  <p className="text-muted-foreground">Unread Messages</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="group hover-glow hover:scale-105 hover:-translate-y-2 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-green-500 mr-3 group-hover:animate-bounce transition-all duration-300" />
                <div>
                  <p className="text-2xl font-bold animate-number-count">{stats.today}</p>
                  <p className="text-muted-foreground">Today's Messages</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollAnimatedDiv>

        <ScrollAnimatedDiv className="grid grid-cols-1 lg:grid-cols-2 gap-8" triggerOnce>
          {/* Messages List */}
          <Card className="animate-fade-in-up hover-glow transition-all duration-300" style={{ animationDelay: '400ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 animate-bounce-subtle" />
                Contact Messages
              </CardTitle>
              <CardDescription>
                Click on a message to view details and manage it
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 hover:scale-[1.02] animate-fade-in-up ${
                      selectedMessage?.id === message.id
                        ? 'border-primary bg-primary/10 shadow-lg glow-border'
                        : 'hover:bg-muted/50 hover:shadow-md hover:border-primary/30'
                    }`}
                    style={{ animationDelay: `${500 + index * 50}ms` }}
                    onClick={() => {
                      setSelectedMessage(message);
                      setAdminNotes(message.admin_notes || "");
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <UserIcon className="w-4 h-4 animate-pulse-subtle" />
                        <span className="font-medium">{message.name}</span>
                        <Badge 
                          variant={message.status === 'new' ? 'destructive' : 'secondary'}
                          className={message.status === 'new' ? 'animate-pulse-scale' : ''}
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
                        <Building className="w-3 h-3 animate-float" />
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
          <Card className="animate-fade-in-up hover-glow transition-all duration-300" style={{ animationDelay: '500ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 animate-pulse-subtle" />
                {selectedMessage ? 'Message Details' : 'Select a Message'}
              </CardTitle>
              {selectedMessage && (
                <div className="flex gap-2 animate-fade-in">
                  <Button
                    size="sm"
                    variant="outline"
                    className="hover:scale-105 transition-all duration-300 hover-glow"
                    onClick={() => markAsRead(selectedMessage.id, selectedMessage.status === 'new')}
                  >
                    {selectedMessage.status === 'new' ? (
                      <>
                        <Eye className="w-4 h-4 mr-2 animate-bounce-subtle" />
                        Mark as Read
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-4 h-4 mr-2 animate-wiggle" />
                        Mark as Unread
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {selectedMessage ? (
                <div className="space-y-4 animate-fade-in-up">
                  <div className="animate-slide-in-left" style={{ animationDelay: '100ms' }}>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <UserIcon className="w-4 h-4 animate-float" />
                      Contact Information
                    </h4>
                    <div className="space-y-2 text-sm p-3 bg-muted/50 rounded-lg border">
                      <p className="animate-fade-in"><strong>Name:</strong> {selectedMessage.name}</p>
                      <p className="animate-fade-in" style={{ animationDelay: '50ms' }}><strong>Email:</strong> {selectedMessage.email}</p>
                      {selectedMessage.business && (
                        <p className="animate-fade-in" style={{ animationDelay: '100ms' }}><strong>Business:</strong> {selectedMessage.business}</p>
                      )}
                      <p className="animate-fade-in" style={{ animationDelay: '150ms' }}><strong>Date:</strong> {new Date(selectedMessage.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="animate-slide-in-right" style={{ animationDelay: '200ms' }}>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 animate-bounce-subtle" />
                      Message
                    </h4>
                    <div className="p-3 bg-muted rounded-lg border hover:shadow-md transition-all duration-300">
                      <p className="text-sm whitespace-pre-wrap">{selectedMessage.message}</p>
                    </div>
                  </div>

                  <div className="animate-slide-in-left" style={{ animationDelay: '300ms' }}>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Save className="w-4 h-4 animate-pulse-subtle" />
                      Admin Notes
                    </h4>
                    <Textarea
                      placeholder="Add your notes about this message..."
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      className="min-h-[100px] transition-all duration-300 focus:scale-[1.02] hover:shadow-md"
                    />
                    <Button 
                      size="sm" 
                      className="mt-2 hover:scale-105 hover-glow transition-all duration-300"
                      onClick={saveNotes}
                    >
                      <Save className="w-4 h-4 mr-2 animate-bounce-subtle" />
                      Save Notes
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8 animate-fade-in">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50 animate-float" />
                  <p className="animate-pulse-subtle">Select a message from the list to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </ScrollAnimatedDiv>
      </div>
      </div>
    </>
  );
};

export default Admin;