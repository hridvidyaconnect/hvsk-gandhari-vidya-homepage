import { motion } from "framer-motion";
import { Calendar, Clock, Users } from "lucide-react";
import EnrollButton from "@/components/EnrollButton";
import BatchInfo from "@/components/BatchInfo";
import { workshopDetails } from "@/config/workshopData";

const EnrollSection = () => {
  return (
    <section id="enroll" className="py-24 bg-gradient-to-b from-purple to-purple-dark text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary-foreground/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-accent font-medium tracking-widest uppercase text-sm">
              Take the First Step
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2 mb-4">
              Enroll Your Child Today
            </h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Give your child the gift of inner vision and intuitive awareness.
              Limited seats available for each batch.
            </p>
          </motion.div>

          {/* Two Column Layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid lg:grid-cols-2 gap-8 lg:gap-12"
          >
            {/* Left Column: Workshop Highlights */}
            <div className="bg-primary-foreground/10 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-primary-foreground/20">
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-6">
                Workshop Highlights
              </h3>

              {/* Workshop Details */}
              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4 text-white">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Format</p>
                    <p className="font-medium text-lg">{workshopDetails.format}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-white">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Age Group</p>
                    <p className="font-medium text-lg">{workshopDetails.ageGroup}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-white">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Duration</p>
                    <p className="font-medium text-lg">6 Days of Immersive Learning</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <EnrollButton
                variant="hero"
                size="xl"
                text={<>Enroll Now<br />Reserve Your Seat</>}
                className="w-full"
              />
              <p className="text-white/60 text-sm mt-4 text-center">
                After registration, choose your preferred batch
              </p>
            </div>

            {/* Right Column: Batch Information */}
            <div className="bg-primary-foreground/10 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-primary-foreground/20">
              <BatchInfo variant="dark" showTitle={true} />

              {/* Venue Contact Info */}
              <div className="bg-black/20 rounded-xl p-4 text-center mt-6">
                <p className="text-primary-foreground/90 text-sm">
                  For Venue details and more queries, contact HVSK Kendra at{" "}
                  <a
                    href="mailto:perceptionsconnect@gmail.com"
                    className="text-accent hover:underline font-medium"
                  >
                    perceptionsconnect@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EnrollSection;
