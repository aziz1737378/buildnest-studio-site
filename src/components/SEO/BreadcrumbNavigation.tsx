import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

export const BreadcrumbNavigation = () => {
  const location = useLocation();
  
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathnames = location.pathname.split('/').filter(Boolean);
    
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/' }
    ];
    
    const routeLabels: Record<string, string> = {
      'services': 'Our Services',
      'portfolio': 'Portfolio',
      'process': 'Our Process',
      'pricing': 'Pricing',
      'contact': 'Contact Us',
      'auth': 'Authentication',
      'admin': 'Admin Panel'
    };
    
    pathnames.forEach((pathname, index) => {
      const href = '/' + pathnames.slice(0, index + 1).join('/');
      const label = routeLabels[pathname] || pathname.charAt(0).toUpperCase() + pathname.slice(1);
      
      breadcrumbs.push({
        label,
        href,
        current: index === pathnames.length - 1
      });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbs = generateBreadcrumbs();
  
  // Don't show breadcrumbs on home page
  if (location.pathname === '/') {
    return null;
  }
  
  return (
    <nav 
      className="flex items-center space-x-2 text-sm text-muted-foreground mb-8 px-6 lg:px-8 xl:px-12"
      aria-label="Breadcrumb navigation"
    >
      <div className="flex items-center space-x-2">
        {breadcrumbs.map((breadcrumb, index) => (
          <div key={breadcrumb.href} className="flex items-center space-x-2">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-muted-foreground/50 shrink-0" />
            )}
            {breadcrumb.current ? (
              <span 
                className="font-medium text-foreground"
                aria-current="page"
              >
                {index === 0 && <Home className="h-4 w-4 inline mr-1" />}
                {breadcrumb.label}
              </span>
            ) : (
              <Link
                to={breadcrumb.href}
                className={cn(
                  "hover:text-foreground transition-colors duration-200 flex items-center",
                  index === 0 && "hover:text-primary"
                )}
              >
                {index === 0 && <Home className="h-4 w-4 mr-1" />}
                {breadcrumb.label}
              </Link>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};