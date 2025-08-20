import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";
import { SEOProvider } from "@/components/SEO/SEOProvider";
import { BreadcrumbNavigation } from "@/components/SEO/BreadcrumbNavigation";
import clandestinoProject from "@/assets/clandestino-project.jpg";
import { ScrollAnimatedDiv } from "@/hooks/useScrollAnimation";

const Portfolio = () => {
  return (
    <>
      <SEOProvider
        title="Portfolio - Our Best Web Development Projects"
        description="Explore our portfolio of premium websites and applications. See examples of our web development work for restaurants, businesses, and startups including Clandestino 13 restaurant, Lecce Quick Taxi, and more."
        keywords="web development portfolio, website examples, app development showcase, restaurant websites, business web design, Clandestino 13, Lecce Quick Taxi, digital projects"
        type="website"
        section="Portfolio"
        image="https://buildnest.it/assets/clandestino-project.jpg"
      />
      <BreadcrumbNavigation />
      <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="section-spacing">
        <div className="max-w-6xl mx-auto container-padding text-center">
          <ScrollAnimatedDiv animation="bounce-in" duration="duration-1000">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Work</h1>
          </ScrollAnimatedDiv>
          <ScrollAnimatedDiv animation="fade-in-up" delay={200} duration="duration-800">
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Take a look at some of the amazing projects we've created for businesses 
              across Italy and beyond. Each project is unique and tailored to our client's needs.
            </p>
          </ScrollAnimatedDiv>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto container-padding">
          {/* Clandestino 13 */}
          <div className="mb-16">
            <ScrollAnimatedDiv animation="scale-in" delay={300}>
              <h2 className="text-2xl font-bold mb-8 text-center">Featured Project</h2>
            </ScrollAnimatedDiv>
            
            <ScrollAnimatedDiv animation="fade-in-up" delay={500} duration="duration-1000" easing="ease-out">
              <Card className="overflow-hidden hover-lift transition-all duration-700">
                <div className="grid md:grid-cols-2 gap-0">
                <div className="relative bg-gray-100 overflow-hidden group">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium bounce-in" style={{ animationDelay: '0.8s' }}>
                      Live Preview
                    </span>
                  </div>
                  <iframe 
                    src="https://clandestino13.it" 
                    title="Clandestino 13 Live Preview"
                    className="w-full h-[400px] border-0 transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  />
                  <div className="absolute bottom-4 right-4 z-10">
                    <a 
                      href="https://clandestino13.it" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-black/80 text-white px-3 py-1 rounded-full text-xs hover:bg-black/90 transition-all duration-300 flex items-center hover:scale-110"
                    >
                      Open Full Site
                      <ExternalLink className="ml-1 h-3 w-3 transition-transform duration-300 hover:translate-x-1" />
                    </a>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col justify-center">
                  <div className="mb-6">
                    <div className="text-4xl mb-4 scale-in" style={{ animationDelay: '1s' }}>🥙</div>
                    <h3 className="text-3xl font-bold mb-2 slide-in-right" style={{ animationDelay: '1.2s' }}>Clandestino 13</h3>
                    <p className="text-muted-foreground mb-4 fade-in" style={{ animationDelay: '1.4s' }}>
                      Modern burger & kebab restaurant in Tricase, Italy
                    </p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="slide-in-left" style={{ animationDelay: '1.6s' }}>
                      <h4 className="font-semibold mb-2">Project Scope:</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        {["Website design & development", "Online menu integration", "Custom branding elements", "Mobile-first responsive design"].map((item, index) => (
                          <li key={index} className="fade-in transition-all duration-300 hover:translate-x-2 hover:text-foreground" style={{ animationDelay: `${1.8 + index * 0.1}s` }}>• {item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="slide-in-right" style={{ animationDelay: '2.2s' }}>
                      <h4 className="font-semibold mb-2">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {["React", "TypeScript", "Tailwind CSS", "Responsive Design"].map((tech, index) => (
                          <span key={tech} className="bg-muted px-3 py-1 rounded-full text-sm bounce-in hover:scale-110 transition-transform duration-300" style={{ animationDelay: `${2.4 + index * 0.1}s` }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="premium" asChild className="slide-in-left hover:scale-105 transition-transform duration-300" style={{ animationDelay: '2.8s' }}>
                      <a 
                        href="https://clandestino13.it" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center group"
                      >
                        View Live Site
                        <ExternalLink className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </a>
                    </Button>
                    <Button variant="outline" asChild className="slide-in-right hover:scale-105 transition-transform duration-300" style={{ animationDelay: '3s' }}>
                      <Link to="/contact">Request Similar Project</Link>
                    </Button>
                  </div>
                </div>
                </div>
              </Card>
            </ScrollAnimatedDiv>
          </div>

          {/* Lecce Quick Taxi - New Featured Project */}
          <div className="mb-16">
            <ScrollAnimatedDiv animation="scale-in" delay={400}>
              <h2 className="text-2xl font-bold mb-8 text-center">Featured Project</h2>
            </ScrollAnimatedDiv>

            <ScrollAnimatedDiv animation="fade-in-up" delay={600} duration="duration-1000" easing="ease-out">
              <Card className="overflow-hidden hover-lift transition-all duration-700">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative bg-gray-100 overflow-hidden group">
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium bounce-in" style={{ animationDelay: '0.8s' }}>
                        Live Preview
                      </span>
                    </div>
                    <iframe
                      src="https://leccequicktaxi.com"
                      title="Lecce Quick Taxi Live Preview"
                      className="w-full h-[400px] border-0 transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                    />
                    <div className="absolute bottom-4 right-4 z-10">
                      <a
                        href="https://leccequicktaxi.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black/80 text-white px-3 py-1 rounded-full text-xs hover:bg-black/90 transition-all duration-300 flex items-center hover:scale-110"
                      >
                        Open Full Site
                        <ExternalLink className="ml-1 h-3 w-3 transition-transform duration-300 hover:translate-x-1" />
                      </a>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col justify-center">
                    <div className="mb-6">
                      <div className="text-4xl mb-4 scale-in" style={{ animationDelay: '1s' }}>🚕</div>
                      <h3 className="text-3xl font-bold mb-2 slide-in-right" style={{ animationDelay: '1.2s' }}>Lecce Quick Taxi</h3>
                      <p className="text-muted-foreground mb-4 fade-in" style={{ animationDelay: '1.4s' }}>
                        Taxi service website for Lecce, Italy. Book rides quickly and easily online.
                      </p>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="slide-in-left" style={{ animationDelay: '1.6s' }}>
                        <h4 className="font-semibold mb-2">Project Scope:</h4>
                        <ul className="space-y-1 text-muted-foreground">
                          {["Taxi booking platform", "Online reservation system", "Mobile-first responsive design", "Service information & contact"].map((item, index) => (
                            <li key={index} className="fade-in transition-all duration-300 hover:translate-x-2 hover:text-foreground" style={{ animationDelay: `${1.8 + index * 0.1}s` }}>• {item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="slide-in-right" style={{ animationDelay: '2.2s' }}>
                        <h4 className="font-semibold mb-2">Technologies Used:</h4>
                        <div className="flex flex-wrap gap-2">
                          {["React", "TypeScript", "Tailwind CSS", "Responsive Design"].map((tech, index) => (
                            <span key={tech} className="bg-muted px-3 py-1 rounded-full text-sm bounce-in hover:scale-110 transition-transform duration-300" style={{ animationDelay: `${2.4 + index * 0.1}s` }}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button variant="premium" asChild className="slide-in-left hover:scale-105 transition-transform duration-300" style={{ animationDelay: '2.8s' }}>
                        <a
                          href="https://leccequicktaxi.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center group"
                        >
                          View Live Site
                          <ExternalLink className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                      </Button>
                      <Button variant="outline" asChild className="slide-in-right hover:scale-105 transition-transform duration-300" style={{ animationDelay: '3s' }}>
                        <Link to="/contact">Request Similar Project</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </ScrollAnimatedDiv>
          </div>

          {/* Upcoming Projects */}
          <div className="mb-16">
            <ScrollAnimatedDiv animation="scale-in" delay={600}>
              <h2 className="text-2xl font-bold mb-8 text-center">Upcoming Project</h2>
            </ScrollAnimatedDiv>
            
            <ScrollAnimatedDiv animation="slide-in-left" delay={800} duration="duration-1000">
              <Card className="overflow-hidden hover-lift transition-all duration-700">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative bg-muted overflow-hidden group">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium bounce-in" style={{ animationDelay: '0.6s' }}>
                      Coming Soon
                    </span>
                  </div>
                  <div className="w-full h-[400px] flex items-center justify-center bg-gradient-to-br from-muted to-muted/70">
                    <div className="text-center p-8">
                      <div className="text-6xl mb-4 scale-in" style={{ animationDelay: '0.8s' }}>✈️</div>
                      <h3 className="text-2xl font-bold mb-2 text-muted-foreground slide-in-right" style={{ animationDelay: '1s' }}>Coming Soon</h3>
                      <p className="text-muted-foreground/70 fade-in" style={{ animationDelay: '1.2s' }}>Preview available at launch</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col justify-center">
                  <div className="mb-6">
                    <div className="text-4xl mb-4 scale-in" style={{ animationDelay: '1.4s' }}>🧳</div>
                    <h3 className="text-3xl font-bold mb-2 slide-in-right" style={{ animationDelay: '1.6s' }}>Rayyan Travels</h3>
                    <p className="text-muted-foreground mb-4 fade-in" style={{ animationDelay: '1.8s' }}>
                      Premium travel agency website based in Salerno, Italy
                    </p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="slide-in-left" style={{ animationDelay: '2s' }}>
                      <h4 className="font-semibold mb-2">Project Scope:</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        {["Travel booking platform", "Destination showcase", "Custom tour packages", "Multi-language support"].map((item, index) => (
                          <li key={index} className="fade-in transition-all duration-300 hover:translate-x-2 hover:text-foreground" style={{ animationDelay: `${2.2 + index * 0.1}s` }}>• {item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="slide-in-right" style={{ animationDelay: '2.6s' }}>
                      <h4 className="font-semibold mb-2">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {["React", "TypeScript", "Tailwind CSS", "Supabase"].map((tech, index) => (
                          <span key={tech} className="bg-muted px-3 py-1 rounded-full text-sm bounce-in hover:scale-110 transition-transform duration-300" style={{ animationDelay: `${2.8 + index * 0.1}s` }}>
                            {tech}
                          </span>
                         ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="outline" disabled className="slide-in-left opacity-60" style={{ animationDelay: '3.2s' }}>
                      <span className="flex items-center">
                        Launching Soon
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </Button>
                    <Button variant="outline" asChild className="slide-in-right hover:scale-105 transition-transform duration-300" style={{ animationDelay: '3.4s' }}>
                      <Link to="/contact">Request Similar Project</Link>
                    </Button>
                  </div>
                </div>
              </div>
              </Card>
            </ScrollAnimatedDiv>
          </div>

          {/* Second Upcoming Project */}
          <div className="mb-16">
            <ScrollAnimatedDiv animation="slide-in-right" delay={1000} duration="duration-1000">
              <Card className="overflow-hidden hover-lift transition-all duration-700">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative bg-muted overflow-hidden group">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium bounce-in" style={{ animationDelay: '0.8s' }}>
                      Coming Soon
                    </span>
                  </div>
                  <div className="w-full h-[400px] flex items-center justify-center bg-gradient-to-br from-muted to-muted/70">
                    <div className="text-center p-8">
                      <div className="text-6xl mb-4 scale-in" style={{ animationDelay: '1s' }}>💱</div>
                      <h3 className="text-2xl font-bold mb-2 text-muted-foreground slide-in-right" style={{ animationDelay: '1.2s' }}>Coming Soon</h3>
                      <p className="text-muted-foreground/70 fade-in" style={{ animationDelay: '1.4s' }}>Preview available at launch</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col justify-center">
                  <div className="mb-6">
                    <div className="text-4xl mb-4 scale-in" style={{ animationDelay: '1.6s' }}>💰</div>
                    <h3 className="text-3xl font-bold mb-2 slide-in-right" style={{ animationDelay: '1.8s' }}>Valuto</h3>
                    <p className="text-muted-foreground mb-4 fade-in" style={{ animationDelay: '2s' }}>
                      Real-time currency exchanger web application
                    </p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="slide-in-left" style={{ animationDelay: '2.2s' }}>
                      <h4 className="font-semibold mb-2">Project Scope:</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        {["Real-time exchange rates", "Multi-currency converter", "Historical data charts", "Mobile-responsive design"].map((item, index) => (
                          <li key={index} className="fade-in transition-all duration-300 hover:translate-x-2 hover:text-foreground" style={{ animationDelay: `${2.4 + index * 0.1}s` }}>• {item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="slide-in-right" style={{ animationDelay: '2.8s' }}>
                      <h4 className="font-semibold mb-2">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {["React", "TypeScript", "REST APIs", "Chart.js"].map((tech, index) => (
                          <span key={tech} className="bg-muted px-3 py-1 rounded-full text-sm bounce-in hover:scale-110 transition-transform duration-300" style={{ animationDelay: `${3 + index * 0.1}s` }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="outline" disabled className="slide-in-left opacity-60" style={{ animationDelay: '3.4s' }}>
                      <span className="flex items-center">
                        Launching Soon
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </Button>
                    <Button variant="outline" asChild className="slide-in-right hover:scale-105 transition-transform duration-300" style={{ animationDelay: '3.6s' }}>
                      <Link to="/contact">Request Similar Project</Link>
                    </Button>
                  </div>
                </div>
              </div>
              </Card>
            </ScrollAnimatedDiv>
          </div>

          {/* More Coming Soon Projects */}
          <ScrollAnimatedDiv animation="bounce-in" delay={1200}>
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
          </ScrollAnimatedDiv>

          {/* CTA Section */}
          <ScrollAnimatedDiv animation="fade-in-up" delay={1400} duration="duration-1000">
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
          </ScrollAnimatedDiv>
        </div>
      </section>
      </div>
    </>
  );
};

export default Portfolio;
