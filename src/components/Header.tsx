import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formLinks } from "@/config/workshopData";
import logoImage from "@/assets/logo.png";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Gandhari Vidya", href: "#masterclass" },
  { label: "Benefits", href: "#benefits" },
  { label: "Guide", href: "#founder" },
  { label: "Reviews", href: "#testimonials" },
  { label: "FAQs", href: "#faq" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", href);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-soft"
          : "bg-transparent"
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`flex items-center gap-3 transition-all duration-500 ${isScrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
                }`}
            >
              <img
                src={logoImage}
                alt="Hrid Vidya Samskriti Kendra Logo"
                className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
              />
              <span className={`font-display text-base sm:text-lg font-semibold hidden sm:block ${isScrolled ? "text-foreground" : "text-primary-foreground"}`}>
                Hrid Vidya Samskriti Kendra
              </span>
            </a>

            {/* Desktop Navigation - Fade in when scrolled */}
            <nav className={`hidden lg:flex items-center gap-8 transition-all duration-700 ease-out ${isScrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={isScrolled ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="text-base font-medium text-foreground transition-colors hover:text-accent"
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>

            {/* CTA Button - Fade in when scrolled */}
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, y: -10 }}
              animate={isScrolled ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button variant="gold" size="default" asChild>
                <a href={formLinks.enrollment} target="_blank" rel="noopener noreferrer">
                  Enroll Now
                </a>
              </Button>
            </motion.div>

            {/* Mobile Menu Button - Only visible when scrolled */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              initial={{ opacity: 0, y: -10 }}
              animate={isScrolled ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className={`lg:hidden p-2 ${isScrolled ? "text-foreground" : "pointer-events-none text-primary-foreground"}`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween" }}
              className="absolute top-0 right-0 h-full w-80 bg-background shadow-2xl p-8 pt-24"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="text-left text-lg font-medium text-foreground hover:text-primary py-2 border-b border-border"
                  >
                    {link.label}
                  </button>
                ))}
                <Button variant="gold" size="lg" className="mt-4" asChild>
                  <a href={formLinks.enrollment} target="_blank" rel="noopener noreferrer">
                    Enroll Now
                  </a>
                </Button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;