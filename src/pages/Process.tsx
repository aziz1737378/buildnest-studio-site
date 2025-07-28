import { Link } from "react-router-dom";
import { MessageCircle, Palette, Rocket, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";

const Process = () => {
  const steps = [
    {
      icon: MessageCircle,
      step: "01",
      title: "You tell us what you need",
      description: "We start with a conversation to understand your business, goals, and vision. No technical jargon - just a friendly chat about what you want to achieve.",
      details: [
        "Free initial consultation",
        "Project scope discussion",
        "Timeline and budget planning",
        "Clear requirements gathering"
      ]
    },
    {
      icon: Palette,
      step: "02", 
      title: "We design and build it",
      description: "Our team creates your custom solution using modern technologies and best practices. You'll see regular updates and can provide feedback throughout the process.",
      details: [
        "Custom design mockups",
        "Responsive development",
        "Regular progress updates",
        "Your feedback incorporated"
      ]
    },
    {
      icon: Rocket,
      step: "03",
      title: "You go live — fast and proud",
      description: "We handle the launch, ensure everything works perfectly, and provide ongoing support. Your new digital presence is ready to help your business grow.",
      details: [
        "Smooth deployment process",
        "Performance optimization",
        "Training and documentation",
        "Ongoing support included"
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Process | Buildnest</title>
        <meta name="description" content="Learn about our simple 3-step web development process: consultation, design & build, and launch. Fast delivery in 2-3 weeks with full support." />
        <link rel="canonical" href="https://buildnest.it/process" />
      </Helmet>
      <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="section-spacing">
        <div className="max-w-6xl mx-auto container-padding text-center">
          <div className="fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Simple Process</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              We've streamlined our process to be as simple and transparent as possible. 
              From idea to launch, we'll guide you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto container-padding">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={index} className="slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <Card className="overflow-hidden hover-glow">
                  <div className={`grid md:grid-cols-2 gap-0 ${index % 2 === 1 ? 'md:grid-flow-col-dense' : ''}`}>
                    {/* Content */}
                    <div className={`p-8 flex flex-col justify-center ${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center mr-4">
                          <step.icon className="h-6 w-6" />
                        </div>
                        <span className="text-4xl font-bold text-muted-foreground/50">{step.step}</span>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                      <p className="text-muted-foreground mb-6 text-lg">{step.description}</p>
                      
                      <ul className="space-y-3">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center">
                            <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Visual */}
                    <div className={`bg-gradient-to-br from-primary/5 to-accent/10 p-8 flex items-center justify-center min-h-[300px] ${index % 2 === 1 ? 'md:col-start-1' : ''}`}>
                      <div className="text-center">
                        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                          <step.icon className="h-12 w-12 text-primary" />
                        </div>
                        <div className="text-6xl font-bold text-primary/20">{step.step}</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="mt-20 text-center">
            <h2 className="text-2xl font-bold mb-8">Typical Timeline</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { phase: "Discovery", duration: "1-2 days", description: "Understanding your needs" },
                { phase: "Development", duration: "1-2 weeks", description: "Building your solution" },
                { phase: "Launch", duration: "1-2 days", description: "Going live together" }
              ].map((phase, index) => (
                <Card key={index} className="text-center hover-glow">
                  <CardHeader>
                    <CardTitle className="text-lg">{phase.phase}</CardTitle>
                    <CardDescription className="text-2xl font-bold text-primary">{phase.duration}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{phase.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16 p-8 bg-muted/30 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              The first step is always a conversation. Let's talk about your project 
              and see how we can help bring your vision to life.
            </p>
            <Button variant="premium" size="lg" asChild>
              <Link to="/contact" className="flex items-center">
                Start Your Project
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

export default Process;