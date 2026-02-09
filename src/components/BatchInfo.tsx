import { workshopBatches } from "@/config/workshopData";
import { Clock, Info } from "lucide-react";

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
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
        {workshopBatches.map((batch) => (
          <div
            key={batch.id}
            className={`rounded-xl p-4 flex flex-col ${isCompleted(batch.id)
              ? "opacity-40 grayscale"
              : ""
              } ${batch.id === "batch-2"
                ? variant === "dark"
                  ? "bg-primary-foreground/10 backdrop-blur-md border-2 border-emerald-500/50"
                  : "bg-secondary border-2 border-emerald-500/50"
                : variant === "card"
                  ? "bg-teal-light/50 border border-primary/20"
                  : variant === "dark"
                    ? "bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/10"
                    : "bg-secondary"
              }`}
          >
            {/* Batch Name */}
            <span className={`font-serif font-bold text-base sm:text-lg block ${isCompleted(batch.id) ? mutedColor : variant === "dark" ? "text-accent" : "text-primary"}`}>
              {batch.name}
            </span>

            {/* Spacer to push content to bottom for completed batches */}
            {isCompleted(batch.id) && <div className="flex-grow" />}

            {/* Completed Badge - at the bottom */}
            {isCompleted(batch.id) && (
              <div className="mt-auto pt-2">
                <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md border border-emerald-400">
                  Completed
                </span>
              </div>
            )}

            {/* Timings for non-completed batches */}
            {!isCompleted(batch.id) && batch.time && (
              <div className={`flex items-center gap-2 mt-2 text-sm ${mutedColor}`}>
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span className="font-medium">{batch.time}</span>
              </div>
            )}

            {/* Registration status for Batch 2 - Ongoing */}
            {batch.id === "batch-2" && (
              <div className={`flex items-center gap-2 mt-2 ${variant === "dark"
                ? "text-emerald-300"
                : "text-emerald-600"
                }`}>
                <Info className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-medium">
                  Ongoing
                </span>
              </div>
            )}

            {/* Registration deadline notice for Batch 3 */}
            {batch.id === "batch-3" && (
              <div className={`flex items-center gap-2 mt-2 ${variant === "dark"
                ? "text-amber-300"
                : "text-amber-600"
                }`}>
                <Info className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-medium">
                  Open till 31st Mar '26
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BatchInfo;
