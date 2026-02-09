import { motion } from "framer-motion";
import { Heart, Sparkles, Instagram, Facebook, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formLinks } from "@/config/workshopData";

const Footer = () => {
  return (
    <footer className="bg-foreground">
      {/* Static CTA Ribbon - appears above footer content */}
      <div
        className="shadow-2xl border-t-2 border-accent/50"
        style={{ background: 'linear-gradient(to right, hsl(270 60% 25%), hsl(270 55% 35%), hsl(270 60% 25%))' }}
      >
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-row items-center justify-between gap-2 sm:gap-3">
            {/* Left: Limited Seats */}
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
            </div>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            {/* Logo/Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <h3 className="font-serif text-2xl font-bold text-background mb-2">
                Hrid Vidya Samskriti Kendra
              </h3>
              <p className="text-background/60 text-sm">
                Awakening the Inner Vision in Every Child
              </p>
            </motion.div>

            {/* Social Media Links */}
            <div className="flex items-center justify-center gap-6 mb-6">
              <a
                href="https://www.instagram.com/hridvidya/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/60 hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.facebook.com/people/Hrid-Vidya-Sanskriti-Kendra/61584837778134/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/60 hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://www.youtube.com/@HridVidya"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/60 hover:text-accent transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-6 h-6" />
              </a>
              <a
                href="https://whatsapp.com/channel/0029Vb7LKbf0wgzRW9ign2U"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/60 hover:text-accent transition-colors"
                aria-label="WhatsApp Channel"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-20 bg-background/20" />
              <Sparkles className="w-5 h-5 text-accent" />
              <div className="h-px w-20 bg-background/20" />
            </div>

            {/* Copyright */}
            <p className="text-background/50 text-sm flex items-center justify-center gap-1">
              Made with <Heart className="w-4 h-4 text-accent fill-accent" /> for children's growth
            </p>
            <p className="text-background/40 text-xs mt-2">
              © {new Date().getFullYear()} Hrid Vidya Samskriti Kendra. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
