import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-bg.jpg";

const Home = () => {
  return (
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
      <section className="section-spacing bg-muted/30">
        <div className="max-w-6xl mx-auto container-padding">
          <div className="text-center mb-16 slide-up">
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
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              { number: "50+", label: "Projects Delivered" },
              { number: "2-3", label: "Week Delivery" },
              { number: "100%", label: "Client Satisfaction" }
            ].map((stat, index) => (
              <div key={index} className="text-center slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="section-spacing">
        <div className="max-w-6xl mx-auto container-padding text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 slide-up">Why Choose Buildnest?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "⚡",
                title: "Lightning Fast",
                description: "Websites that load in under 3 seconds and provide seamless user experience."
              },
              {
                icon: "🎨",
                title: "Premium Design",
                description: "Beautiful, modern designs that make your business stand out from the competition."
              },
              {
                icon: "📱",
                title: "Mobile First",
                description: "Fully responsive designs that work perfectly on all devices and screen sizes."
              }
            ].map((feature, index) => (
              <div key={index} className="p-6 rounded-xl hover-glow slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
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
  );
};

export default Home;