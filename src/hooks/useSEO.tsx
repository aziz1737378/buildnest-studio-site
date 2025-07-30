import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article' | 'product' | 'service';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
}

export const useSEO = (config: SEOConfig = {}) => {
  const location = useLocation();
  
  useEffect(() => {
    // Track page views for analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('config', 'G-D1FJKDK9RS', {
        page_title: config.title,
        page_location: window.location.href,
        page_path: location.pathname
      });
    }
    
    // Update meta tags dynamically if needed
    if (config.description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', config.description);
      }
    }
    
    // Scroll to top on route change for better UX
    window.scrollTo(0, 0);
    
  }, [location.pathname, config.title, config.description]);
  
  // Generate SEO-friendly URL slug
  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };
  
  // Generate structured data for specific content types
  const generateStructuredData = (type: string, data: any) => {
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": type,
      "url": window.location.href,
      "name": data.name || config.title,
      "description": data.description || config.description,
      "image": data.image || config.image,
      "datePublished": data.publishedTime || config.publishedTime,
      "dateModified": data.modifiedTime || config.modifiedTime,
      "author": {
        "@type": "Organization",
        "name": "Buildnest",
        "url": "https://buildnest.it"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Buildnest",
        "logo": {
          "@type": "ImageObject",
          "url": "https://buildnest.it/buildnest-logo.png"
        }
      }
    };
    
    return baseSchema;
  };
  
  // Check if current page should be indexed
  const shouldIndex = (): boolean => {
    const noIndexPaths = ['/auth', '/admin', '/404'];
    return !noIndexPaths.some(path => location.pathname.startsWith(path));
  };
  
  // Generate page-specific meta tags
  const getPageMetaData = () => {
    const defaultMeta = {
      title: "Buildnest - Premium Web & App Development Agency",
      description: "Professional web development services in Italy. Custom websites, apps, and digital solutions for businesses worldwide.",
      keywords: "web development, app development, digital agency, Italy, Tricase"
    };
    
    const pageSpecificMeta: Record<string, typeof defaultMeta> = {
      '/services': {
        title: "Our Services - Web Development & App Creation",
        description: "Professional web development services including business websites, custom apps, landing pages, e-commerce solutions, and digital tools.",
        keywords: "web development services, custom apps, landing pages, e-commerce, digital solutions"
      },
      '/portfolio': {
        title: "Portfolio - Our Best Web Development Projects",
        description: "Explore our portfolio of premium websites and applications. See examples of our web development work for businesses and startups.",
        keywords: "web development portfolio, website examples, app development showcase, digital projects"
      },
      '/process': {
        title: "Our Development Process - From Idea to Launch",
        description: "Learn about our proven web development process. From consultation to launch, see how we bring your digital ideas to life.",
        keywords: "web development process, project timeline, development methodology, consultation"
      },
      '/pricing': {
        title: "Pricing - Affordable Web Development Packages",
        description: "Transparent pricing for web development services. Choose from our starter, pro, or custom packages for websites and apps.",
        keywords: "web development pricing, website cost, app development price, development packages"
      },
      '/contact': {
        title: "Contact Us - Start Your Web Development Project",
        description: "Ready to start your project? Contact our web development team for a free consultation and quote. Based in Tricase, Italy.",
        keywords: "contact web developer, free consultation, project quote, Tricase web development"
      }
    };
    
    return pageSpecificMeta[location.pathname] || defaultMeta;
  };
  
  return {
    generateSlug,
    generateStructuredData,
    shouldIndex,
    getPageMetaData,
    currentPath: location.pathname
  };
};

// Global SEO utilities
export const SEOUtils = {
  // Optimize images for SEO
  optimizeImage: (src: string, alt: string, title?: string) => ({
    src,
    alt,
    title: title || alt,
    loading: 'lazy' as const,
    decoding: 'async' as const
  }),
  
  // Generate rich text snippets
  generateRichSnippet: (type: string, data: Record<string, any>) => {
    return {
      "@context": "https://schema.org",
      "@type": type,
      ...data
    };
  },
  
  // SEO-friendly link attributes
  externalLink: (href: string) => ({
    href,
    target: '_blank',
    rel: 'noopener noreferrer',
    'aria-label': `Visit ${href} (opens in new tab)`
  }),
  
  // Internal link with SEO benefits
  internalLink: (to: string, text: string) => ({
    to,
    'aria-label': text,
    title: text
  })
};