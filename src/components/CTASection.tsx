import { motion } from "framer-motion";
import EnrollButton from "./EnrollButton";
import BatchInfo from "./BatchInfo";

interface CTASectionProps {
  showBatches?: boolean;
  variant?: "light" | "dark";
  buttonVariant?: "hero" | "gold" | "cta" | "purple";
}

const CTASection = ({ 
  showBatches = true, 
  variant = "light",
  buttonVariant = "gold" 
}: CTASectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mt-8"
    >
      <div className={`flex flex-col lg:flex-row items-center gap-6 ${showBatches ? "lg:items-start" : ""}`}>
        <EnrollButton variant={buttonVariant} size="xl" />
        {showBatches && (
          <div className="flex-1 w-full lg:w-auto">
            <BatchInfo variant={variant === "dark" ? "dark" : "card"} showTitle={false} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CTASection;