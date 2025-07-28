import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Process", href: "/process" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-background/90 backdrop-blur-lg border-b border-border z-50">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/8c742d80-79be-4034-a8e1-083fb8cfa74a.png" 
              alt="Buildnest Logo" 
              className="w-8 h-8 object-contain"
            />
            <span className="text-xl font-bold">Buildnest</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
            <Button variant="premium" size="sm" asChild>
              <Link to="/contact">Start Project</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted/50 transition-all duration-300 hover:scale-110"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="transition-transform duration-300">
              {isOpen ? (
                <X size={24} className="animate-in rotate-in-180 duration-300" />
              ) : (
                <Menu size={24} className="animate-in fade-in duration-300" />
              )}
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={cn(
            "md:hidden absolute top-full left-0 right-0 transition-all duration-500 ease-out transform-gpu",
            isOpen 
              ? "opacity-100 translate-y-0 pointer-events-auto" 
              : "opacity-0 -translate-y-4 pointer-events-none"
          )}
        >
          <div className="bg-background/95 backdrop-blur-xl border-b border-border shadow-lg">
            <div className="max-w-7xl mx-auto container-padding py-4">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "block px-4 py-3 text-base font-medium rounded-xl mb-2 transition-all duration-300 transform-gpu",
                    "hover:bg-muted/50 hover:scale-[1.02] hover:shadow-sm",
                    location.pathname === item.href
                      ? "text-primary bg-primary/10 border border-primary/20"
                      : "text-muted-foreground hover:text-primary",
                    isOpen && "animate-[slide-up_0.4s_ease-out_forwards]"
                  )}
                  style={{ 
                    animationDelay: `${index * 80}ms`,
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'translateY(0)' : 'translateY(20px)'
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="mt-4">
                <Button 
                  variant="premium" 
                  size="sm" 
                  className={cn(
                    "w-full transition-all duration-300 transform-gpu hover:scale-[1.02] hover:shadow-lg",
                    isOpen && "animate-[slide-up_0.4s_ease-out_forwards]"
                  )}
                  style={{ 
                    animationDelay: `${navItems.length * 80}ms`,
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'translateY(0)' : 'translateY(20px)'
                  }}
                  asChild
                >
                  <Link to="/contact">Start Project</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;