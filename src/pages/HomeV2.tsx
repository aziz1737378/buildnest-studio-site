import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Code, Smartphone, Zap, Star, Users, Award, Sparkles, Globe, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Scene3D from "@/components/3D/Scene3D";
import { AnimatedElement, StaggeredAnimation, Parallax, TextReveal } from "@/components/animations/GSAPAnimations";
import GlassCard from "@/components/premium/GlassCard";

const HomeV2 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <Helmet>
        <title>Buildnest V2 - Premium Web & App Development Agency</title>
        <meta name="description" content="Buildnest V2 is Italy's premier digital studio offering cutting-edge websites and apps with 3D elements, cinematic animations, and Apple-grade design." />
        <link rel="canonical" href="https://buildnest.it/" />
      </Helmet>
      
      <div ref={containerRef} className="min-h-screen overflow-hidden">
        {/* Hero Section with 3D Scene */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated gradient background */}
          <motion.div 
            className="absolute inset-0 z-0"
            style={{
              background: `radial-gradient(circle at ${50 + mousePosition.x * 10}% ${50 + mousePosition.y * 10}%, 
                hsl(var(--primary)) 0%, 
                hsl(var(--accent)) 30%, 
                hsl(var(--background)) 70%)`
            }}
          >
            <div className="absolute inset-0 bg-background/70 backdrop-blur-3xl" />
          </motion.div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* 3D Logo Scene */}
          <motion.div 
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ y: heroY, opacity: heroOpacity }}
          >
            <Scene3D className="w-full h-full" />
          </motion.div>
          
          {/* Hero Content */}
          <motion.div 
            className="relative z-20 max-w-6xl mx-auto text-center container-padding"
            style={{ y: heroY }}
          >
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.21, 1.11, 0.81, 0.99] }}
            >
              <motion.div
                className="mb-8"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 mr-2 text-primary" />
                  Introducing Buildnest V2
                </span>
              </motion.div>
              
              <TextReveal className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
                The Future of
              </TextReveal>
              
              <motion.h1 
                className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
                  Digital Excellence
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Cutting-edge websites & apps with 3D elements, cinematic animations, 
                and Apple-grade design that converts visitors into customers.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="lg" 
                    className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary-deep hover:to-accent-glow shadow-2xl border-0 rounded-2xl"
                    asChild
                  >
                    <Link to="/contact" className="flex items-center">
                      <Rocket className="mr-2 h-5 w-5" />
                      Launch Your Project
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="px-8 py-4 text-lg font-semibold border-2 border-primary/20 hover:border-primary/40 backdrop-blur-sm rounded-2xl"
                    asChild
                  >
                    <Link to="/portfolio" className="flex items-center">
                      <Globe className="mr-2 h-5 w-5" />
                      Explore Our Work
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="flex items-center justify-center gap-8 text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                  50+ Projects Delivered
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                  2-3 Week Delivery
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                  100% Satisfaction
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Floating geometric shapes */}
          <motion.div
            className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl rotate-45"
            animate={{ 
              y: [0, -20, 0],
              rotate: [45, 90, 45],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-10 w-32 h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </section>

        {/* Premium Features Section */}
        <section className="relative py-32 overflow-hidden">
          <Parallax speed={0.3} className="absolute inset-0 -z-10">
            <div className="w-full h-full bg-gradient-to-br from-muted/50 to-background" />
          </Parallax>
          
          <div className="max-w-7xl mx-auto container-padding">
            <AnimatedElement animation="slideUp" className="text-center mb-20">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-5xl md:text-6xl font-bold mb-6">
                  Why Choose <span className="text-gradient">Buildnest V2</span>?
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Experience the next generation of web development with cutting-edge technology and unmatched design excellence.
                </p>
              </motion.div>
            </AnimatedElement>

            <StaggeredAnimation stagger={0.2} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="h-10 w-10 text-primary" />,
                  title: "Lightning Fast",
                  description: "Websites that load instantly with 60fps animations and optimized performance.",
                  features: ["Sub-3 second loading", "60fps animations", "Mobile-first design"]
                },
                {
                  icon: <Code className="h-10 w-10 text-accent" />,
                  title: "3D & Interactive",
                  description: "Cutting-edge 3D elements and cinematic scroll effects that wow your visitors.",
                  features: ["Three.js integration", "GSAP animations", "Interactive elements"]
                },
                {
                  icon: <Smartphone className="h-10 w-10 text-primary" />,
                  title: "Apple-Grade Design",
                  description: "Premium design inspired by Apple and Stripe with glassmorphism effects.",
                  features: ["iOS-inspired UI", "Glassmorphism", "Premium animations"]
                },
              ].map((feature, i) => (
                <GlassCard key={i} delay={i * 0.2} hover glow={i === 1}>
                  <div className="text-center">
                    <motion.div 
                      className="mb-6 mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground mb-6">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlassCard>
              ))}
            </StaggeredAnimation>

            <AnimatedElement animation="fadeIn" delay={0.6} className="text-center mt-16">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  className="px-12 py-4 text-lg font-semibold bg-gradient-to-r from-primary to-accent rounded-2xl shadow-2xl"
                  asChild
                >
                  <Link to="/services" className="flex items-center">
                    Explore All Services
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </motion.div>
            </AnimatedElement>
          </div>
        </section>

        {/* Stats Section with animated counters */}
        <section className="relative py-32 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="max-w-7xl mx-auto container-padding">
            <StaggeredAnimation stagger={0.1} className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { number: "50+", label: "Projects Delivered", icon: Star },
                { number: "100%", label: "Client Satisfaction", icon: Users },
                { number: "2-3", label: "Week Delivery", icon: Zap },
                { number: "24/7", label: "Support", icon: Award },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="text-center p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20"
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <stat.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <motion.div 
                    className="text-4xl md:text-5xl font-bold text-primary mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </StaggeredAnimation>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-32 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10"
            animate={{
              background: [
                "linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--accent) / 0.1))",
                "linear-gradient(225deg, hsl(var(--accent) / 0.1), hsl(var(--primary) / 0.1))",
                "linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--accent) / 0.1))",
              ]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          
          <div className="relative max-w-5xl mx-auto text-center container-padding">
            <AnimatedElement animation="slideUp">
              <motion.h2 
                className="text-5xl md:text-7xl font-bold mb-8"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                Ready to Create Something
                <br />
                <span className="text-gradient">Extraordinary</span>?
              </motion.h2>
              
              <motion.p 
                className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Join the future of web design with Buildnest V2. Let's build something incredible together.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-6 justify-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="lg" 
                    className="px-12 py-6 text-xl font-bold bg-gradient-to-r from-primary to-accent hover:from-primary-deep hover:to-accent-glow shadow-2xl rounded-2xl"
                    asChild
                  >
                    <Link to="/contact" className="flex items-center">
                      <Rocket className="mr-3 h-6 w-6" />
                      Start Your Project Today
                      <ArrowRight className="ml-3 h-6 w-6" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatedElement>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomeV2;