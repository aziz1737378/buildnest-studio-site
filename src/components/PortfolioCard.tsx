import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollAnimatedDiv } from "@/hooks/useScrollAnimation";
import { useTranslation } from 'react-i18next';

interface PortfolioCardProps {
  title: string;
  description: string;
  emoji: string;
  url: string;
  projectScope: string[];
  technologies: string[];
  isUpcoming?: boolean;
  delay?: number;
}

export const PortfolioCard = ({ 
  title, 
  description, 
  emoji, 
  url, 
  projectScope, 
  technologies, 
  isUpcoming = false,
  delay = 0 
}: PortfolioCardProps) => {
  const { t } = useTranslation();

  return (
    <ScrollAnimatedDiv animation="fade-in-up" delay={delay} duration="duration-1000" easing="ease-out">
      <Card className="overflow-hidden hover-lift transition-all duration-700">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative bg-gray-100 overflow-hidden group">
            <div className="absolute top-4 left-4 z-10">
              <span className={`px-3 py-1 rounded-full text-sm font-medium bounce-in ${
                isUpcoming 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-primary text-primary-foreground'
              }`} style={{ animationDelay: '0.8s' }}>
                {isUpcoming ? t('portfolio.comingSoon') : t('portfolio.livePreview')}
              </span>
            </div>
            
            {isUpcoming ? (
              <div className="w-full h-[400px] flex items-center justify-center bg-gradient-to-br from-muted to-muted/70">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4 scale-in" style={{ animationDelay: '1s' }}>{emoji}</div>
                  <h3 className="text-2xl font-bold mb-2 text-muted-foreground slide-in-right" style={{ animationDelay: '1.2s' }}>
                    {t('portfolio.comingSoon')}
                  </h3>
                  <p className="text-muted-foreground/70 fade-in" style={{ animationDelay: '1.4s' }}>
                    {t('portfolio.previewAvailable')}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <iframe 
                  src={url} 
                  title={`${title} Live Preview`}
                  className="w-full h-[400px] border-0 transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-top-navigation allow-popups allow-popups-to-escape-sandbox"
                  referrerPolicy="no-referrer-when-downgrade"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  onLoad={() => console.log(`${title} iframe loaded successfully`)}
                  onError={() => console.log(`${title} iframe failed to load`)}
                />
                <div className="absolute bottom-4 right-4 z-10">
                  <a 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-black/80 text-white px-3 py-1 rounded-full text-xs hover:bg-black/90 transition-all duration-300 flex items-center hover:scale-110"
                  >
                    {t('portfolio.openFullSite')}
                    <ExternalLink className="ml-1 h-3 w-3 transition-transform duration-300 hover:translate-x-1" />
                  </a>
                </div>
              </>
            )}
          </div>
          
          <div className="p-8 flex flex-col justify-center">
            <div className="mb-6">
              <div className="text-4xl mb-4 scale-in" style={{ animationDelay: '1s' }}>{emoji}</div>
              <h3 className="text-3xl font-bold mb-2 slide-in-right" style={{ animationDelay: '1.2s' }}>{title}</h3>
              <p className="text-muted-foreground mb-4 fade-in" style={{ animationDelay: '1.4s' }}>
                {description}
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="slide-in-left" style={{ animationDelay: '1.6s' }}>
                <h4 className="font-semibold mb-2">{t('portfolio.projectScope')}</h4>
                <ul className="space-y-1 text-muted-foreground">
                  {projectScope.map((item, index) => (
                    <li 
                      key={index} 
                      className="fade-in transition-all duration-300 hover:translate-x-2 hover:text-foreground" 
                      style={{ animationDelay: `${1.8 + index * 0.1}s` }}
                    >
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="slide-in-right" style={{ animationDelay: '2.2s' }}>
                <h4 className="font-semibold mb-2">{t('portfolio.technologies')}</h4>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <span 
                      key={tech} 
                      className="bg-muted px-3 py-1 rounded-full text-sm bounce-in hover:scale-110 transition-transform duration-300" 
                      style={{ animationDelay: `${2.4 + index * 0.1}s` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {isUpcoming ? (
                <Button variant="outline" disabled className="slide-in-left opacity-60" style={{ animationDelay: '2.8s' }}>
                  <span className="flex items-center">
                    {t('portfolio.launchingSoon')}
                  </span>
                </Button>
              ) : (
                <Button variant="premium" asChild className="slide-in-left hover:scale-105 transition-transform duration-300" style={{ animationDelay: '2.8s' }}>
                  <a 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center group"
                  >
                    {t('portfolio.viewLiveSite')}
                    <ExternalLink className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </Button>
              )}
              <Button variant="outline" asChild className="slide-in-right hover:scale-105 transition-transform duration-300" style={{ animationDelay: '3s' }}>
                <Link to="/contact">{t('portfolio.requestSimilar')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </ScrollAnimatedDiv>
  );
};