import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Smartphone, Zap, Star, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollAnimatedDiv, StaggeredContainer } from "@/hooks/useScrollAnimation";
import { SEOProvider } from "@/components/SEO/SEOProvider";
import heroBackground from "@/assets/hero-bg.jpg";

const Index = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <SEOProvider
        title="Buildnest - Premium Web & App Development Agency"
        description="Transform your ideas into stunning digital experiences. Professional web development, mobile apps, and digital solutions. Based in Italy, serving clients worldwide."
        keywords="web development, app development, digital agency, website design, mobile apps, Tricase Italy"
        type="website"
      />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-background/95" />
        
        {/* Mouse-following gradient */}
        <div 
          className="absolute w-96 h-96 rounded-full opacity-20 pointer-events-none transition-all duration-1000 ease-out"
          style={{
            background: `radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)`,
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />

        {/* Animated particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-primary/30 rounded-full animate-float opacity-60`}
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
          />
        ))}

        {/* Main Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
          <div 
            className={`transition-all duration-1000 ease-out ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-primary via-tech-blue to-primary bg-clip-text text-transparent animate-shimmer">
                Buildnest
              </span>
            </h1>
          </div>
          
          <div 
            className={`transition-all duration-1000 ease-out delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your ideas into stunning digital experiences with our premium development services
            </p>
          </div>

          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 ease-out delay-400 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Button variant="premium" size="lg" className="hover:scale-105 transition-transform duration-300" asChild>
              <Link to="/contact">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="hover:scale-105 transition-transform duration-300" asChild>
              <Link to="/portfolio">View Our Work</Link>
            </Button>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 border border-primary/20 rounded-lg rotate-12 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 right-16 w-16 h-16 bg-tech-blue/10 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-8 w-12 h-12 border-2 border-accent/30 rotate-45 animate-bounce" style={{ animationDelay: '3s' }} />
      </section>

      {/* About Section */}
      <section className="section-spacing bg-muted/30">
        <div className="max-w-6xl mx-auto container-padding">
          <ScrollAnimatedDiv className="text-center mb-16" animation="fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">About Buildnest</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're a passionate team of developers and designers creating digital solutions that drive business growth and user engagement.
            </p>
          </ScrollAnimatedDiv>

          <StaggeredContainer delay={150}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <Card className="text-center hover-lift group">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl font-bold text-primary">50+</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Projects Delivered</h3>
                  <p className="text-muted-foreground">Successfully completed projects across various industries</p>
                </CardContent>
              </Card>

              <Card className="text-center hover-lift group">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-tech-blue/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl font-bold text-tech-blue">7</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Days Avg. Delivery</h3>
                  <p className="text-muted-foreground">Fast turnaround without compromising quality</p>
                </CardContent>
              </Card>

              <Card className="text-center hover-lift group">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl font-bold text-accent">100%</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Client Satisfaction</h3>
                  <p className="text-muted-foreground">Every client becomes our success story</p>
                </CardContent>
              </Card>
            </div>
          </StaggeredContainer>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-spacing relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-20 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-0 w-40 h-40 bg-tech-blue/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="max-w-6xl mx-auto container-padding relative z-10">
          <ScrollAnimatedDiv className="text-center mb-16" animation="fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose Buildnest?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We combine cutting-edge technology with creative design to deliver exceptional digital experiences.
            </p>
          </ScrollAnimatedDiv>

          <StaggeredContainer delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <Card className="hover-lift group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="p-8 relative z-10">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Lightning Fast</h3>
                  <p className="text-muted-foreground mb-6">
                    Optimized for speed and performance, ensuring your users have the best experience possible.
                  </p>
                  <div className="w-full bg-muted rounded-full h-2 mb-2">
                    <div className="bg-primary h-2 rounded-full animate-progress" style={{ width: '95%' }} />
                  </div>
                  <span className="text-sm font-medium">Performance Score: 95%</span>
                </CardContent>
              </Card>

              <Card className="hover-lift group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-tech-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="p-8 relative z-10">
                  <div className="w-16 h-16 bg-tech-blue/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Code className="h-8 w-8 text-tech-blue" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Premium Design</h3>
                  <p className="text-muted-foreground mb-6">
                    Beautiful, modern designs that capture your brand essence and engage your audience.
                  </p>
                  <div className="w-full bg-muted rounded-full h-2 mb-2">
                    <div className="bg-tech-blue h-2 rounded-full animate-progress" style={{ width: '100%', animationDelay: '0.5s' }} />
                  </div>
                  <span className="text-sm font-medium">Design Quality: 100%</span>
                </CardContent>
              </Card>

              <Card className="hover-lift group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="p-8 relative z-10">
                  <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Smartphone className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Mobile First</h3>
                  <p className="text-muted-foreground mb-6">
                    Responsive designs that work perfectly on all devices, from mobile to desktop.
                  </p>
                  <div className="w-full bg-muted rounded-full h-2 mb-2">
                    <div className="bg-accent h-2 rounded-full animate-progress" style={{ width: '98%', animationDelay: '1s' }} />
                  </div>
                  <span className="text-sm font-medium">Mobile Optimization: 98%</span>
                </CardContent>
              </Card>
            </div>
          </StaggeredContainer>

          <ScrollAnimatedDiv className="text-center" animation="scale-in">
            <Button variant="accent" size="lg" className="hover:scale-105 transition-transform duration-300" asChild>
              <Link to="/services">
                Explore Our Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </ScrollAnimatedDiv>
        </div>
      </section>
    </>
  );
};

export default Index;
