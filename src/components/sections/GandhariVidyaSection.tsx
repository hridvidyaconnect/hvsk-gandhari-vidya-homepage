import { motion } from "framer-motion";
import { 
  Eye, BookOpen, Heart, Users, Brain, 
  Palette, Hash, BookText, Move, Zap, Focus 
} from "lucide-react";

const capabilities = [
  { icon: Palette, text: "Identify colors" },
  { icon: Hash, text: "Recognize numbers, shapes and symbols" },
  { icon: BookText, text: "Read books, words, flashcards using sixth-sense perception" },
  { icon: Eye, text: "Sense and describe objects and images without sight" },
  { icon: Move, text: "Move confidently with enhanced awareness and intuition" },
  { icon: Zap, text: "Sense others' actions or thoughts" },
  { icon: Focus, text: "Improve focus, memory, and emotional balance" },
];

const features = [
  { icon: Eye, text: "Aids in awakening the Third Eye Energy naturally" },
  { icon: BookOpen, text: "An intuitive and organic approach to learning that flows down our Rishi Parampara" },
  { icon: Users, text: "One-on-one Guidance with a structured course" },
  { icon: Heart, text: "Heart-to-heart transfer of knowledge" },
  { icon: Brain, text: "Fun, interactive and motivational activities" },
];

const GandhariVidyaSection = () => {
  return (
    <section id="gandhari-vidya" className="py-24 bg-card relative overflow-hidden">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-40 h-40 border-4 border-primary rounded-full" />
        <div className="absolute bottom-20 right-20 w-60 h-60 border-4 border-accent rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-20 h-20 border-4 border-primary rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium tracking-widest uppercase text-sm">
            The Science of Inner Vision
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-4">
            What is <span className="text-accent">Gandhari Vidya</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Inspired by Queen Gandhari's inner sight and yogic restraint, Gandhari Vidya 
            is a sacred practice that awakens the natural intuitive abilities within every child.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-serif text-2xl font-bold text-foreground mb-6">
              The Practice Includes:
            </h3>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-background rounded-xl border border-border hover:shadow-soft transition-shadow"
                >
                  <div className="w-10 h-10 bg-teal-light rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-foreground">{feature.text}</p>
                </motion.div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-6 p-4 bg-sage/30 rounded-xl border border-sage">
              <p className="text-muted-foreground text-sm">
                <span className="font-semibold text-foreground">Note:</span> All exercises 
                are practiced blindfolded, learning without books, mobiles or e-technology — 
                aimed at enhancing children's sensitivity, intellect, self-awareness and mindfulness.
              </p>
            </div>
          </motion.div>

          {/* Capabilities in Blindfolded State */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-serif text-2xl font-bold text-foreground mb-6">
              In a Blindfolded State, Children Can:
            </h3>
            <div className="grid gap-3">
              {capabilities.map((capability, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-teal-light/50 to-transparent rounded-lg border-l-4 border-primary"
                >
                  <capability.icon className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground">{capability.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GandhariVidyaSection;