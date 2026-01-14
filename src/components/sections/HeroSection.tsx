import { motion, useScroll, useTransform } from "framer-motion";
import { Users, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-meditation.jpg";
import logoImage from "@/assets/logo.png";
import ActionCard from "@/components/ActionCard";
import { workshopDetails } from "@/config/workshopData";

const HeroSection = () => {
  const { scrollY } = useScroll();
  const logoOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const logoScale = useTransform(scrollY, [0, 200], [1, 0.8]);
  const logoY = useTransform(scrollY, [0, 200], [0, -20]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Child meditating with inner vision awakened"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Decorative Elements - hidden on mobile to prevent overflow */}
      <div className="hidden md:block absolute top-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-float" />
      <div className="hidden md:block absolute bottom-40 left-10 w-40 h-40 bg-primary/30 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-12 lg:py-16">
        <div className="max-w-7xl w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Headlines & Story */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-8"
            >
              <div className="space-y-4">
                {/* Hero Logo Animation */}
                <motion.div
                  style={{ opacity: logoOpacity, scale: logoScale, y: logoY }}
                  className="origin-left"
                >
                  <img
                    src={logoImage}
                    alt="Hrid Vidya Logo"
                    className="w-28 h-28 md:w-36 md:h-36 object-contain drop-shadow-2xl"
                  />
                </motion.div>

                {/* Kendra Name */}
                <p className="text-accent font-medium tracking-widest uppercase text-base sm:text-lg">
                  Hrid Vidya Samskriti Kendra
                </p>
              </div>

              {/* Main Headline */}
              <h1 className="font-display text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
                Awaken the Inner Vision: <br />
                <span className="text-accent">Gandhari Vidya</span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-primary-foreground/90 font-light leading-relaxed max-w-2xl">
                A Path of the ancient Rishi Parampara where intuition becomes ability
                and awareness becomes strength.
              </p>

              {/* Details Tags */}
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full text-base border border-primary-foreground/10">
                  <Calendar className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-primary-foreground font-medium">
                    {workshopDetails.format}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full text-base border border-primary-foreground/10">
                  <Users className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-primary-foreground font-medium">
                    Age Group: {workshopDetails.ageGroup}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Unified Action Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-5 w-full"
            >
              <ActionCard />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-3 bg-accent rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;