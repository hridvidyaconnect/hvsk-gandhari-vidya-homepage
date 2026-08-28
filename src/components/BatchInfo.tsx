import { useGoogleSheetsBatches } from "@/hooks/useGoogleSheetsBatches";
import { Clock, Info, MapPin } from "lucide-react";

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

                {/* Month sub-sections — only for upcoming batches */}
                {!isCompleted(batch.status) && batch.monthEntries && batch.monthEntries.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {batch.monthEntries.map((entry, idx) => (
                      <div
                        key={idx}
                        className={`text-xs p-2 rounded-lg ${variant === "dark"
                          ? "bg-primary-foreground/10"
                          : "bg-background/60 shadow-sm border border-border/50"
                          }`}
                      >
                        {/* Dates + Time on same row, time wraps below if needed */}
                        <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
                          {entry.dates && (
                            <span className={`font-medium ${variant === "dark" ? "text-primary-foreground" : "text-foreground"}`}>
                              {entry.dates}
                            </span>
                          )}
                          {entry.time && (
                            <div className={`flex items-center gap-1 flex-shrink-0 ${mutedColor}`}>
                              <Clock className="w-2.5 h-2.5 flex-shrink-0" />
                              <span>{entry.time}</span>
                            </div>
                          )}
                        </div>

                        {/* Location */}
                        {entry.location && entry.location !== "TBA" && (
                          <div className={`flex items-center gap-1 mt-0.5 ${mutedColor}`}>
                            <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
                            <span>{entry.location}</span>
                          </div>
                        )}


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


    </div>
  );
};

export default BatchInfo;
