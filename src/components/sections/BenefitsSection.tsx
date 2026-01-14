import { motion } from "framer-motion";
import { Brain, Sparkles, Heart, Zap } from "lucide-react";

const benefitCategories = [
  {
    icon: Brain,
    title: "Memory & Intelligence Development",
    color: "from-primary to-teal-dark",
    benefits: [
      "Strong long-term memory",
      "Better and improved retention skills",
      "Clarity of thought",
    ],
  },
  {
    icon: Sparkles,
    title: "Improved Visualization & Imagination",
    color: "from-accent to-gold-light",
    benefits: [
      "Enhanced creative thinking",
      "Vivid mental imagery",
      "Innovative problem-solving",
    ],
  },
  {
    icon: Heart,
    title: "Emotional & Personality Growth",
    color: "from-secondary-foreground to-muted-foreground",
    benefits: [
      "Calmer mind and better concentration",
      "Balanced emotions",
      "Higher self-confidence, independence and resilience",
    ],
  },
  {
    icon: Zap,
    title: "Overall Growth",
    color: "from-primary to-accent",
    benefits: [
      "Awareness and Creativity becomes stronger",
      "The mind becomes peaceful and sharp",
      "Child becomes more connected to their inner strength",
    ],
  },
];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-24 bg-gradient-section relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
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
            Transform Your Child
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
            Benefits for <span className="text-accent">Your Child</span>
          </h2>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {benefitCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-card rounded-2xl p-8 shadow-card border border-border h-full hover:shadow-lg transition-shadow duration-300">
                {/* Icon and Title */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-foreground">
                    {category.title}
                  </h3>
                </div>

                {/* Benefits List */}
                <ul className="space-y-3">
                  {category.benefits.map((benefit, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
