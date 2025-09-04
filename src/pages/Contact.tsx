import { useState, useEffect } from "react";
import { Mail, Phone, Instagram, Send, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";
import { SEOProvider } from "@/components/SEO/SEOProvider";
import { BreadcrumbNavigation } from "@/components/SEO/BreadcrumbNavigation";
import { supabase } from "@/integrations/supabase/client";
import { ScrollAnimatedDiv, StaggeredContainer } from "@/hooks/useScrollAnimation";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    console.log("🚀 Form submission started", { formData });
    
    try {
      // Send to Discord webhook first
      console.log("📨 Calling Discord webhook...");
      const { data: discordData, error: discordError } = await supabase.functions.invoke('discord-webhook', {
        body: {
          name: formData.name,
          email: formData.email,
          business: formData.business || null,
          message: formData.message
        }
      });

      console.log("📨 Discord webhook response:", { discordData, discordError });

      if (discordError) {
        console.error('❌ Discord webhook error:', discordError);
        // Continue with database insert even if Discord fails
      } else {
        console.log("✅ Discord webhook succeeded");
      }

      // Save to database as backup
      console.log("💾 Saving to database...");
      const { error: dbError } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            business: formData.business || null,
            message: formData.message
          }
        ]);

      console.log("💾 Database response:", { dbError });

      if (dbError) {
        console.error('❌ Database error:', dbError);
        // If Discord succeeded but DB failed, still show success
        if (!discordError && discordData?.success) {
          toast({
            title: "Message sent successfully!",
            description: "We'll get back to you within 24 hours.",
          });
          setFormData({ name: "", email: "", business: "", message: "" });
          return;
        }
        throw dbError;
      }

      console.log("✅ Form submission completed successfully");
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", business: "", message: "" });
    } catch (error: any) {
      console.error("❌ Form submission error:", error);
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
      <SEOProvider
        title={t('contact.title')}
        description={t('contact.description')}
        keywords="contact web developer, free consultation, project quote, Tricase web development, Italy web agency, WhatsApp contact, quick response, development consultation"
        type="website"
        section="Contact"
      />
      <BreadcrumbNavigation />
      <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="section-spacing relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-20 left-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-tech-blue/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="max-w-6xl mx-auto container-padding text-center relative z-10">
          <div className={`transition-all duration-1200 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-tech-blue to-primary bg-clip-text text-transparent">
              {t('contact.seo.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ScrollAnimatedDiv animation="slide-in-left" delay={200}>
              <Card className="hover-lift group border-2 hover:border-primary/20 transition-all duration-500">
              <CardHeader>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">Send us a message</CardTitle>
                <CardDescription className="group-hover:text-foreground transition-colors duration-300">
                  Tell us about your project and we'll get back to you with a detailed proposal.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2 fade-in" style={{ animationDelay: '0.7s' }}>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="transition-all duration-300 focus:scale-105"
                    />
                  </div>

                  <div className="space-y-2 fade-in" style={{ animationDelay: '0.9s' }}>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="transition-all duration-300 focus:scale-105"
                    />
                  </div>

                  <div className="space-y-2 fade-in" style={{ animationDelay: '1.1s' }}>
                    <Label htmlFor="business">Business / Idea</Label>
                    <Input
                      id="business"
                      name="business"
                      value={formData.business}
                      onChange={handleChange}
                      placeholder="Tell us about your business or project idea"
                      className="transition-all duration-300 focus:scale-105"
                    />
                  </div>

                  <div className="space-y-2 fade-in" style={{ animationDelay: '1.3s' }}>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Describe your project, goals, and any specific requirements..."
                      className="min-h-[120px] transition-all duration-300 focus:scale-105"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="premium" 
                    size="lg" 
                    className="w-full bounce-in hover:scale-105 transition-transform duration-300" 
                    disabled={isSubmitting}
                    style={{ animationDelay: '1.5s' }}
                  >
                    <Send className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    {isSubmitting ? "Sending..." : "Send Request"}
                  </Button>
                </form>
              </CardContent>
            </Card>
            </ScrollAnimatedDiv>

            {/* Contact Information */}
            <ScrollAnimatedDiv animation="slide-in-right" delay={400}>
              <div className="space-y-8">
              <Card className="hover-lift group">
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">Get in Touch</CardTitle>
                  <CardDescription className="group-hover:text-foreground transition-colors duration-300">
                    Multiple ways to reach us. Choose what works best for you.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4 fade-in hover:translate-x-2 transition-transform duration-300" style={{ animationDelay: '0.9s' }}>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 hover:scale-110 hover:bg-primary/20 transition-all duration-300">
                      <Mail className="h-6 w-6 text-primary transition-transform duration-300 hover:scale-110" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                       <a 
                        href="mailto:info@buildnest.it" 
                        className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:underline"
                      >
                        info@buildnest.it
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 fade-in hover:translate-x-2 transition-transform duration-300" style={{ animationDelay: '1.1s' }}>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 hover:scale-110 hover:bg-primary/20 transition-all duration-300">
                      <Phone className="h-6 w-6 text-primary transition-transform duration-300 hover:scale-110" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">WhatsApp</h4>
                      <a 
                        href="https://wa.me/393792649756" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:underline"
                      >
                        +39 379 264 9756
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 fade-in hover:translate-x-2 transition-transform duration-300" style={{ animationDelay: '1.3s' }}>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 hover:scale-110 hover:bg-primary/20 transition-all duration-300">
                      <Instagram className="h-6 w-6 text-primary transition-transform duration-300 hover:scale-110" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Instagram</h4>
                      <a 
                        href="https://instagram.com/buildnest_development" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:underline"
                      >
                        @buildnest_development
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 fade-in hover:translate-x-2 transition-transform duration-300" style={{ animationDelay: '1.5s' }}>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 hover:scale-110 hover:bg-primary/20 transition-all duration-300">
                      <MapPin className="h-6 w-6 text-primary transition-transform duration-300 hover:scale-110" />
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
              <Card className="bg-gradient-to-r from-primary to-tech-blue text-white hover:scale-105 transition-transform duration-300 pulse-glow" style={{ animationDelay: '1.7s' }}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2 bounce-in" style={{ animationDelay: '1.9s' }}>Quick Response Time</h3>
                  <p className="opacity-90 mb-4 fade-in" style={{ animationDelay: '2.1s' }}>
                    We typically respond to all inquiries within 24 hours. 
                    For urgent projects, feel free to reach out via WhatsApp.
                  </p>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center slide-in-left" style={{ animationDelay: '2.3s' }}>
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      Available Mon-Fri
                    </div>
                    <div className="flex items-center slide-in-right" style={{ animationDelay: '2.5s' }}>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                      Quick WhatsApp replies
                    </div>
                  </div>
                </CardContent>
              </Card>
              </div>
            </ScrollAnimatedDiv>
          </div>

          {/* Testimonial */}
          <div className="mt-16 text-center">
            <Card className="max-w-3xl mx-auto hover-lift bounce-in group" style={{ animationDelay: '2.7s' }}>
              <CardContent className="p-8">
                <div className="text-4xl mb-4 scale-in group-hover:animate-bounce" style={{ animationDelay: '2.9s' }}>🔥</div>
                <blockquote className="text-lg italic mb-4 fade-in group-hover:text-primary transition-colors duration-300" style={{ animationDelay: '3.1s' }}>
                  "Buildnest delivered our restaurant website fast and exactly how we wanted it. 
                  The design is 🔥 and it works great on mobile."
                </blockquote>
                <footer className="text-muted-foreground group-hover:text-foreground transition-colors duration-300 slide-up" style={{ animationDelay: '3.3s' }}>
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