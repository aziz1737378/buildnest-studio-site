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
              <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-background via-background to-primary/5 backdrop-blur-sm transition-all duration-700 ease-out hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-4 hover:scale-[1.03] animate-fade-in">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200" />
                <CardContent className="p-8 relative z-10">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-primary/30 rounded-2xl blur-xl scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 ease-out" />
                    <div className="relative w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ease-out shadow-lg shadow-primary/10">
                      <Zap className="h-8 w-8 text-primary group-hover:scale-125 group-hover:drop-shadow-lg transition-all duration-400 ease-out" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-all duration-500 ease-out">Lightning Fast</h3>
                  <p className="text-muted-foreground mb-6 group-hover:text-foreground/90 transition-all duration-500 ease-out leading-relaxed">
                    Websites that load in under 3 seconds and provide seamless user experience.
                  </p>
                  <div className="w-full bg-muted/50 rounded-full h-3 mb-3 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse" />
                    <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 h-3 rounded-full transition-all duration-1000 ease-out animate-progress group-hover:shadow-lg group-hover:shadow-primary/40" style={{ width: '95%' }} />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-all duration-500">Performance: 95%</span>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-background via-background to-tech-blue/5 backdrop-blur-sm transition-all duration-700 ease-out hover:shadow-2xl hover:shadow-tech-blue/20 hover:-translate-y-4 hover:scale-[1.03] animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-tech-blue/10 via-transparent to-tech-blue/5 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-tech-blue/5 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200" />
                <CardContent className="p-8 relative z-10">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-tech-blue/30 rounded-2xl blur-xl scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 ease-out" />
                    <div className="relative w-16 h-16 bg-gradient-to-br from-tech-blue/20 to-tech-blue/10 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ease-out shadow-lg shadow-tech-blue/10">
                      <Code className="h-8 w-8 text-tech-blue group-hover:scale-125 group-hover:drop-shadow-lg transition-all duration-400 ease-out" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-tech-blue transition-all duration-500 ease-out">Premium Design</h3>
                  <p className="text-muted-foreground mb-6 group-hover:text-foreground/90 transition-all duration-500 ease-out leading-relaxed">
                    Beautiful, modern designs that make your business stand out from the competition.
                  </p>
                  <div className="w-full bg-muted/50 rounded-full h-3 mb-3 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-tech-blue/20 to-transparent animate-pulse" />
                    <div className="bg-gradient-to-r from-tech-blue via-tech-blue/90 to-tech-blue/80 h-3 rounded-full transition-all duration-1000 ease-out animate-progress group-hover:shadow-lg group-hover:shadow-tech-blue/40" style={{ width: '100%', animationDelay: '0.4s' }} />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-tech-blue transition-all duration-500">Design Quality: 100%</span>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-background via-background to-accent/5 backdrop-blur-sm transition-all duration-700 ease-out hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-4 hover:scale-[1.03] animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200" />
                <CardContent className="p-8 relative z-10">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-accent/30 rounded-2xl blur-xl scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 ease-out" />
                    <div className="relative w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ease-out shadow-lg shadow-accent/10">
                      <Smartphone className="h-8 w-8 text-accent group-hover:scale-125 group-hover:drop-shadow-lg transition-all duration-400 ease-out" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-all duration-500 ease-out">Mobile First</h3>
                  <p className="text-muted-foreground mb-6 group-hover:text-foreground/90 transition-all duration-500 ease-out leading-relaxed">
                    Fully responsive designs that work perfectly on all devices and screen sizes.
                  </p>
                  <div className="w-full bg-muted/50 rounded-full h-3 mb-3 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent animate-pulse" />
                    <div className="bg-gradient-to-r from-accent via-accent/90 to-accent/80 h-3 rounded-full transition-all duration-1000 ease-out animate-progress group-hover:shadow-lg group-hover:shadow-accent/40" style={{ width: '98%', animationDelay: '0.6s' }} />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-accent transition-all duration-500">Mobile Optimization: 98%</span>
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
