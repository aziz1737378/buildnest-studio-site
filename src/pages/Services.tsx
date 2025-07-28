import { Link } from "react-router-dom";
import { Monitor, Smartphone, Target, ShoppingCart, Wrench, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";

const Services = () => {
  const services = [
    {
      icon: Monitor,
      title: "Websites for businesses",
      description: "Full site builds for restaurants, shops, services, freelancers",
      features: ["Custom Design", "Mobile Responsive", "SEO Optimized", "Fast Loading"],
      color: "bg-primary"
    },
    {
      icon: Smartphone,
      title: "Apps & tools",
      description: "Internal tools, booking systems, mobile-style UIs",
      features: ["Custom Development", "User-Friendly", "Secure", "Scalable"],
      color: "bg-tech-blue"
    },
    {
      icon: Target,
      title: "Landing pages",
      description: "High-converting pages for launches or products",
      features: ["Conversion Focused", "A/B Testing", "Analytics", "Performance"],
      color: "bg-accent"
    },
    {
      icon: ShoppingCart,
      title: "E-commerce setups",
      description: "Online menus, orders, or stores",
      features: ["Payment Integration", "Inventory Management", "Order Tracking", "Mobile Commerce"],
      color: "bg-primary"
    },
    {
      icon: Wrench,
      title: "Custom solutions",
      description: "If you have an idea, we'll build it with you",
      features: ["Tailored Approach", "Consultation", "Support", "Maintenance"],
      color: "bg-tech-blue"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Our Services | Buildnest</title>
        <meta name="description" content="Professional web development services including websites for businesses, apps & tools, landing pages, e-commerce setups, and custom solutions." />
        <link rel="canonical" href="https://buildnest.it/services" />
      </Helmet>
      <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="section-spacing">
        <div className="max-w-6xl mx-auto container-padding text-center">
          <div className="fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">What We Build</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              From simple websites to complex applications, we create digital solutions 
              that help your business grow and succeed in the modern world.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto container-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover-glow transition-all duration-300 hover:scale-105 slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16 p-8 bg-muted/30 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Let's discuss your idea and create something amazing together. 
              Get a free consultation and project estimate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="premium" size="lg" asChild>
                <Link to="/contact" className="flex items-center">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default Services;