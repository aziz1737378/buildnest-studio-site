import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Code, Smartphone, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import heroBackground from "@/assets/hero-bg.jpg";
import { ScrollAnimatedDiv } from "@/hooks/useScrollAnimation";

const Home = () => {
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
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center container-padding">
          <div className="fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-gradient">Buildnest</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Smart websites & apps — built for real businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="premium" size="lg" asChild>
                <Link to="/contact" className="flex items-center">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/portfolio">View Our Work</Link>
              </Button>
            </div>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              We design and build premium websites and digital tools for modern entrepreneurs, 
              startups, and businesses.
            </p>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-accent/20 rounded-full animate-float"></div>
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-tech-blue/10 rounded-full animate-float" style={{ animationDelay: "1s" }}></div>
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

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <ScrollAnimatedDiv animation="scroll-slide-left">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">50+</div>
                  <div className="text-muted-foreground">Projects Delivered</div>
                </div>
              </ScrollAnimatedDiv>
              
              <ScrollAnimatedDiv animation="scroll-fade-in">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">2-3</div>
                  <div className="text-muted-foreground">Week Delivery</div>
                </div>
              </ScrollAnimatedDiv>
              
              <ScrollAnimatedDiv animation="scroll-slide-right">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <div className="text-muted-foreground">Client Satisfaction</div>
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
              <ScrollAnimatedDiv animation="scroll-scale">
                <div className="p-6 rounded-xl hover:shadow-xl transition-all duration-300 group bg-card border hover:border-primary/20">
                  <div className="mb-4">
                    <Zap className="h-12 w-12 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
                  <p className="text-muted-foreground">Websites that load in under 3 seconds and provide seamless user experience.</p>
                </div>
              </ScrollAnimatedDiv>
              
              <ScrollAnimatedDiv animation="scroll-scale">
                <div className="p-6 rounded-xl hover:shadow-xl transition-all duration-300 group bg-card border hover:border-primary/20">
                  <div className="mb-4">
                    <Code className="h-12 w-12 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Premium Design</h3>
                  <p className="text-muted-foreground">Beautiful, modern designs that make your business stand out from the competition.</p>
                </div>
              </ScrollAnimatedDiv>
              
              <ScrollAnimatedDiv animation="scroll-scale">
                <div className="p-6 rounded-xl hover:shadow-xl transition-all duration-300 group bg-card border hover:border-primary/20">
                  <div className="mb-4">
                    <Smartphone className="h-12 w-12 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Mobile First</h3>
                  <p className="text-muted-foreground">Fully responsive designs that work perfectly on all devices and screen sizes.</p>
                </div>
              </ScrollAnimatedDiv>
            </div>

            <ScrollAnimatedDiv animation="scroll-fade-in" className="text-center mt-12">
              <Button variant="premium" size="lg" asChild className="group">
                <Link to="/services" className="flex items-center">
                  Explore Our Services
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </ScrollAnimatedDiv>
          </div>
        </section>
      </ScrollAnimatedDiv>
      </div>
    </>
  );
};

export default Home;