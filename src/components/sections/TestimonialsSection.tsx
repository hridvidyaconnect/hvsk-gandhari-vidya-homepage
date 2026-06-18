import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Facebook, Youtube, Play } from "lucide-react";
import { useTestimonialVideos } from "@/hooks/useTestimonialVideos";

const TestimonialsSection = () => {
    const { videos, isLoading } = useTestimonialVideos();
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectedVideo = videos[selectedIndex] ?? videos[0];

    return (
        <section id="testimonials" className="py-24 bg-card relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-light/20 rounded-full blur-3xl -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-y-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center mb-12"
                >
                    <a href="#testimonials" className="no-underline hover:no-underline">
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 hover:opacity-80 transition-opacity cursor-pointer">
                            Parents, Children and We: <span className="text-primary block mt-2">A Shared Transformation</span>
                        </h2>
                    </a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-6xl mx-auto"
                >
                    {isLoading ? (
                        /* Loading skeleton */
                        <div className="flex flex-col md:flex-row gap-5">
                            <div className="flex-1 aspect-video rounded-2xl bg-muted animate-pulse" />
                            <div className="md:w-72 lg:w-80 space-y-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col md:flex-row gap-5">
                            {/* Main Video Player */}
                            <div className="flex-1 min-w-0">
                                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-border bg-muted">
                                    <AnimatePresence mode="wait">
                                        <motion.iframe
                                            key={selectedVideo.embedUrl}
                                            className="absolute top-0 left-0 w-full h-full"
                                            src={selectedVideo.embedUrl}
                                            title={selectedVideo.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </AnimatePresence>
                                </div>
                                {/* Now Playing label */}
                                <motion.p
                                    key={selectedVideo.title}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-3 text-sm font-medium text-muted-foreground flex items-center gap-2"
                                >
                                    <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    Now Playing: <span className="text-foreground">{selectedVideo.title}</span>
                                </motion.p>
                            </div>

                            {/* Vertical Video Gallery Sidebar */}
                            <div className="md:w-72 lg:w-80 flex-shrink-0">
                                <div className="md:max-h-[calc(56.25vw*0.75)] lg:max-h-[480px] overflow-y-auto pr-1 space-y-2 testimonials-sidebar">
                                    {videos.map((video, index) => {
                                        const isActive = index === selectedIndex;
                                        return (
                                            <motion.button
                                                key={index}
                                                onClick={() => setSelectedIndex(index)}
                                                initial={{ opacity: 0, x: 20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.4, delay: index * 0.08 }}
                                                className={`
                                                    w-full text-left rounded-xl px-4 py-3 transition-all duration-300 cursor-pointer
                                                    flex items-center gap-3 group border
                                                    ${isActive
                                                        ? "bg-primary/10 border-primary/40 shadow-md shadow-primary/5"
                                                        : "bg-background/60 border-border/50 hover:bg-primary/5 hover:border-primary/20 hover:shadow-sm"
                                                    }
                                                `}
                                            >
                                                {/* Play icon */}
                                                <div
                                                    className={`
                                                        flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300
                                                        ${isActive
                                                            ? "bg-primary text-primary-foreground shadow-sm"
                                                            : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                                                        }
                                                    `}
                                                >
                                                    <Play className={`w-4 h-4 ${isActive ? "fill-current" : ""}`} />
                                                </div>

                                                {/* Video info */}
                                                <div className="min-w-0 flex-1">
                                                    <p
                                                        className={`
                                                            text-sm font-medium leading-snug truncate transition-colors duration-300
                                                            ${isActive ? "text-primary" : "text-foreground group-hover:text-primary"}
                                                        `}
                                                    >
                                                        {video.title}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground mt-0.5">
                                                        Video {index + 1} of {videos.length}
                                                    </p>
                                                </div>

                                                {/* Active indicator bar */}
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="activeVideoIndicator"
                                                        className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-primary"
                                                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                                    />
                                                )}
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-8 text-center px-4">
                        <p className="text-muted-foreground italic text-lg leading-relaxed">
                            "Every child is born with an inbuilt sixth sense ability. Witness how we guide them to tap into this extraordinary potential."
                        </p>

                        {/* Social Media Links */}
                        <div className="flex items-center justify-center gap-5 mt-6">
                            <a
                                href="https://www.instagram.com/hridvidya/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a
                                href="https://www.facebook.com/people/Hrid-Vidya-Sanskriti-Kendra/61584837778134/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-6 h-6" />
                            </a>
                            <a
                                href="https://www.youtube.com/@HridVidya"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors"
                                aria-label="YouTube"
                            >
                                <Youtube className="w-6 h-6" />
                            </a>
                            <a
                                href="https://whatsapp.com/channel/0029Vb7LKbf0wgzRW9ign2U"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors"
                                aria-label="WhatsApp Channel"
                            >
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
