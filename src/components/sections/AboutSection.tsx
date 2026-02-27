import { motion } from "framer-motion";
import { Heart, Sparkles, Eye } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-gradient-section relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-light/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sage/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Section Title */}
          <div className="text-center mb-12">
            <span className="text-primary font-medium tracking-widest uppercase text-sm">
              Our Foundation
            </span>
            <a href="#about" className="no-underline hover:no-underline">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 hover:opacity-80 transition-opacity cursor-pointer">
                What is <span className="text-primary">Hrid Vidya Samskriti Kendra</span>?
              </h2>
            </a>
          </div>

          {/* Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-2xl p-8 md:p-12 shadow-card border border-border"
          >
            <div className="flex gap-4 mb-6">
              {[Heart, Sparkles, Eye].map((Icon, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="w-12 h-12 bg-teal-light rounded-full flex items-center justify-center"
                >
                  <Icon className="w-6 h-6 text-primary" />
                </motion.div>
              ))}
            </div>

            <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6">
              Every child is born with an inbuilt sixth sense ability, but without guidance
              this capability remains unused and fades away. Children in their young age are
              in the best capacity to hone their senses.
            </p>

            <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6">
              At <span className="font-semibold text-primary">Hrid Vidya Samskriti Kendra</span>,
              we aim to gently activate this innate potential that exists in every child, using
              <span className="font-semibold text-accent"> Gandhari Vidya</span>, a powerful tool
              on the path of Raja Vidya.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
