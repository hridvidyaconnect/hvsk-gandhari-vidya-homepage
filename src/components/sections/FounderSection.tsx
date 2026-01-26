import { motion } from "framer-motion";
import { Award, Music, BookOpen, Target, Users } from "lucide-react";
import sowmyaProfile from "@/assets/sowmya-profile.jpg";

const credentials = [
  // { icon: BookOpen, text: "B.E. in Electronics & GNIIT with Master's in IT" },
  { icon: Award, text: "Certified Gandhari Vidya trainer, blessed by her Guru to carry forward this lineage" },
  { icon: Music, text: "Certified Carnatic vocalist" },
  { icon: Users, text: "17+ years nurturing young minds through Carnatic music training" },
  { icon: Target, text: "Trained under various Gurus in Spirituality, Acupressure, Yoga & healing sciences" },
];

const FounderSection = () => {
  return (
    <section id="founder" className="py-24 bg-card relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-teal-light/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-sage/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium tracking-widest uppercase text-sm">
            Meet Your Guide
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
            The <span className="text-accent">Founder</span> & Guide
          </h2>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Photo and Quick Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center lg:sticky lg:top-24"
          >
            {/* Profile Image */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-2xl transform rotate-3 scale-105" />
              <img
                src={sowmyaProfile}
                alt="Sowmya K T - Founder of Hrid Vidya Samskriti Kendra"
                className="relative rounded-2xl w-72 h-auto object-cover shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-accent text-foreground px-6 py-2 rounded-full font-serif font-bold shadow-glow">
                Sowmya K T
              </div>
            </div>

            {/* Credentials */}
            <div className="w-full max-w-md space-y-3 mt-8">
              {credentials.map((cred, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start gap-3 p-3 bg-background rounded-lg border border-border"
                >
                  <cred.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{cred.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bio Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-foreground leading-relaxed">
                <span className="font-serif font-bold text-xl text-primary">Sowmya K T</span> is a 
                passionate educator, spiritual seeker, and guide, committed to nurturing the next 
                generation through the timeless wisdom of Gandhari Vidya. With a rare blend of 
                technical expertise, artistic depth, and spiritual grounding, she brings a holistic 
                vision to children's learning and inner growth.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                She began her professional journey as a Corporate Trainer, mentoring IT professionals 
                in software skills. Alongside her technical pursuits, Sowmya is a trained and certified 
                Carnatic vocalist. For over 17 years, she has been nurturing young minds through 
                Carnatic music training, instilling discipline, devotion, and artistic excellence.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Her spiritual journey has been shaped under the guidance of various Gurus in 
                Spirituality, Acupressure, Gandhari Vidya, Yoga, and other healing and awareness 
                sciences. During her Gurukulam training, she was blessed with the opportunity to 
                serve and guide many students, gaining deep experiential understanding.
              </p>

              <p className="text-foreground leading-relaxed font-medium">
                Today, Sowmya's work stands at the confluence of ancient wisdom and modern education, 
                empowering children to grow with awareness, discipline, creativity, and responsibility.
              </p>
            </div>

            {/* Vision & Mission */}
            <div className="grid sm:grid-cols-2 gap-6 mt-8">
              <div className="bg-teal-light/30 rounded-xl p-6 border border-primary/20">
                <h4 className="font-serif text-lg font-bold text-primary mb-3">Vision</h4>
                <p className="text-muted-foreground text-sm">
                  To spread Gandhari Vidya globally and empower millions of children through 
                  ancient wisdom.
                </p>
              </div>
              <div className="bg-sage/30 rounded-xl p-6 border border-secondary-foreground/20">
                <h4 className="font-serif text-lg font-bold text-secondary-foreground mb-3">Mission</h4>
                <p className="text-muted-foreground text-sm">
                  To nurture expressive, innovative, and adaptable children who grow with 
                  self-discipline, responsibility, and experiential learning—spreading 
                  knowledge and adding value to a better global future.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
