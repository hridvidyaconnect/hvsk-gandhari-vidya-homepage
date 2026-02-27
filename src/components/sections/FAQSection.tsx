import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is this a religious program?",
    answer: "No. Gandhari Vidya is rooted in yogic wisdom and is open to all children regardless of faith. It is a scientific approach to awakening natural intuitive abilities.",
  },
  {
    question: "Can children really read blindfolded?",
    answer: "Yes, with consistent practice and guidance, many children develop this intuitive ability. The blindfold helps shut down the visual cortex temporarily, allowing other parts of the brain to heighten their activity.",
  },
  {
    question: "Is it safe for the eyes or brain?",
    answer: "Absolutely safe. All practices are gentle, non-invasive, and designed for children's well-being. The exercises are practiced under expert guidance.",
  },
  {
    question: "What if my child is shy or distracted?",
    answer: "The program is designed to be inclusive, playful, and nurturing for all personality types. Our approach helps shy children build confidence and helps distracted children improve focus.",
  },
  {
    question: "Will my child be able to demonstrate results in 8 weeks?",
    answer: "Most children show intuitive responses within 4–6 sessions and with consistent practice. The final weekend includes a demonstration. Intuitive abilities, depth of understanding and practice vary from child to child.",
  },
  {
    question: "Why should one not practice without blindfold? What is the effect?",
    answer: `The blindfold is essential for several reasons:

• It prevents true sensory isolation - helping the brain heighten its intuitive activity
• Without it, external visual distractions keep the mind outwardly focused
• It prevents confusion between mental imagination and real intuitive perception
• The blindfold creates a controlled environment where perception is measurable and consistent
• It trains the brain to function beyond normal visual input
• It symbolizes withdrawal of the senses (pratyāhāra) – an essential yogic principle
• It cultivates patience, humility, and inner focus`,
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 bg-gradient-section relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-20 right-10 w-40 h-40 bg-teal-light/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-60 h-60 bg-sage/30 rounded-full blur-3xl" />

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
            Have Questions?
          </span>
          <a href="#faq" className="no-underline hover:no-underline">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 hover:opacity-80 transition-opacity cursor-pointer">
              Frequently Asked <span className="text-accent">Questions</span>
            </h2>
          </a>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl border border-border px-6 shadow-soft"
              >
                <AccordionTrigger className="text-left font-serif text-lg font-semibold text-foreground hover:text-primary py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 whitespace-pre-line">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
