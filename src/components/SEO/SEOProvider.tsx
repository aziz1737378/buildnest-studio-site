import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface SEOProviderProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  children?: React.ReactNode;
}

export const SEOProvider = ({
  title,
  description,
  keywords,
  image = "https://buildnest.it/buildnest-logo.png",
  type = "website",
  publishedTime,
  modifiedTime,
  author = "Buildnest",
  section,
  children
}: SEOProviderProps) => {
  const location = useLocation();
  const currentUrl = `https://buildnest.it${location.pathname}`;
  
  // Enhanced title with proper hierarchy
  const fullTitle = title 
    ? `${title} | Buildnest - Premium Web & App Development Agency`
    : "Buildnest - Premium Web & App Development Agency | Professional Websites & Apps";
  
  // Enhanced description with location-specific content
  const enhancedDescription = description || 
    "Buildnest is Italy's premium digital agency in Tricase, creating fast, elegant websites and custom apps for businesses worldwide. Expert web development, app development, and digital solutions.";

  // Enhanced keywords with location and service terms
  const enhancedKeywords = keywords || 
    "Buildnest, web development Italy, app development Tricase, website design Puglia, digital agency Italy, custom web applications, mobile app development, e-commerce solutions, landing pages, SEO optimization, responsive design, React development, modern web design, Italian web agency, Tricase web developer, business websites";

  // Generate structured data based on page type
  const generateStructuredData = () => {
    const baseOrganization = {
      "@context": "https://schema.org",
      "@type": "WebDevelopmentCompany",
      "name": "Buildnest",
      "alternateName": "Buildnest Web Development",
      "url": "https://buildnest.it",
      "logo": "https://buildnest.it/buildnest-logo.png",
      "image": "https://buildnest.it/buildnest-logo.png",
      "description": enhancedDescription,
      "founder": {
        "@type": "Person",
        "name": "Abdul Aziz Azeem",
        "jobTitle": "Founder & Lead Developer"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Tricase",
        "addressRegion": "Puglia",
        "addressCountry": "IT",
        "postalCode": "73039"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+393297438979",
        "contactType": "customer service",
        "email": "info@buildnest.it",
        "availableLanguage": ["English", "Italian", "Arabic"]
      },
      "sameAs": [
        "https://instagram.com/buildnest_development",
        "https://github.com/buildnest"
      ],
      "serviceArea": {
        "@type": "Place",
        "name": "Worldwide"
      },
      "priceRange": "€€€",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Web Development Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Website Development",
              "description": "Custom business websites with modern design and SEO optimization"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "App Development",
              "description": "Custom web and mobile applications for businesses"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "E-commerce Solutions",
              "description": "Online stores and e-commerce platforms"
            }
          }
        ]
      }
    };

    // Page-specific structured data
    if (location.pathname === "/services") {
      return {
        ...baseOrganization,
        "@type": "Service",
        "serviceType": "Web Development Services",
        "offers": [
          {
            "@type": "Offer",
            "name": "Starter Website Package",
            "price": "499",
            "priceCurrency": "EUR",
            "description": "Professional website for small businesses"
          },
          {
            "@type": "Offer",
            "name": "Pro Website Package",
            "price": "999",
            "priceCurrency": "EUR",
            "description": "Advanced website with custom features"
          }
        ]
      };
    }

    if (location.pathname === "/portfolio") {
      return {
        ...baseOrganization,
        "@type": "CreativeWork",
        "about": "Portfolio of web development projects",
        "workExample": [
          {
            "@type": "WebSite",
            "name": "Clandestino 13",
            "url": "https://buildnest.it/portfolio",
            "description": "Premium restaurant website with modern design"
          }
        ]
      };
    }

    return baseOrganization;
  };

  return (
    <Helmet>
      {/* Enhanced Title */}
      <title>{fullTitle}</title>
      
      {/* Core Meta Tags */}
      <meta name="description" content={enhancedDescription} />
      <meta name="keywords" content={enhancedKeywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Alternate hreflang for internationalization */}
      <link rel="alternate" hrefLang="en" href={currentUrl} />
      <link rel="alternate" hrefLang="it" href={currentUrl} />
      <link rel="alternate" hrefLang="x-default" href={currentUrl} />
      
      {/* Enhanced Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={enhancedDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Buildnest - Premium Web Development Agency" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Buildnest" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="it_IT" />
      
      {/* Article-specific Open Graph */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}
      {section && <meta property="article:section" content={section} />}
      
      {/* Enhanced Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@buildnest_dev" />
      <meta name="twitter:creator" content="@buildnest_dev" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={enhancedDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="Buildnest - Premium Web Development Agency" />
      
      {/* LinkedIn-specific meta tags */}
      <meta property="linkedin:owner" content="buildnest" />
      
      {/* Pinterest-specific meta tags */}
      <meta name="pinterest-rich-pin" content="true" />
      
      {/* Enhanced Business Schema */}
      <script type="application/ld+json">
        {JSON.stringify(generateStructuredData())}
      </script>
      
      {/* Breadcrumb Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://buildnest.it/"
            },
            ...(location.pathname !== "/" ? [{
              "@type": "ListItem",
              "position": 2,
              "name": title || "Page",
              "item": currentUrl
            }] : [])
          ]
        })}
      </script>
      
      {/* Website Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Buildnest",
          "alternateName": "Buildnest Web Development Agency",
          "url": "https://buildnest.it",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://buildnest.it/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })}
      </script>
      
      {/* Performance and Security Headers */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      
      {/* Prefetch DNS for external resources */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      
      {children}
    </Helmet>
  );
};