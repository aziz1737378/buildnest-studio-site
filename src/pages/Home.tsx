import { Link } from "react-router-dom";
import { ArrowRight, Star, Rocket, Sparkles, Code, Smartphone, Zap, Users, Trophy, Heart, Palette, Globe, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import heroBackground from "@/assets/hero-bg.jpg";
import { ScrollAnimatedDiv } from "@/hooks/useScrollAnimation";
import { AnimatedCounter } from "@/components/v2/AnimatedCounter";
import { ParticleBackground } from "@/components/v2/ParticleBackground";
import { GlassCard } from "@/components/v2/GlassCard";
import { FloatingElements } from "@/components/v2/FloatingElements";
import { InteractiveButton } from "@/components/v2/InteractiveButton";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>🚀 Buildnest V2 - Premium Web & App Development Agency</title>
        <meta name="description" content="Experience Buildnest V2 - Revolutionary digital studio with cutting-edge animations, modern design trends, and interactive experiences for premium websites and apps." />
        <link rel="canonical" href="https://buildnest.it/" />
      </Helmet>
      
      <div className="min-h-screen relative overflow-hidden">
        {/* V2 Hero Section with Particles & Glass Morphism */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 z-0">
            <div 
              className="absolute inset-0 opacity-90"
              style={{
                background: 'var(--gradient-hero)',
                backgroundSize: '400% 400%',
                animation: 'gradient-shift 8s ease-in-out infinite'
              }}
            />
            <div className="absolute inset-0 bg-background/10 backdrop-blur-sm" />
          </div>
          
          {/* Particle background */}
          <ParticleBackground count={20} />
          
          {/* Floating elements V2 */}
          <FloatingElements />
          
          <div className="relative z-10 max-w-6xl mx-auto text-center container-padding">
            <div className="fade-in-up animate">
              {/* V2 Logo with glow effect */}
              <div className="mb-8">
                <span className="text-6xl md:text-8xl font-bold text-gradient-v2 block mb-4 animate-text-shimmer">
                  Buildnest
                </span>
                <div className="flex items-center justify-center gap-2 text-lg text-primary">
                  <Sparkles className="w-6 h-6 animate-float-1" />
                  <span className="font-semibold">V2.0 Experience</span>
                  <Sparkles className="w-6 h-6 animate-float-2" />
                </div>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold mb-8 text-glow leading-tight">
                Revolutionary Digital Experiences
                <br />
                <span className="text-accent">Built for the Future</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto">
                Experience next-generation web development with stunning animations, 
                glassmorphism design, and interactive elements that captivate your audience.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <InteractiveButton variant="primary" size="lg" glow>
                  <Link to="/contact" className="flex items-center">
                    <Rocket className="mr-3 h-6 w-6" />
                    Launch Your Project
                    <Sparkles className="ml-3 h-5 w-5" />
                  </Link>
                </InteractiveButton>
                
                <InteractiveButton variant="accent" size="lg">
                  <Link to="/portfolio" className="flex items-center">
                    <Star className="mr-3 h-5 w-5" />
                    See V2 Portfolio
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </Link>
                </InteractiveButton>
              </div>
              
              <GlassCard className="max-w-4xl mx-auto">
                <p className="text-lg text-foreground leading-relaxed">
                  🎨 Modern Design Trends • 🚀 Enhanced Animations • ⚡ Interactive Elements • 
                  ✨ Glassmorphism Effects • 🎭 Micro-interactions • 🌟 Premium Experience
                </p>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* V2 About Section with Glass Cards */}
        <section className="section-spacing relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-tech-blue/5" />
          <ParticleBackground count={10} />
          
          <div className="max-w-6xl mx-auto container-padding relative z-10">
            <ScrollAnimatedDiv className="text-center mb-20">
              <div className="fade-in-up animate">
                <h2 className="text-5xl md:text-6xl font-bold mb-8 text-gradient-v2">
                  Buildnest V2.0
                </h2>
                <div className="flex items-center justify-center gap-3 mb-8">
                  <Globe className="w-8 h-8 text-primary animate-float-1" />
                  <span className="text-xl font-semibold text-accent">Made in Italy</span>
                  <Heart className="w-8 h-8 text-red-500 animate-float-2" />
                </div>
              </div>
            </ScrollAnimatedDiv>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
              <ScrollAnimatedDiv className="fade-in-left animate">
                <GlassCard className="h-full">
                  <div className="mb-6">
                    <Palette className="w-12 h-12 text-primary mb-4 animate-glow-pulse" />
                    <h3 className="text-2xl font-bold text-gradient-v2 mb-4">Revolutionary Design</h3>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Experience the future of web design with glassmorphism effects, 
                    animated gradients, and micro-interactions that create unforgettable user experiences.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-accent" />
                      <span className="text-sm">Glassmorphism Effects</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span className="text-sm">Interactive Animations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-tech-blue" />
                      <span className="text-sm">Premium Gradients</span>
                    </div>
                  </div>
                </GlassCard>
              </ScrollAnimatedDiv>
              
              <ScrollAnimatedDiv className="fade-in-right animate">
                <GlassCard className="h-full">
                  <div className="mb-6">
                    <Shield className="w-12 h-12 text-accent mb-4 animate-glow-pulse" />
                    <h3 className="text-2xl font-bold text-gradient-v2 mb-4">Next-Gen Performance</h3>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Built with cutting-edge technology, optimized animations, and 
                    performance-first approach that delivers lightning-fast experiences.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-accent" />
                      <span className="text-sm">Optimized Animations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Rocket className="w-4 h-4 text-primary" />
                      <span className="text-sm">Lightning Fast Loading</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-tech-blue" />
                      <span className="text-sm">Premium Experience</span>
                    </div>
                  </div>
                </GlassCard>
              </ScrollAnimatedDiv>
            </div>

            {/* V2 Animated Stats */}
            <ScrollAnimatedDiv className="scale-in-bounce animate">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <GlassCard className="hover-lift-v2">
                  <Trophy className="w-12 h-12 text-primary mx-auto mb-4 animate-float-1" />
                  <div className="text-4xl font-bold text-gradient-v2 mb-2">
                    <AnimatedCounter end={75} suffix="+" />
                  </div>
                  <div className="text-muted-foreground font-medium">Projects Completed</div>
                </GlassCard>
                
                <GlassCard className="hover-lift-v2">
                  <Zap className="w-12 h-12 text-accent mx-auto mb-4 animate-float-2" />
                  <div className="text-4xl font-bold text-gradient-v2 mb-2">
                    <AnimatedCounter end={2} suffix=" Weeks" />
                  </div>
                  <div className="text-muted-foreground font-medium">Average Delivery</div>
                </GlassCard>
                
                <GlassCard className="hover-lift-v2">
                  <Users className="w-12 h-12 text-tech-blue mx-auto mb-4 animate-float-3" />
                  <div className="text-4xl font-bold text-gradient-v2 mb-2">
                    <AnimatedCounter end={100} suffix="%" />
                  </div>
                  <div className="text-muted-foreground font-medium">Client Satisfaction</div>
                </GlassCard>
                
                <GlassCard className="hover-lift-v2">
                  <Heart className="w-12 h-12 text-red-500 mx-auto mb-4 animate-float-1" />
                  <div className="text-4xl font-bold text-gradient-v2 mb-2">
                    <AnimatedCounter end={24} suffix="/7" />
                  </div>
                  <div className="text-muted-foreground font-medium">Support Available</div>
                </GlassCard>
              </div>
            </ScrollAnimatedDiv>
          </div>
        </section>

        {/* V2 Features with Glass Cards */}
        <section className="section-spacing relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tl from-accent/5 via-primary/5 to-tech-blue/5" />
          <ParticleBackground count={8} />
          
          <div className="max-w-6xl mx-auto container-padding relative z-10">
            <ScrollAnimatedDiv className="text-center mb-20">
              <div className="fade-in-up animate">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-v2">V2 Superpowers</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Experience the next evolution of web development with revolutionary features.
                </p>
              </div>
            </ScrollAnimatedDiv>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <ScrollAnimatedDiv className="fade-in-left animate">
                <GlassCard className="text-center hover-lift-v2">
                  <Zap className="h-16 w-16 text-primary mx-auto mb-6 animate-glow-pulse" />
                  <h3 className="text-2xl font-bold mb-4 text-gradient-v2">Lightning Performance</h3>
                  <p className="text-muted-foreground">Sub-second loading with optimized animations and performance-first architecture.</p>
                </GlassCard>
              </ScrollAnimatedDiv>
              
              <ScrollAnimatedDiv className="fade-in-up animate">
                <GlassCard className="text-center hover-lift-v2">
                  <Sparkles className="h-16 w-16 text-accent mx-auto mb-6 animate-glow-pulse" />
                  <h3 className="text-2xl font-bold mb-4 text-gradient-v2">Magic Interactions</h3>
                  <p className="text-muted-foreground">Glassmorphism, particle effects, and micro-interactions that captivate users.</p>
                </GlassCard>
              </ScrollAnimatedDiv>
              
              <ScrollAnimatedDiv className="fade-in-right animate">
                <GlassCard className="text-center hover-lift-v2">
                  <Rocket className="h-16 w-16 text-tech-blue mx-auto mb-6 animate-glow-pulse" />
                  <h3 className="text-2xl font-bold mb-4 text-gradient-v2">Future-Ready</h3>
                  <p className="text-muted-foreground">Built with cutting-edge tech stack for scalability and future growth.</p>
                </GlassCard>
              </ScrollAnimatedDiv>
            </div>

            <ScrollAnimatedDiv className="text-center scale-in-bounce animate">
              <InteractiveButton variant="primary" size="lg" glow>
                <Link to="/services" className="flex items-center">
                  <Star className="mr-3 h-6 w-6" />
                  Explore V2 Services
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </InteractiveButton>
            </ScrollAnimatedDiv>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;