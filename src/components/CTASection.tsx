import { motion } from "framer-motion";
import EnrollButton from "./EnrollButton";

interface CTASectionProps {
  variant?: "light" | "dark";
  buttonVariant?: "hero" | "gold" | "cta" | "purple";
}

const CTASection = ({ 
  variant = "light",
  buttonVariant = "gold" 
}: CTASectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mt-8 flex justify-center"
    >
      <EnrollButton variant={buttonVariant} size="xl" />
    </motion.div>
  );
};

export default CTASection;