import { useGoogleSheetsBatches } from "@/hooks/useGoogleSheetsBatches";
import { Clock, Info } from "lucide-react";

interface BatchInfoProps {
  variant?: "light" | "dark" | "card";
  showTitle?: boolean;
}

const BatchInfo = ({ variant = "light", showTitle = true }: BatchInfoProps) => {
  const { batches, isLoading } = useGoogleSheetsBatches();
  const textColor = variant === "dark" ? "text-primary-foreground" : "text-foreground";
  const mutedColor = variant === "dark" ? "text-primary-foreground/80" : "text-muted-foreground";
  const bgColor = variant === "card" ? "bg-card shadow-card" : "";

  const isCompleted = (status: string) => status === "Completed";

  return (
    <div className={`space-y-4 ${bgColor} ${variant === "card" ? "p-6 rounded-xl" : ""}`}>
      {showTitle && (
        <h3 className={`font-serif text-xl font-semibold ${textColor}`}>
          Upcoming Batches
        </h3>
      )}

      {/* Loading skeleton */}
      {isLoading ? (
        <div className="grid gap-2 grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`rounded-xl p-3 animate-pulse ${variant === "card"
                ? "bg-teal-light/30"
                : variant === "dark"
                  ? "bg-primary-foreground/5"
                  : "bg-secondary/50"
                }`}
            >
              <div className={`h-4 w-24 rounded mb-2 ${variant === "dark" ? "bg-primary-foreground/10" : "bg-muted"}`} />
              <div className={`h-3 w-16 rounded ${variant === "dark" ? "bg-primary-foreground/10" : "bg-muted"}`} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-2 grid-cols-2">
          {batches.map((batch, index) => (
            <div
              key={batch.id}
              className={`rounded-xl p-3 flex flex-col justify-between ${index === batches.length - 1 && batches.length % 2 !== 0
                ? "col-span-2 mx-auto w-[calc(50%-0.25rem)]"
                : ""
                } ${isCompleted(batch.status)
                  ? "opacity-60 grayscale"
                  : ""
                } ${variant === "card"
                  ? "bg-teal-light/50 border border-primary/20"
                  : variant === "dark"
                    ? "bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/10"
                    : "bg-secondary"
                }`}
            >
              <div>
                {/* Batch Name */}
                <span className={`font-serif font-bold text-sm sm:text-base block mb-1 ${isCompleted(batch.status) ? mutedColor : variant === "dark" ? "text-accent" : "text-primary"}`}>
                  {batch.name}
                </span>

                {/* Timings for non-completed batches where available */}
                {!isCompleted(batch.status) && batch.time && (
                  <div className={`flex items-center gap-1.5 text-[10px] sm:text-xs ${mutedColor}`}>
                    <Clock className="w-3 h-3 flex-shrink-0" />
                    <span className="font-medium">{batch.time}</span>
                  </div>
                )}

                {/* Sub-batches: hidden entirely when batch is fully completed, otherwise individual completed ones get greyed out */}
                {!isCompleted(batch.status) && batch.subBatches && batch.subBatches.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {batch.subBatches.map((subBatch, idx) => (
                      <div key={idx} className={`text-xs p-2 rounded-lg ${subBatch.status === "Completed" ? "opacity-50" : ""} ${variant === 'dark' ? 'bg-primary-foreground/10' : 'bg-background/60 shadow-sm border border-border/50'}`}>
                        <div className="flex items-center justify-between">
                          <span className={`font-semibold ${variant === 'dark' ? 'text-primary-foreground' : 'text-foreground'}`}>
                            {subBatch.dates}
                          </span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${variant === 'dark' ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-primary/10 text-primary'}`}>
                            {subBatch.location}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-2">
                {/* Completed Badge */}
                {isCompleted(batch.status) ? (
                  <div className="flex">
                    <span className="bg-emerald-600/20 text-emerald-400 text-xs font-semibold px-2.5 py-0.5 rounded border border-emerald-500/30">
                      Completed
                    </span>
                  </div>
                ) : batch.status === "Upcoming" ? (
                  /* Registration notice for upcoming batches */
                  <div className={`flex items-center gap-1.5 ${variant === "dark" ? "text-amber-300" : "text-amber-600"}`}>
                    <Info className="w-4 h-4 flex-shrink-0" />
                    <span className="text-xs font-medium">
                      Registrations Open Now
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TBA Note */}
      <div className={`text-xs text-center mt-3 font-medium ${mutedColor}`}>
        *TBA - To Be Announced
      </div>
    </div>
  );
};

export default BatchInfo;
