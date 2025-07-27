import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import clandestinoProject from "@/assets/clandestino-project.jpg";

const Portfolio = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="section-spacing">
        <div className="max-w-6xl mx-auto container-padding text-center">
          <div className="fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Work</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Take a look at some of the amazing projects we've created for businesses 
              across Italy and beyond. Each project is unique and tailored to our client's needs.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto container-padding">
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center slide-up">Featured Project</h2>
            
            <Card className="overflow-hidden hover-glow slide-up">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative">
                  <img 
                    src={clandestinoProject} 
                    alt="Clandestino 13 Restaurant" 
                    className="w-full h-full object-cover min-h-[400px]"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      Live Project
                    </span>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col justify-center">
                  <div className="mb-6">
                    <div className="text-4xl mb-4">🟨</div>
                    <h3 className="text-3xl font-bold mb-2">Clandestino 13</h3>
                    <p className="text-muted-foreground mb-4">
                      Modern burger & kebab restaurant in Tricase, Italy
                    </p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-semibold mb-2">Project Scope:</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Website design & development</li>
                        <li>• Online menu integration</li>
                        <li>• Custom branding elements</li>
                        <li>• Mobile-first responsive design</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {["React", "TypeScript", "Tailwind CSS", "Responsive Design"].map((tech) => (
                          <span key={tech} className="bg-muted px-3 py-1 rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="premium" asChild>
                      <a 
                        href="https://clandestino13.it" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        View Live Site
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/contact">Request Similar Project</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Coming Soon Projects */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-8 bg-muted/30 rounded-2xl mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">More Projects Coming Soon</h3>
                <p className="text-muted-foreground mb-4">
                  We're working on exciting new projects that will be featured here soon.
                </p>
                <div className="flex justify-center space-x-4">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-accent rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-3 h-3 bg-tech-blue rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16 p-8 bg-gradient-to-r from-primary to-tech-blue rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-4">Want to Be Our Next Success Story?</h3>
            <p className="mb-6 opacity-90 max-w-2xl mx-auto">
              Let's create something amazing for your business. Every project is unique, 
              just like yours will be.
            </p>
            <Button variant="accent" size="lg" asChild>
              <Link to="/contact" className="flex items-center">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;