import { Link } from "react-router-dom";
import { Check, ArrowRight, Star, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";
import { SEOProvider } from "@/components/SEO/SEOProvider";
import { BreadcrumbNavigation } from "@/components/SEO/BreadcrumbNavigation";
import { useState, useEffect } from "react";
import { ScrollAnimatedDiv } from "@/hooks/useScrollAnimation";

const Pricing = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [offerExpired, setOfferExpired] = useState(false);

  useEffect(() => {
    // Set end date to 7 days from now
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
    endDate.setHours(23, 59, 59, 999);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setOfferExpired(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const plans = [
    {
      name: "Starter",
      originalPrice: "€299",
      discountedPrice: "€60",
      description: "Perfect for small businesses and freelancers",
      features: [
        "1-page responsive website",
        "Basic modern design", 
        "Mobile optimization",
        "Contact form integration",
        "Basic SEO setup",
        "1 month support"
      ],
      popular: false,
      cta: "Get Started"
    },
    {
      name: "Pro",
      originalPrice: "€599",
      discountedPrice: "€120",
      description: "Ideal for growing businesses",
      features: [
        "Multi-page website (up to 5 pages)",
        "Custom design & animations",
        "CMS integration",
        "Advanced SEO optimization",
        "Social media integration",
        "Contact forms & integrations",
        "3 months support",
        "Performance optimization"
      ],
      popular: true,
      cta: "Most Popular"
    },
    {
      name: "Custom",
      originalPrice: "Quote",
      discountedPrice: "80% OFF",
      description: "Tailored solutions for unique needs",
      features: [
        "Advanced web applications",
        "Custom functionality",
        "Database integration",
        "User authentication",
        "Payment processing",
        "API integrations",
        "Ongoing maintenance",
        "Priority support"
      ],
      popular: false,
      cta: "Get Quote"
    }
  ];

  return (
    <>
      <SEOProvider
        title="Pricing - Affordable Web Development Packages"
        description="Transparent pricing for web development services. Choose from our Starter (€499), Pro (€999), or Custom packages. Limited-time 30% discount available. No hidden fees."
        keywords="web development pricing, website cost, app development price, development packages, affordable web design, starter package, pro package, custom development"
        type="product"
        section="Pricing"
      />
      <BreadcrumbNavigation />
      <div className="min-h-screen pt-20">
      {/* Limited Time Offer Banner */}
      {!offerExpired && (
        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 animate-pulse">
          <div className="max-w-6xl mx-auto container-padding text-center">
            <div className="flex items-center justify-center space-x-4">
              <Zap className="h-6 w-6" />
              <span className="text-lg font-bold">🔥 LIMITED TIME: 80% OFF ALL PLANS!</span>
              <Zap className="h-6 w-6" />
            </div>
            <div className="mt-2 flex items-center justify-center space-x-2 text-sm">
              <Clock className="h-4 w-4" />
              <span>Offer ends in: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</span>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <section className="section-spacing">
        <div className="max-w-6xl mx-auto container-padding text-center">
          <div className="fade-in">
            {!offerExpired && (
              <div className="mb-4">
                <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-bold animate-bounce pulse-glow">
                  🚀 FLASH SALE: 80% OFF - SAVE HUNDREDS!
                </span>
              </div>
            )}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 rotate-in">Clear pricing. Real value.</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 slide-up" style={{ animationDelay: '0.3s' }}>
              Transparent pricing with no hidden fees. Choose the plan that fits your business needs, 
              or let's create a custom solution together.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto container-padding">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative hover-lift transition-all duration-500 bounce-in group ${
                  plan.popular ? 'border-primary shadow-strong pulse-glow' : ''
                }`}
                style={{ animationDelay: `${0.5 + index * 0.2}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium flex items-center">
                      <Star className="h-4 w-4 mr-2" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                   <div className="mt-4 space-y-2">
                     {plan.originalPrice !== "Quote" ? (
                       <>
                         {!offerExpired ? (
                           <>
                             <div className="flex items-center justify-center space-x-2">
                               <span className="text-2xl text-muted-foreground line-through">{plan.originalPrice}</span>
                               <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">80% OFF</span>
                             </div>
                             <div className="text-4xl font-bold text-green-600">{plan.discountedPrice}</div>
                             <div className="text-sm text-muted-foreground">Save {parseInt(plan.originalPrice.replace(/[^0-9]/g, '')) - parseInt(plan.discountedPrice.replace(/[^0-9]/g, ''))}€!</div>
                           </>
                         ) : (
                           <div className="text-4xl font-bold">{plan.originalPrice}</div>
                         )}
                       </>
                     ) : (
                       <>
                         <span className="text-4xl font-bold">{plan.originalPrice}</span>
                         {!offerExpired && (
                           <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold inline-block">
                             {plan.discountedPrice}
                           </div>
                         )}
                       </>
                     )}
                     {plan.originalPrice !== "Quote" && <span className="text-muted-foreground text-sm block">starting from</span>}
                   </div>
                  <CardDescription className="text-base mt-2">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    variant={plan.popular ? "premium" : "outline"} 
                    className={`w-full ${plan.popular ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800' : ''}`}
                    asChild
                  >
                    <Link to="/contact" className="flex items-center justify-center">
                      {plan.cta}
                      {plan.popular && <Zap className="ml-2 h-4 w-4" />}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Urgency Message */}
          {!offerExpired && (
            <div className="mt-12 text-center">
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-6">
                <div className="flex items-center justify-center space-x-2 text-red-600 mb-3">
                  <Clock className="h-5 w-5" />
                  <span className="font-bold text-lg">Limited Time Offer!</span>
                </div>
                <p className="text-red-700 font-medium">
                  This 80% discount is only available for the next 7 days. Don't miss out on this incredible opportunity to get a professional website at an unbeatable price!
                </p>
                <div className="mt-4 grid grid-cols-4 gap-4 max-w-md mx-auto">
                  {[
                    { label: 'Days', value: timeLeft.days },
                    { label: 'Hours', value: timeLeft.hours },
                    { label: 'Minutes', value: timeLeft.minutes },
                    { label: 'Seconds', value: timeLeft.seconds }
                  ].map((time, index) => (
                    <div key={index} className="bg-red-600 text-white rounded-lg p-3">
                      <div className="text-2xl font-bold">{time.value}</div>
                      <div className="text-xs">{time.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <div className="bg-muted/30 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">All Plans Include</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
                {[
                  "Fast loading times",
                  "Mobile responsive",
                  "SEO optimized",
                  "Secure hosting ready"
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  question: "What's included in the support?",
                  answer: "Technical support, minor content updates, bug fixes, and guidance on using your new website."
                },
                {
                  question: "How long does it take?",
                  answer: "Starter projects: 3-5 days. Pro projects: 1-2 weeks. Custom projects vary based on complexity."
                },
                {
                  question: "Do you provide hosting?",
                  answer: "We prepare your website for easy deployment. We can recommend hosting providers or help with setup."
                },
                {
                  question: "Can I make changes later?",
                  answer: "Yes! We build websites that are easy to update, and we provide training. Additional changes can be quoted separately."
                }
              ].map((faq, index) => (
                <Card key={index} className="hover-glow">
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          {!offerExpired ? (
            <div className="text-center mt-16 p-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl text-white relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                80% OFF
              </div>
              <h3 className="text-2xl font-bold mb-4">🔥 Don't Miss This Limited-Time Offer!</h3>
              <p className="mb-6 opacity-90 max-w-2xl mx-auto">
                Get 80% off any plan for the next 7 days only! This is the perfect time to start your project 
                and save hundreds of euros. Act fast - this deal won't last long!
              </p>
              <Button variant="accent" size="lg" asChild className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
                <Link to="/contact" className="flex items-center">
                  Claim Your 80% Discount Now!
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          ) : (
            <div className="text-center mt-16 p-8 bg-gradient-to-r from-primary to-primary/80 rounded-2xl text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h3>
              <p className="mb-6 opacity-90 max-w-2xl mx-auto">
                Let's discuss your project requirements and create something amazing together. 
                Contact us for a personalized quote and consultation.
              </p>
              <Button variant="accent" size="lg" asChild className="bg-white hover:bg-gray-100 text-primary font-bold">
                <Link to="/contact" className="flex items-center">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>
      </div>
    </>
  );
};

export default Pricing;