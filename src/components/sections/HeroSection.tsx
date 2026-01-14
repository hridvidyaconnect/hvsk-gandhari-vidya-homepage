import { motion } from "framer-motion";
import { MapPin, Users, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-meditation.jpg";
import locationImage from "@/assets/ssth-location.jpg";
import EnrollButton from "@/components/EnrollButton";
import BatchInfo from "@/components/BatchInfo";
import { workshopDetails } from "@/config/workshopData";

const HeroSection = () => {
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
      <div className="container mx-auto px-4 relative z-10 py-24">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Kendra Name */}
            <p className="text-accent font-medium tracking-widest uppercase mb-4">
              Hrid Vidya Samskriti Kendra
            </p>

            {/* Main Headline */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Awaken the Inner Vision:{" "}
              <span className="text-accent">Gandhari Vidya</span> for Children
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-primary-foreground/90 font-light leading-relaxed mb-8 max-w-3xl">
              A Path of the ancient Rishi Parampara where intuition becomes ability 
              and awareness becomes strength.
            </p>

            {/* Details */}
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-3 py-2 rounded-full text-sm sm:text-base sm:px-4">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                <span className="text-primary-foreground font-medium">
                  {workshopDetails.format}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-3 py-2 rounded-full text-sm sm:text-base sm:px-4">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                <span className="text-primary-foreground font-medium">
                  Age Group: {workshopDetails.ageGroup}
                </span>
              </div>
            </div>
          </motion.div>

          {/* CTA and Batch Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="flex flex-col lg:flex-row items-start gap-6">
              <EnrollButton 
                variant="hero" 
                size="xl" 
                text={`Enroll for ${workshopDetails.duration}`}
              />
              <BatchInfo variant="dark" showTitle={false} />
            </div>

            {/* Location */}
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 bg-primary-foreground/10 backdrop-blur-sm p-3 sm:p-4 rounded-xl max-w-2xl">
              <img
                src={locationImage}
                alt="Shivaratnapuri Temple of Health"
                className="w-full sm:w-24 h-32 sm:h-24 md:w-32 md:h-24 object-cover rounded-lg shadow-lg"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-accent mb-1">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="font-semibold text-sm sm:text-base">Workshop Location</span>
                </div>
                <p className="text-primary-foreground/90 text-sm md:text-base break-words">
                  {workshopDetails.location}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
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