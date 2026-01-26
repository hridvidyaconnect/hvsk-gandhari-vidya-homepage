import { workshopBatches } from "@/config/workshopData";
import { Calendar, Clock, Info } from "lucide-react";

interface BatchInfoProps {
  variant?: "light" | "dark" | "card";
  showTitle?: boolean;
}

const BatchInfo = ({ variant = "light", showTitle = true }: BatchInfoProps) => {
  const textColor = variant === "dark" ? "text-primary-foreground" : "text-foreground";
  const mutedColor = variant === "dark" ? "text-primary-foreground/80" : "text-muted-foreground";
  const bgColor = variant === "card" ? "bg-card shadow-card" : "";

  // Check if batch is completed (batch-1 is completed)
  const isCompleted = (batchId: string) => batchId === "batch-1";

  return (
    <div className={`space-y-4 ${bgColor} ${variant === "card" ? "p-6 rounded-xl" : ""}`}>
      {showTitle && (
        <h3 className={`font-serif text-xl font-semibold ${textColor}`}>
          Upcoming Batches
        </h3>
      )}
      <div className={`grid gap-4 sm:gap-6 ${variant === "dark" ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
        {workshopBatches.map((batch) => (
          <div
            key={batch.id}
            className={`relative rounded-xl p-5 sm:p-6 ${isCompleted(batch.id)
              ? "opacity-40 grayscale"
              : ""
              } ${variant === "card"
                ? "bg-teal-light/50 border border-primary/20"
                : variant === "dark"
                  ? "bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/10"
                  : "bg-secondary"
              }`}
          >
            {/* Completed Badge */}
            {isCompleted(batch.id) && (
              <div className="absolute top-3 right-3 bg-emerald-600 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-md border border-emerald-400">
                Completed
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-4">
              <span className={`font-serif font-bold text-lg sm:text-xl ${isCompleted(batch.id) ? mutedColor : variant === "dark" ? "text-accent" : "text-primary"}`}>
                {batch.name}
              </span>
              <span className={`text-sm sm:text-base font-medium ${mutedColor}`}>
                ({batch.month} {batch.year})
              </span>
            </div>
            <div className="space-y-3">
              <div className={`flex items-start gap-3 text-sm sm:text-base ${mutedColor}`}>
                <Calendar className="w-5 h-5 flex-shrink-0 mt-1" />
                <div className="flex flex-wrap gap-2">
                  {batch.dates.map((date, idx) => (
                    <span
                      key={idx}
                      className={`inline-block px-3 py-1 rounded-lg text-sm font-semibold border ${variant === "dark"
                        ? "bg-accent/20 border-accent/40 text-primary-foreground"
                        : "bg-white border-primary/20 text-primary"
                        }`}
                    >
                      {date}
                    </span>
                  ))}
                </div>
              </div>
              <div className={`flex items-center gap-3 text-sm sm:text-base ${mutedColor}`}>
                <Clock className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{batch.time}</span>
              </div>

              {/* Registration deadline notice for Batch 2 */}
              {batch.id === "batch-2" && (
                <div className={`flex items-center gap-2 mt-3 pt-3 border-t ${variant === "dark"
                  ? "border-primary-foreground/20 text-amber-300"
                  : "border-primary/10 text-amber-600"
                  }`}>
                  <Info className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm font-medium">
                    Registrations are open till 30th Jan '26
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BatchInfo;
