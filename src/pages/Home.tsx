import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Code, Smartphone, Zap, Star, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { SEOProvider } from "@/components/SEO/SEOProvider";
import { BreadcrumbNavigation } from "@/components/SEO/BreadcrumbNavigation";
import heroBackground from "@/assets/hero-bg.jpg";
import { ScrollAnimatedDiv } from "@/hooks/useScrollAnimation";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
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
        <title>{t('home.title')}</title>
        <meta name="description" content={t('home.description')} />
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
              <span className="text-gradient animate-pulse-glow">{t('home.hero.title')}</span>
            </h1>
            <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                {t('home.hero.subtitle')}
              </p>
            </div>
            <div className="fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button variant="premium" size="lg" asChild className="group hover-glow btn-shine">
                  <Link to="/contact" className="flex items-center">
                    {t('home.hero.startProject')}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="hover-lift ripple">
                  <Link to="/portfolio">{t('home.hero.viewWork')}</Link>
                </Button>
              </div>
            </div>
            <div className="fade-in-up" style={{ animationDelay: '0.6s' }}>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                {t('home.hero.description')}
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
              <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('home.about.title')}</h2>
              <div className="max-w-4xl mx-auto space-y-6 text-lg text-muted-foreground">
                <p>
                  {t('home.about.description1')}
                </p>
                <p>
                  {t('home.about.description2')}
                </p>
                <p className="text-xl font-medium text-foreground">
                  {t('home.about.description3')}
                </p>
                <p className="text-muted-foreground">
                  {t('home.about.description4')}
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
                  <div className="text-muted-foreground">{t('home.stats.projects')}</div>
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
                  <div className="text-muted-foreground">{t('home.stats.delivery')}</div>
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
                  <div className="text-muted-foreground">{t('home.stats.satisfaction')}</div>
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
          <div className="max-w-6xl mx-auto container-padding relative">
            <ScrollAnimatedDiv animation="scroll-slide-up" className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('home.features.title')}</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t('home.features.subtitle')}
              </p>
            </ScrollAnimatedDiv>

            {/* PROFESSIONAL FEATURES CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="h-8 w-8 text-primary" />,
                  title: t('home.features.fast.title'),
                  desc: t('home.features.fast.desc'),
                  delay: "0s",
                },
                {
                  icon: <Code className="h-8 w-8 text-primary" />,
                  title: t('home.features.design.title'),
                  desc: t('home.features.design.desc'),
                  delay: "0.2s",
                },
                {
                  icon: <Smartphone className="h-8 w-8 text-primary" />,
                  title: t('home.features.mobile.title'),
                  desc: t('home.features.mobile.desc'),
                  delay: "0.4s",
                },
              ].map((f, i) => (
                <ScrollAnimatedDiv
                  animation="scroll-scale"
                  className="group"
                  triggerOnce={true}
                  key={i}
                >
                  <div
                    className={`
                      p-8 rounded-2xl bg-white border border-neutral-200 shadow-md
                      hover:shadow-xl transition-all duration-300
                      flex flex-col items-start h-full relative cursor-pointer
                      hover:-translate-y-2
                    `}
                    style={{ animationDelay: f.delay }}
                  >
                    <div className="mb-5 rounded-full bg-gradient-to-br from-primary/10 to-accent/20 w-14 h-14 flex items-center justify-center shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                      {f.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">{f.title}</h3>
                    <p className="text-base text-muted-foreground mb-9 group-hover:text-foreground transition-colors">{f.desc}</p>
                    <div className="absolute left-7 right-7 bottom-7">
                      <div className="h-1 rounded-full bg-gradient-to-r from-primary to-accent opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:from-accent group-hover:to-primary group-hover:shadow-[0_0_8px_2px_rgba(41,121,255,0.20)]"></div>
                    </div>
                  </div>
                </ScrollAnimatedDiv>
              ))}
            </div>

            <ScrollAnimatedDiv animation="scroll-fade-in" className="text-center mt-12" triggerOnce={true}>
              <Button variant="premium" size="lg" asChild className="group hover-glow btn-shine pulse-scale">
                <Link to="/services" className="flex items-center">
                  {t('home.features.exploreServices')}
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
