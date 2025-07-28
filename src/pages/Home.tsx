import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Code, Smartphone, Zap, Star, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import heroBackground from "@/assets/hero-bg.jpg";
import { ScrollAnimatedDiv } from "@/hooks/useScrollAnimation";
import { useEffect, useState } from "react";

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <Helmet>
        <title>Buildnest Web & App Development Agency</title>
        <meta name="description" content="Buildnest is a premium digital studio in Italy offering fast, elegant websites and apps for real businesses, restaurants, creators, and entrepreneurs." />
        <link rel="canonical" href="https://buildnest.it/" />
      </Helmet>
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-background/80"></div>
          {/* Parallax particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-primary/20 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
          {/* Mouse follower gradient */}
          <div
            className="absolute w-96 h-96 bg-gradient-radial from-primary/10 to-transparent rounded-full pointer-events-none transition-all duration-300"
            style={{
              left: mousePosition.x - 192,
              top: mousePosition.y - 192,
              transform: 'translate(0, 0)'
            }}
          />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center container-padding">
          <div className="fade-in-scale">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-gradient animate-pulse-glow">Buildnest</span>
            </h1>
            <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Smart websites & apps — built for real businesses.
              </p>
            </div>
            <div className="fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button variant="premium" size="lg" asChild className="group hover-glow btn-shine">
                  <Link to="/contact" className="flex items-center">
                    Start Your Project
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="hover-lift ripple">
                  <Link to="/portfolio">View Our Work</Link>
                </Button>
              </div>
            </div>
            <div className="fade-in-up" style={{ animationDelay: '0.6s' }}>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                We design and build premium websites and digital tools for modern entrepreneurs, 
                startups, and businesses.
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced floating elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-accent/20 rounded-full animate-float pulse-glow"></div>
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-tech-blue/10 rounded-full animate-floatSlow glow-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-primary/10 rounded-full animate-wiggle" style={{ animationDelay: "2s" }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-secondary/20 rounded-full animate-float" style={{ animationDelay: "1.5s" }}></div>
      </section>

      {/* About Section */}
      <ScrollAnimatedDiv animation="scroll-fade-in">
        <section className="section-spacing bg-muted/30">
          <div className="max-w-6xl mx-auto container-padding">
            <ScrollAnimatedDiv animation="scroll-slide-up" className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">What is Buildnest?</h2>
              <div className="max-w-4xl mx-auto space-y-6 text-lg text-muted-foreground">
                <p>
                  Buildnest is a modern digital studio based in Italy. We create fast, elegant, 
                  and effective websites and apps for local businesses, creators, and entrepreneurs.
                </p>
                <p>
                  We're fast. We're flexible. And we focus on the result — not the tech.
                </p>
                <p className="text-xl font-medium text-foreground">
                  Every project is fully customized, and built with care.
                </p>
                <p className="text-muted-foreground">
                  Based in Italy, serving clients worldwide with cutting-edge digital solutions.
                </p>
              </div>
            </ScrollAnimatedDiv>

            {/* Enhanced Stats with counters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <ScrollAnimatedDiv 
                animation="scroll-slide-left" 
                className="group hover-lift"
                triggerOnce={true}
              >
                <div className="text-center p-6 rounded-xl bg-card border hover:border-accent/50 transition-all duration-300">
                  <div className="text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">50+</div>
                  <div className="text-muted-foreground">Projects Delivered</div>
                  <Star className="w-6 h-6 text-accent mx-auto mt-2 group-hover:rotate-12 transition-transform" />
                </div>
              </ScrollAnimatedDiv>
              
              <ScrollAnimatedDiv 
                animation="scroll-fade-in" 
                className="group hover-lift"
                triggerOnce={true}
              >
                <div className="text-center p-6 rounded-xl bg-card border hover:border-accent/50 transition-all duration-300" style={{ animationDelay: '0.2s' }}>
                  <div className="text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">2-3</div>
                  <div className="text-muted-foreground">Week Delivery</div>
                  <Zap className="w-6 h-6 text-accent mx-auto mt-2 group-hover:rotate-12 transition-transform" />
                </div>
              </ScrollAnimatedDiv>
              
              <ScrollAnimatedDiv 
                animation="scroll-slide-right" 
                className="group hover-lift"
                triggerOnce={true}
              >
                <div className="text-center p-6 rounded-xl bg-card border hover:border-accent/50 transition-all duration-300" style={{ animationDelay: '0.4s' }}>
                  <div className="text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">100%</div>
                  <div className="text-muted-foreground">Client Satisfaction</div>
                  <Award className="w-6 h-6 text-accent mx-auto mt-2 group-hover:rotate-12 transition-transform" />
                </div>
              </ScrollAnimatedDiv>
            </div>
          </div>
        </section>
      </ScrollAnimatedDiv>

      {/* Features Preview */}
      <ScrollAnimatedDiv animation="scroll-fade-in">
        <section className="section-spacing">
          <div className="max-w-6xl mx-auto container-padding">
            <ScrollAnimatedDiv animation="scroll-slide-up" className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Buildnest?</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Why choose our development approach for your next project.
              </p>
            </ScrollAnimatedDiv>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ScrollAnimatedDiv 
                animation="scroll-scale" 
                className="group"
                triggerOnce={true}
              >
                <div className="p-6 rounded-xl hover-glow hover:shadow-xl transition-all duration-500 group bg-card border hover:border-primary/20 hover:-translate-y-2">
                  <div className="mb-4 relative">
                    <div className="absolute inset-0 bg-primary/10 rounded-full w-16 h-16 animate-pulse-scale"></div>
                    <Zap className="h-12 w-12 text-primary group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 relative z-10" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">Lightning Fast</h3>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors">Websites that load in under 3 seconds and provide seamless user experience.</p>
                  <div className="mt-4 w-full h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full animate-morphWidth group-hover:animate-shimmer"></div>
                  </div>
                </div>
              </ScrollAnimatedDiv>
              
              <ScrollAnimatedDiv 
                animation="scroll-scale" 
                className="group"
                triggerOnce={true}
              >
                <div className="p-6 rounded-xl hover-glow hover:shadow-xl transition-all duration-500 group bg-card border hover:border-primary/20 hover:-translate-y-2" style={{ animationDelay: '0.2s' }}>
                  <div className="mb-4 relative">
                    <div className="absolute inset-0 bg-primary/10 rounded-full w-16 h-16 animate-pulse-scale" style={{ animationDelay: '0.5s' }}></div>
                    <Code className="h-12 w-12 text-primary group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 relative z-10" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">Premium Design</h3>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors">Beautiful, modern designs that make your business stand out from the competition.</p>
                  <div className="mt-4 w-full h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full animate-morphWidth group-hover:animate-shimmer" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </ScrollAnimatedDiv>
              
              <ScrollAnimatedDiv 
                animation="scroll-scale" 
                className="group"
                triggerOnce={true}
              >
                <div className="p-6 rounded-xl hover-glow hover:shadow-xl transition-all duration-500 group bg-card border hover:border-primary/20 hover:-translate-y-2" style={{ animationDelay: '0.4s' }}>
                  <div className="mb-4 relative">
                    <div className="absolute inset-0 bg-primary/10 rounded-full w-16 h-16 animate-pulse-scale" style={{ animationDelay: '1s' }}></div>
                    <Smartphone className="h-12 w-12 text-primary group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 relative z-10" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">Mobile First</h3>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors">Fully responsive designs that work perfectly on all devices and screen sizes.</p>
                  <div className="mt-4 w-full h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full animate-morphWidth group-hover:animate-shimmer" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </ScrollAnimatedDiv>
            </div>

            <ScrollAnimatedDiv animation="scroll-fade-in" className="text-center mt-12" triggerOnce={true}>
              <Button variant="premium" size="lg" asChild className="group hover-glow btn-shine pulse-scale">
                <Link to="/services" className="flex items-center">
                  Explore Our Services
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
                </Link>
              </Button>
            </ScrollAnimatedDiv>

            {/* Additional animated elements */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full animate-floatSlow opacity-50"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-r from-tech-blue/20 to-accent/20 rounded-full animate-float opacity-50" style={{ animationDelay: '1s' }}></div>
          </div>
        </section>
      </ScrollAnimatedDiv>
      </div>
    </>
  );
};

export default Home;