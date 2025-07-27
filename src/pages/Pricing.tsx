import { Link } from "react-router-dom";
import { Check, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "€299",
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
      price: "€599",
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
      price: "Quote",
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
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="section-spacing">
        <div className="max-w-6xl mx-auto container-padding text-center">
          <div className="fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Clear pricing. Real value.</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
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
                className={`relative hover-glow transition-all duration-300 hover:scale-105 slide-up ${
                  plan.popular ? 'border-primary shadow-strong' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
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
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "Quote" && <span className="text-muted-foreground ml-2">starting from</span>}
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
                    className="w-full" 
                    asChild
                  >
                    <Link to="/contact">
                      {plan.cta}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

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
          <div className="text-center mt-16 p-8 bg-gradient-to-r from-primary to-tech-blue rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h3>
            <p className="mb-6 opacity-90 max-w-2xl mx-auto">
              Let's discuss your needs and find the perfect solution for your business. 
              Get a free consultation and detailed quote.
            </p>
            <Button variant="accent" size="lg" asChild>
              <Link to="/contact" className="flex items-center">
                Get Your Free Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;