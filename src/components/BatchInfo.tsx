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
      <div className="grid gap-2 grid-cols-2">
        {workshopBatches.map((batch) => (
          <div
            key={batch.id}
            className={`rounded-xl p-3 flex flex-col justify-between ${isCompleted(batch.id)
              ? "opacity-60 grayscale"
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
            <div>
              {/* Batch Name */}
              <span className={`font-serif font-bold text-sm sm:text-base block mb-1 ${isCompleted(batch.id) ? mutedColor : variant === "dark" ? "text-accent" : "text-primary"}`}>
                {batch.name}
              </span>

              {/* Timings for non-completed batches where available */}
              {!isCompleted(batch.id) && batch.time && (
                <div className={`flex items-center gap-1.5 text-[10px] sm:text-xs ${mutedColor}`}>
                  <Clock className="w-3 h-3 flex-shrink-0" />
                  <span className="font-medium">{batch.time}</span>
                </div>
              )}
            </div>

            <div className="mt-2">
              {/* Completed Badge */}
              {isCompleted(batch.id) ? (
                <div className="flex">
                  <span className="bg-emerald-600/20 text-emerald-400 text-xs font-semibold px-2.5 py-0.5 rounded border border-emerald-500/30">
                    Completed
                  </span>
                </div>
              ) : batch.id === "batch-2" ? (
                /* Registration status for Batch 2 - Ongoing */
                <div className={`flex items-center gap-1.5 ${variant === "dark" ? "text-emerald-300" : "text-emerald-600"}`}>
                  <Info className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-semibold">
                    Ongoing
                  </span>
                </div>
              ) : batch.id === "batch-3" ? (
                /* Registration deadline notice for Batch 3 */
                <div className={`flex items-center gap-1.5 ${variant === "dark" ? "text-amber-300" : "text-amber-600"}`}>
                  <Info className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-medium">
                    Open now till 31st Mar '26
                  </span>
                </div>
              ) : batch.id === "batch-4" ? (
                /* Registration deadline notice for Batch 4 */
                <div className={`flex items-center gap-1.5 ${variant === "dark" ? "text-amber-300" : "text-amber-600"}`}>
                  <Info className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-medium">
                    Open now till 31st Apr '26
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BatchInfo;
