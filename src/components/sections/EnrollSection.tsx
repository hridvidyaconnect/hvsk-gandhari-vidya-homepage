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

          {/* Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-primary-foreground/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-primary-foreground/20"
          >
            {/* Workshop Details */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Format</p>
                  <p className="font-medium">{workshopDetails.format}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Age Group</p>
                  <p className="font-medium">{workshopDetails.ageGroup}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Duration</p>
                  <p className="font-medium">8 Days (Weekends)</p>
                </div>
              </div>
            </div>

            {/* Batch Information */}
            <div className="mb-10">
              <BatchInfo variant="dark" showTitle={true} />
            </div>

            {/* CTA */}
            <div className="text-center">
              <EnrollButton
                variant="hero"
                size="xl"
                text="Enroll Now & Reserve Your Seat"
              />
              <p className="text-white/60 text-sm mt-4">
                After registration, you can choose your preferred batch and complete payment
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EnrollSection;
