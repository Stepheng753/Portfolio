import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
const profilePic = "/profile_pic.jpg";

const navItems = [
    { id: "about", label: "About" },
    { id: "resume", label: "Experience" },
    { id: "companies", label: "Companies" },
    { id: "skills", label: "Skills" },
    { id: "personal", label: "Personal" },
    { id: "contact", label: "Contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id) => {
        setIsMobileMenuOpen(false);

        const el = document.getElementById(id);
        if (!el) return;

        const tryScroll = () => {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        };

        // If the hero is already expanded, just scroll directly
        if (window.scrollY > 5) {
            tryScroll();
            return;
        }

        // Force the hero to instantly expand via custom event
        window.dispatchEvent(new CustomEvent("forceExpandHero"));

        // Wait for React to re-render the expanded content, then scroll
        requestAnimationFrame(() => {
            setTimeout(tryScroll, 100);
        });
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm border-b border-border" : "bg-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <a
                    href="#"
                    className="group relative flex items-center gap-2 font-serif text-xl font-bold tracking-tight"
                    style={{
                        color: isScrolled ? "var(--color-primary)" : "#ffffff",
                        textShadow: isScrolled ? "none" : "0 1px 4px rgba(0,0,0,0.7)",
                    }}
                >
                    <img
                        src={profilePic}
                        alt="Stephen Giang"
                        className="w-8 h-10 rounded-md object-cover border border-white/40 shadow-sm"
                    />
                    SG
                    {/* Enlarged hover popup */}
                    <div className="pointer-events-none absolute left-0 top-full mt-4 w-48 origin-top-left opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-300 ease-in-out z-50">
                        <div className="rounded-xl overflow-hidden shadow-2xl border border-border bg-background/95 backdrop-blur-md p-1">
                            <img
                                src={profilePic}
                                alt="Stephen Giang"
                                className="w-full h-auto rounded-lg"
                                style={{ aspectRatio: "3/4" }}
                            />
                        </div>
                    </div>
                </a>

                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className="text-sm font-medium transition-colors tracking-wide uppercase cursor-pointer"
                            style={{
                                color: isScrolled ? "var(--color-muted-foreground)" : "#ffffff",
                                textShadow: isScrolled ? "none" : "0 1px 4px rgba(0,0,0,0.7)",
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.color = "var(--color-primary)";
                                e.target.style.textShadow = "none";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = isScrolled ? "var(--color-muted-foreground)" : "#ffffff";
                                e.target.style.textShadow = isScrolled ? "none" : "0 1px 4px rgba(0,0,0,0.7)";
                            }}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                <button
                    className="md:hidden cursor-pointer"
                    style={{
                        color: isScrolled ? "var(--color-foreground)" : "#ffffff",
                        textShadow: isScrolled ? "none" : "0 1px 4px rgba(0,0,0,0.7)",
                    }}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border">
                    <div className="px-6 py-4 flex flex-col gap-4">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="text-left text-sm font-medium text-muted-foreground hover:text-primary transition-colors tracking-wide uppercase cursor-pointer"
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
