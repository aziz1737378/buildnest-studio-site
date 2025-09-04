import { Link } from "react-router-dom";
import { Monitor, Smartphone, Target, ShoppingCart, Wrench, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";
import { ScrollAnimatedDiv } from "@/hooks/useScrollAnimation";
import { useEffect, useState } from "react";
import { SEOProvider } from "@/components/SEO/SEOProvider";
import { BreadcrumbNavigation } from "@/components/SEO/BreadcrumbNavigation";
import { useTranslation } from "react-i18next";

const Services = () => {
  const { t } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger initial animations
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      icon: Monitor,
      title: t('services.services.websites.title'),
      description: t('services.services.websites.description'),
      features: t('services.services.websites.features', { returnObjects: true }) as string[],
      color: "bg-primary"
    },
    {
      icon: Smartphone,
      title: t('services.services.apps.title'),
      description: t('services.services.apps.description'),
      features: t('services.services.apps.features', { returnObjects: true }) as string[],
      color: "bg-tech-blue"
    },
    {
      icon: Target,
      title: t('services.services.landing.title'),
      description: t('services.services.landing.description'),
      features: t('services.services.landing.features', { returnObjects: true }) as string[],
      color: "bg-accent"
    },
    {
      icon: ShoppingCart,
      title: t('services.services.ecommerce.title'),
      description: t('services.services.ecommerce.description'),
      features: t('services.services.ecommerce.features', { returnObjects: true }) as string[],
      color: "bg-primary"
    },
    {
      icon: Wrench,
      title: t('services.services.custom.title'),
      description: t('services.services.custom.description'),
      features: t('services.services.custom.features', { returnObjects: true }) as string[],
      color: "bg-tech-blue"
    }
  ];

  return (
    <>
      <SEOProvider
        title={t('services.title')}
        description={t('services.description')}
        keywords="web development services, custom app development, landing page design, e-commerce development, business websites, digital solutions, React development, mobile apps"
        type="service"
        section="Services"
      />
      <BreadcrumbNavigation />
      <div className="min-h-screen pt-20">
        {/* Header */}
        <section className="section-spacing">
          <div className="max-w-6xl mx-auto container-padding text-center">
            <div className={`transition-all duration-700 ease-out transform ${
              isLoaded 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}>
              <h1 className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-700 ease-out transform ${
                isLoaded 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: '200ms' }}>
                {t('services.seo.title')}
              </h1>
              <p className={`text-xl text-muted-foreground max-w-3xl mx-auto mb-12 transition-all duration-700 ease-out transform ${
                isLoaded 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: '400ms' }}>
                {t('services.seo.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="pb-20">
          <div className="max-w-6xl mx-auto container-padding">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                 <div 
                   key={index} 
                   className={`transition-all duration-700 ease-out transform ${
                     isLoaded 
                       ? 'opacity-100 translate-y-0' 
                       : 'opacity-0 translate-y-12'
                   }`}
                   style={{ transitionDelay: `${600 + index * 150}ms` }}
                 >
                   <ScrollAnimatedDiv 
                     animation={index % 2 === 0 ? "scroll-slide-left" : "scroll-slide-right"}
                     className="transition-all duration-500"
                     threshold={0.2}
                   >
                     <Card className="group hover-lift h-full overflow-hidden border-2 hover:border-primary/20 transition-all duration-500 hover-glow">
                        <CardHeader className="relative">
                          <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                            <service.icon className="h-6 w-6 text-white transition-transform duration-300 group-hover:scale-110" />
                          </div>
                          <CardTitle className="text-xl group-hover:text-primary transition-all duration-300 group-hover:scale-105 transform-gpu">{service.title}</CardTitle>
                          <CardDescription className="text-base transition-all duration-300 group-hover:text-foreground group-hover:translate-y-[-2px]">
                            {service.description}
                          </CardDescription>
                          <div className="absolute top-2 right-2 w-2 h-2 bg-primary/20 rounded-full group-hover:bg-primary group-hover:scale-125 transition-all duration-300"></div>
                        </CardHeader>
                        <CardContent className="relative">
                          <ul className="space-y-3">
                            {service.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-center text-sm text-muted-foreground transition-all duration-300 hover:text-foreground hover:translate-x-2 group-hover:translate-x-1" style={{ animationDelay: `${featureIndex * 100}ms` }}>
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 transition-all duration-300 group-hover:scale-125 group-hover:bg-accent group-hover:shadow-sm"></div>
                                <span className="transition-all duration-300 group-hover:font-medium">{feature}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-4 h-1 w-0 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500 ease-out rounded-full"></div>
                        </CardContent>
                      </Card>
                    </ScrollAnimatedDiv>
                  </div>
               ))}
            </div>

            {/* CTA Section */}
            <div className={`text-center mt-16 relative transition-all duration-700 ease-out transform ${
              isLoaded 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`} style={{ transitionDelay: `${600 + services.length * 150 + 200}ms` }}>
              <ScrollAnimatedDiv animation="scroll-scale" threshold={0.3}>
                <div className="p-8 bg-gradient-to-br from-muted/40 to-muted/20 rounded-2xl hover-glow transition-all duration-500 border-2 border-transparent hover:border-primary/20 backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <ScrollAnimatedDiv animation="scroll-fade-in" className="mb-4">
                    <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{t('services.cta.title')}</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
                    </ScrollAnimatedDiv>
                    <ScrollAnimatedDiv animation="scroll-slide-up" className="mb-6">
                      <p className="text-muted-foreground max-w-2xl mx-auto transition-colors duration-300 hover:text-foreground">
                        {t('services.cta.description')}
                      </p>
                    </ScrollAnimatedDiv>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <ScrollAnimatedDiv animation="scroll-slide-left">
                        <Button variant="premium" size="lg" asChild className="hover:scale-105 transition-all duration-300 group shadow-lg hover:shadow-xl btn-shine">
                          <Link to="/contact" className="flex items-center">
                            {t('services.cta.startProject')}
                            <ArrowRight className="ml-2 h-5 w-5 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
                          </Link>
                        </Button>
                      </ScrollAnimatedDiv>
                      <ScrollAnimatedDiv animation="scroll-slide-right">
                        <Button variant="outline" size="lg" asChild className="hover:scale-105 transition-all duration-300 border-2 hover:border-primary/50 hover:bg-primary/5 hover-glow">
                          <Link to="/pricing">{t('services.cta.viewPricing')}</Link>
                        </Button>
                      </ScrollAnimatedDiv>
                    </div>
                  </div>
                </div>
              </ScrollAnimatedDiv>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Services;