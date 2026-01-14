import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { formLinks } from "@/config/workshopData";
import { Sparkles, X, Clock } from "lucide-react";

const FloatingRibbon = () => {
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes in seconds
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {hasScrolled && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 shadow-2xl border-t-2 border-accent/50"
          style={{ background: 'linear-gradient(to right, hsl(270 60% 25%), hsl(270 55% 35%), hsl(270 60% 25%))' }}
        >
          <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
            <div className="flex flex-row items-center justify-between gap-2 sm:gap-3">
              {/* Left: Limited Seats + Timer */}
              <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex items-center gap-1 sm:gap-2 bg-accent/30 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full flex-shrink-0"
                >
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
                  <span className="text-white font-bold text-xs sm:text-sm uppercase tracking-wide whitespace-nowrap">
                    Limited Seats
                  </span>
                </motion.div>
                
                <div className="hidden xs:flex items-center gap-1 sm:gap-2 text-white">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-accent flex-shrink-0" />
                  <span className="hidden sm:inline text-sm font-medium">Register in:</span>
                  <motion.span
                    key={timeLeft}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="font-mono font-bold text-accent text-sm sm:text-lg"
                  >
                    {formatTime(timeLeft)}
                  </motion.span>
                </div>
              </div>

              {/* Right: CTA Button */}
              <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
                <Button
                  variant="urgent"
                  size="sm"
                  asChild
                  className="rounded-full text-xs sm:text-sm px-3 sm:px-4 whitespace-nowrap"
                >
                  <a href={formLinks.enrollment} target="_blank" rel="noopener noreferrer">
                    Enroll Now
                    <Sparkles className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                  </a>
                </Button>
                
                <button
                  onClick={() => setIsVisible(false)}
                  className="text-white/60 hover:text-white transition-colors p-1"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingRibbon;
