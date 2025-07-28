import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Mail, Phone, Instagram, Send, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            business: formData.business || null,
            message: formData.message
          }
        ]);

      if (error) {
        throw error;
      }

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", business: "", message: "" });
    } catch (error: any) {
      toast({
        title: "Error sending message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Buildnest</title>
        <meta name="description" content="Ready to bring your vision to life? Get in touch and let's start building something amazing together. We'll respond within 24 hours." />
        <meta property="og:title" content="Contact Us | Buildnest" />
        <meta property="og:description" content="Get in touch with Buildnest for your next web or app development project." />
        <link rel="canonical" href="https://buildnest.it/contact" />
      </Helmet>

      <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="section-spacing">
        <div className="max-w-6xl mx-auto container-padding text-center">
          <div className="fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Let's build your project.</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Ready to bring your vision to life? Get in touch and let's start building 
              something amazing together. We'll respond within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="hover-glow slide-up">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a message</CardTitle>
                <CardDescription>
                  Tell us about your project and we'll get back to you with a detailed proposal.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="business">Business / Idea</Label>
                    <Input
                      id="business"
                      name="business"
                      value={formData.business}
                      onChange={handleChange}
                      placeholder="Tell us about your business or project idea"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Describe your project, goals, and any specific requirements..."
                      className="min-h-[120px]"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="premium" 
                    size="lg" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    <Send className="mr-2 h-5 w-5" />
                    {isSubmitting ? "Sending..." : "Send Request"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8 slide-up" style={{ animationDelay: "0.2s" }}>
              <Card className="hover-glow">
                <CardHeader>
                  <CardTitle className="text-xl">Get in Touch</CardTitle>
                  <CardDescription>
                    Multiple ways to reach us. Choose what works best for you.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <a 
                        href="mailto:azizxdev175@gmail.com" 
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        azizxdev175@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">WhatsApp</h4>
                      <a 
                        href="https://wa.me/393792649756" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        +39 379 264 9756
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Instagram className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Instagram</h4>
                      <a 
                        href="https://instagram.com/buildnest_development" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        @buildnest_development
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Location</h4>
                      <p className="text-muted-foreground">
                        Based in Italy<br />
                        Serving clients worldwide
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Response Time */}
              <Card className="bg-gradient-to-r from-primary to-tech-blue text-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Quick Response Time</h3>
                  <p className="opacity-90 mb-4">
                    We typically respond to all inquiries within 24 hours. 
                    For urgent projects, feel free to reach out via WhatsApp.
                  </p>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      Available Mon-Fri
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                      Quick WhatsApp replies
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Testimonial */}
          <div className="mt-16 text-center">
            <Card className="max-w-3xl mx-auto hover-glow">
              <CardContent className="p-8">
                <div className="text-4xl mb-4">🔥</div>
                <blockquote className="text-lg italic mb-4">
                  "Buildnest delivered our restaurant website fast and exactly how we wanted it. 
                  The design is 🔥 and it works great on mobile."
                </blockquote>
                <footer className="text-muted-foreground">
                  — Owner, Clandestino 13
                </footer>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Contact;