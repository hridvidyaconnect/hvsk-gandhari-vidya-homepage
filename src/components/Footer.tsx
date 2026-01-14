import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground py-12">
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
    </footer>
  );
};

export default Footer;
