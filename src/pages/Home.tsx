import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Palette, Smartphone, Star, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import heroBg from "@/assets/hero-bg.jpg";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Buildnest Web & App Development Agency</title>
        <meta name="description" content="Buildnest is a premium digital studio in Italy offering fast, elegant websites and apps for real businesses, restaurants, creators, and entrepreneurs." />
        <meta property="og:title" content="Buildnest Web & App Development Agency" />
        <meta property="og:description" content="Premium digital studio creating modern websites and digital tools for businesses worldwide." />
        <link rel="canonical" href="https://buildnest.it/" />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section 
          className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          
          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float"></div>
            <div className="absolute top-40 right-20 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-float-delayed"></div>
            <div className="absolute bottom-40 left-20 w-16 h-16 bg-tech-blue/20 rounded-full blur-xl animate-float"></div>
          </div>

          <div className="relative z-10 text-center text-white container-padding max-w-4xl mx-auto">
            <div className="fade-in">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 hero-gradient">
                Buildnest
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Smart websites & apps for real businesses
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="premium" size="lg" asChild>
                  <Link to="/contact" className="flex items-center">
                    Start Your Project
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="border-white/30 text-white hover:bg-white/10">
                  <Link to="/portfolio">View Our Work</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="section-spacing bg-background">
          <div className="max-w-6xl mx-auto container-padding">
            <div className="text-center mb-16 fade-in">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Digital studio crafting premium experiences
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Based in Italy, serving businesses worldwide. We build fast, elegant websites 
                and custom applications that help your business grow.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                { icon: Users, number: "50+", label: "Projects Delivered", description: "Happy clients worldwide" },
                { icon: Clock, number: "1-2", label: "Week Delivery", description: "Fast turnaround time" },
                { icon: Star, number: "100%", label: "Client Satisfaction", description: "5-star reviews" }
              ].map((stat, index) => (
                <Card key={index} className="text-center hover-glow slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-8">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-3xl font-bold mb-2">{stat.number}</div>
                    <div className="font-semibold mb-1">{stat.label}</div>
                    <div className="text-sm text-muted-foreground">{stat.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Preview */}
        <section className="section-spacing bg-muted/30">
          <div className="max-w-6xl mx-auto container-padding">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Choose Buildnest?</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We combine technical expertise with creative design to deliver 
                solutions that make a real difference for your business.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  description: "Optimized for speed and performance. Your users will love the experience.",
                  color: "bg-primary"
                },
                {
                  icon: Palette,
                  title: "Premium Design",
                  description: "Beautiful, modern designs that reflect your brand and engage your audience.",
                  color: "bg-accent"
                },
                {
                  icon: Smartphone,
                  title: "Mobile First",
                  description: "Perfect on every device. Responsive design that works everywhere.",
                  color: "bg-tech-blue"
                }
              ].map((feature, index) => (
                <Card key={index} className="text-center hover-glow slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                  <CardHeader>
                    <div className={`w-16 h-16 ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="premium" size="lg" asChild>
                <Link to="/services" className="flex items-center">
                  Explore Our Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;