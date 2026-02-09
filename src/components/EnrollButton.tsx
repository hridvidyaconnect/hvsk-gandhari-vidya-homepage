import { Button } from "@/components/ui/button";
import { formLinks } from "@/config/workshopData";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

interface EnrollButtonProps {
  variant?: "hero" | "gold" | "cta" | "purple" | "outline-gold";
  size?: "default" | "lg" | "xl";
  className?: string;
  showArrow?: boolean;
  text?: ReactNode;
}

const EnrollButton = ({
  variant = "gold",
  size = "lg",
  className = "",
  showArrow = true,
  text = "Enroll Now",
}: EnrollButtonProps) => {
  return (
    <Button
      variant={variant}
      size={size}
      className={`whitespace-normal text-center leading-tight h-auto py-4 min-h-[3.5rem] ${className}`}
      asChild
    >
      <a href={formLinks.enrollment} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
        <span>{text}</span>
        {showArrow && <ArrowRight className="w-5 h-5 flex-shrink-0" />}
      </a>
    </Button>
  );
};

export default EnrollButton;
