import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import ScrollExpandHero from "./components/ScrollExpandHero";
import ResumeCarousel from "./components/ResumeCarousel";
import CompanyCard from "./components/CompanyCard";
import TechStack from "./components/TechStack";
import PersonalSection from "./components/PersonalSection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { SEO } from "./components/SEO";

import madisonlegalImg from "./assets/madisonlegal.png";
import crossroadsImg from "./assets/crossroads.png";

function SectionHeading({ label, title }) {
    return (
        <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <p className="text-xs font-mono uppercase tracking-[4px] text-primary mb-3">{label}</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">{title}</h2>
        </motion.div>
    );
}

function App() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <SEO />
            <Navbar />

            {/* ===== HERO ===== */}
            <ScrollExpandHero
                mediaType="video"
                mediaSrc="/bgvideo.mp4"
                bgImageSrc="/your-name.jpeg"
                title="Stephen Giang"
                scrollToExpand="Welcome to my Portfolio"
                textBlend
            >
                {/* About section rendered as hero children (appears after scroll expansion) */}
                <div id="about" className="max-w-4xl mx-auto scroll-mt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-xs font-mono uppercase tracking-[4px] text-primary mb-4">About Me</p>
                        <p className="text-lg md:text-xl leading-relaxed text-foreground font-light">
                            Hello, I am a Software Engineer, the founder of{" "}
                            <a
                                href="https://madisonlegal.ai/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary font-medium hover:underline"
                            >
                                MadisonLegal.ai
                            </a>
                            , and a dedicated private educator at{" "}
                            <a
                                href="https://www.crossroadstutoring.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary font-medium hover:underline"
                            >
                                Crossroads Tutoring
                            </a>
                            . With a foundation in Applied Mathematics and Computational Science, my expertise lies at
                            the intersection of complex algorithmic logic and highly practical, automated solutions.
                            Whether I am engineering enterprise-grade software, designing n8n automation pipelines for
                            law firms, or breaking down advanced physics and calculus for my students, I am driven by a
                            singular focus: building robust systems that optimize how we work and learn.
                        </p>
                    </motion.div>
                </div>
            </ScrollExpandHero>

            {/* ===== RESUME / EXPERIENCE ===== */}
            <section id="resume" className="py-20">
                <SectionHeading label="Experience" title="Where I've Worked" />
                <ResumeCarousel />
            </section>

            {/* ===== COMPANIES ===== */}
            <section id="companies" className="py-20 bg-muted/20">
                <SectionHeading label="Companies" title="What I've Built" />
                <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
                    <CompanyCard
                        title="MadisonLegal.ai"
                        excerpt="Optimized AI workflows to automate repetitive tasks such as document processing, case research, and client communications for law firms. Engineered enterprise-grade legal technology solutions powered by custom n8n pipelines and intelligent document analysis."
                        image={madisonlegalImg}
                        link="https://madisonlegal.ai/"
                        tags={["AI", "Legal Tech"]}
                    />
                    <CompanyCard
                        title="Crossroads Tutoring"
                        excerpt="Directed all operations and mentored a team of tutors since 2018 while providing personalized instruction in Mathematics, Physics, Computer Science, and Chemistry. Developed a custom automated invoicing system using n8n and Twilio, and implemented a proprietary pipeline for AI-generated homework and study guides."
                        image={crossroadsImg}
                        link="https://www.crossroadstutoring.com/"
                        tags={["Education", "Automation"]}
                    />
                </div>
            </section>

            {/* ===== TECH STACK / SKILLS ===== */}
            <section id="skills" className="py-20">
                <SectionHeading label="Skills" title="Tech Stack" />
                <TechStack />
            </section>

            {/* ===== PERSONAL ===== */}
            <section id="personal" className="py-20 bg-muted/20">
                <SectionHeading label="Personal" title="Beyond the Code" />
                <div className="px-6">
                    <PersonalSection />
                </div>
            </section>

            {/* ===== CONTACT ===== */}
            <section id="contact" className="py-20">
                <SectionHeading label="Contact" title="Get In Touch" />
                <div className="px-6">
                    <Contact />
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <Footer />
        </div>
    );
}

export default App;
