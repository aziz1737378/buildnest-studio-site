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
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t border-border animate-slide-down">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "block px-3 py-2 text-base font-medium transition-all duration-300 hover:text-primary hover:translate-x-2 hover:bg-muted/50 rounded-lg",
                  location.pathname === item.href
                    ? "text-primary bg-muted/30"
                    : "text-muted-foreground",
                  isOpen && "animate-fade-in"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-3 py-2">
              <Button 
                variant="premium" 
                size="sm" 
                className="w-full hover:scale-105 transition-transform duration-300 animate-fade-in" 
                style={{ animationDelay: `${navItems.length * 50}ms` }}
                asChild
              >
                <Link to="/contact">Start Project</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;