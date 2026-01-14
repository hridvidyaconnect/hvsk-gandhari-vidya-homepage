import { MapPin } from "lucide-react";
import BatchInfo from "@/components/BatchInfo";
import EnrollButton from "@/components/EnrollButton";
import { workshopDetails } from "@/config/workshopData";
import locationImage from "@/assets/ssth-location.jpg";

const ActionCard = () => {
    return (
        <div className="bg-primary-foreground/10 backdrop-blur-xl border border-primary-foreground/20 rounded-3xl p-4 sm:p-5 shadow-2xl">
            <div className="space-y-4">
                {/* Header */}
                <div className="text-center">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-primary-foreground mb-1">
                        Secure Your Spot
                    </h3>
                    <p className="text-primary-foreground/80 text-xs sm:text-sm">
                        Limited seats available for upcoming batches
                    </p>
                </div>

                {/* Batches & Action Group */}
                <div className="flex flex-col gap-3">
                    <BatchInfo variant="dark" showTitle={false} />

                    <div className="pt-1">
                        <EnrollButton
                            variant="hero"
                            size="xl"
                            text="Enroll Now"
                            className="w-full text-base sm:text-lg py-3 sm:py-4 shadow-glow animate-pulse-glow"
                        />
                        <p className="text-center text-primary-foreground/60 text-[10px] sm:text-xs mt-2">
                            Simple 2-minute registration process
                        </p>
                    </div>
                </div>

                {/* Location - Compact Version */}
                <div className="flex items-center gap-4 bg-black/20 rounded-xl p-4">
                    <img
                        src={locationImage}
                        alt="Venue"
                        className="w-16 h-16 object-cover rounded-lg shadow-sm"
                    />
                    <div className="min-w-0">
                        <div className="flex items-center gap-2 text-accent mb-1">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span className="font-semibold text-sm">Venue</span>
                        </div>
                        <p className="text-primary-foreground/90 text-sm truncate">
                            {workshopDetails.location}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActionCard;
