import { motion } from "framer-motion";

const TestimonialsSection = () => {
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
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
                        Parents, Children and We: <span className="text-primary block mt-2">A Shared Transformation</span>
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-border bg-muted">
                        <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src="https://www.youtube.com/embed/9kVnT0wkZ_0?si=At4vnp3sfFBdWSuv"
                            title="Gandhari Vidya Parents Testimonials - Batch Jan 2026"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>

                    <div className="mt-8 text-center px-4">
                        <p className="text-muted-foreground italic text-lg leading-relaxed">
                            "Every child is born with an inbuilt sixth sense ability. Witness how we guide them to tap into this extraordinary potential."
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
