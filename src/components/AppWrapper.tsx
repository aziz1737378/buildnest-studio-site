import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import ScrollToTop from "@/components/ScrollToTop";
import AirplaneTransition from "@/components/AirplaneTransition";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Services from "../pages/Services";
import Portfolio from "../pages/Portfolio";
import Process from "../pages/Process";
import Pricing from "../pages/Pricing";
import Contact from "../pages/Contact";
import Auth from "../pages/Auth";
import Admin from "../pages/Admin";
import NotFound from "../pages/NotFound";

interface AppWrapperProps {
  showSplash: boolean;
}

const AppWrapper = ({ showSplash }: AppWrapperProps) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextLocation, setNextLocation] = useState(location.pathname);
  const [currentLocation, setCurrentLocation] = useState(location.pathname);

  useEffect(() => {
    if (showSplash) return; // Don't trigger transitions during splash screen
    
    if (location.pathname !== currentLocation) {
      setNextLocation(location.pathname);
      setIsTransitioning(true);
    }
  }, [location.pathname, currentLocation, showSplash]);

  const handleTransitionComplete = () => {
    setCurrentLocation(nextLocation);
    setIsTransitioning(false);
  };

  return (
    <>
      <ScrollToTop />
      <AirplaneTransition 
        isTransitioning={isTransitioning} 
        onComplete={handleTransitionComplete} 
      />
      <div className={`flex flex-col min-h-screen transition-opacity duration-500 ${showSplash ? 'opacity-0' : 'opacity-100'}`}>
        <Navigation />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/process" element={<Process />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AppWrapper;