import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { ScrollAnimatedDiv } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Buildnest</title>
        <meta name="description" content="Sorry, the page you're looking for doesn't exist. Return to Buildnest homepage for web development services." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 pt-20">
        <ScrollAnimatedDiv animation="bounce-in" duration="duration-1000" className="text-center max-w-lg mx-auto px-6">
          <div className="mb-8">
            <ScrollAnimatedDiv animation="scale-in" delay={200}>
              <div className="text-8xl font-bold text-primary mb-4 drop-shadow-lg">404</div>
            </ScrollAnimatedDiv>
            <ScrollAnimatedDiv animation="fade-in-up" delay={400}>
              <h1 className="text-3xl font-bold mb-4 text-foreground">Oops! Page not found</h1>
            </ScrollAnimatedDiv>
            <ScrollAnimatedDiv animation="fade-in-up" delay={600}>
              <p className="text-lg text-muted-foreground mb-8">
                The page you're looking for doesn't exist or has been moved. 
                Let's get you back on track!
              </p>
            </ScrollAnimatedDiv>
          </div>
          
          <ScrollAnimatedDiv animation="slide-in-left" delay={800} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="premium" size="lg" className="hover-scale">
              <a href="/" className="flex items-center">
                <Home className="mr-2 h-5 w-5" />
                Back to Home
              </a>
            </Button>
            <Button variant="outline" size="lg" className="hover-scale" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Back
            </Button>
          </ScrollAnimatedDiv>
          
          <ScrollAnimatedDiv animation="fade-in" delay={1000} className="mt-12">
            <div className="text-muted-foreground text-sm">
              <p>If you believe this is an error, please <a href="/contact" className="text-primary hover:underline">contact us</a></p>
            </div>
          </ScrollAnimatedDiv>
        </ScrollAnimatedDiv>
      </div>
    </>
  );
};

export default NotFound;
