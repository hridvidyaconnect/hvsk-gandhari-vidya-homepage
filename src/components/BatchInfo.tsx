import { workshopBatches } from "@/config/workshopData";
import { Calendar, Clock } from "lucide-react";

interface BatchInfoProps {
  variant?: "light" | "dark" | "card";
  showTitle?: boolean;
}

const BatchInfo = ({ variant = "light", showTitle = true }: BatchInfoProps) => {
  const textColor = variant === "dark" ? "text-primary-foreground" : "text-foreground";
  const mutedColor = variant === "dark" ? "text-primary-foreground/80" : "text-muted-foreground";
  const bgColor = variant === "card" ? "bg-card shadow-card" : "";
  
  return (
    <div className={`space-y-4 ${bgColor} ${variant === "card" ? "p-6 rounded-xl" : ""}`}>
      {showTitle && (
        <h3 className={`font-serif text-xl font-semibold ${textColor}`}>
          Upcoming Batches
        </h3>
      )}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
        {workshopBatches.map((batch) => (
          <div
            key={batch.id}
            className={`rounded-lg p-3 sm:p-4 ${
              variant === "card" 
                ? "bg-teal-light/50 border border-primary/20" 
                : variant === "dark" 
                  ? "bg-primary-foreground/10 backdrop-blur-sm" 
                  : "bg-secondary"
            }`}
          >
            <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2">
              <span className={`font-serif font-bold text-base sm:text-lg ${variant === "dark" ? "text-accent" : "text-primary"}`}>
                {batch.name}
              </span>
              <span className={`text-xs sm:text-sm ${mutedColor}`}>
                ({batch.month} {batch.year})
              </span>
            </div>
            <div className="space-y-1.5">
              <div className={`flex items-start gap-2 text-xs sm:text-sm ${mutedColor}`}>
                <Calendar className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span className="font-medium break-words">{batch.dates.join(", ")}</span>
              </div>
              <div className={`flex items-center gap-2 text-xs sm:text-sm ${mutedColor}`}>
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span>{batch.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BatchInfo;
