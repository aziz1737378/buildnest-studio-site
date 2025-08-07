import { Link } from "react-router-dom";
import { Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Process", href: "/process" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto container-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <img 
                src="/lovable-uploads/9cb14db2-4ac6-4a31-8739-464c9930d303.png" 
                alt="Buildnest Logo" 
                className="w-8 h-8 rounded-lg"
              />
              <span className="text-xl font-bold">Buildnest</span>
            </Link>
            <p className="text-primary-foreground/80 mb-6 max-w-md">
              Modern digital studio creating fast, elegant websites and apps 
              for businesses worldwide. Based in Italy, serving globally.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/buildnest_development" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com/company/buildnest" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-primary-foreground/80">
              <div>
                <a href="mailto:info@buildnest.it" className="hover:text-primary-foreground transition-colors">
                  info@buildnest.it
                </a>
              </div>
              <div>
                <a href="https://wa.me/393792649756" className="hover:text-primary-foreground transition-colors">
                  +39 379 264 9756
                </a>
              </div>
              <div>
                Italy 🇮🇹
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/60 text-sm">
            © {currentYear} Buildnest. All rights reserved.
          </p>
          <p className="text-primary-foreground/60 text-sm mt-4 md:mt-0">
            Made with ❤️ in Italy
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;