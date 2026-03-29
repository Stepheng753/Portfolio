import { useState, useEffect, useRef, useCallback } from "react";
import tramigoImg from "../assets/tramigo.png";
import gaImg from "../assets/ga.png";
import ashImg from "../assets/ash.png";

const slides = [
    {
        title: "American Specialty Health",
        subtitle: ".NET 8/10 · SQL · Playwright",
        date: "May 2025 — Present",
        description:
            "Engineered and deployed a unified test automation framework using C# .NET 8 to facilitate backend integration testing for APIs and SQL stored procedures. Developed and scaled end-to-end frontend testing suites via JS Playwright for React-based interfaces while embedding automated protocols directly into CI/CD pipelines to drive software quality improvements.",
        accent: "#7B4FB0",
        imageUrl: ashImg,
    },
    {
        title: "General Atomics",
        subtitle: "C / C++",
        date: "Jan 2022 — April 2024",
        description:
            "Developed various components in C and C++ aimed at simulating real-time events during Predator drone flights, including malfunctions, altimeter sensors, and servo controls. Led the implementation of the electrical power system upgrade for the SkyGuardian drone simulation and established automated testing protocols in Python to ensure consistent system validation.",
        accent: "#2D6B4E",
        imageUrl: gaImg,
    },
    {
        title: "Tramigo",
        subtitle: "React Native / Django",
        date: "Jan 2021 — Jan 2022",
        description:
            "Executed the development of core application components by encompassing a React Native interface and a PostgreSQL backend model implemented with Django Python. Configured Amazon Web Services (AWS) S3 Buckets to optimize backend models for efficient data storage and established the foundation for over 55% of the application's functionality.",
        accent: "#4A90D9",
        imageUrl: tramigoImg,
    },
];

export default function ResumeCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef(null);
    const progressRef = useRef(null);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const SLIDE_DURATION = 6000;
    const TRANSITION_DURATION = 800;

    const goToSlide = useCallback(
        (index, dir) => {
            if (isTransitioning || index === currentIndex) return;
            setIsTransitioning(true);
            setProgress(0);
            setTimeout(() => {
                setCurrentIndex(index);
                setTimeout(() => setIsTransitioning(false), 50);
            }, TRANSITION_DURATION / 2);
        },
        [isTransitioning, currentIndex],
    );

    const goNext = useCallback(() => {
        goToSlide((currentIndex + 1) % slides.length);
    }, [currentIndex, goToSlide]);

    const goPrev = useCallback(() => {
        goToSlide((currentIndex - 1 + slides.length) % slides.length);
    }, [currentIndex, goToSlide]);

    useEffect(() => {
        if (isPaused) return;
        progressRef.current = setInterval(() => {
            setProgress((prev) => (prev >= 100 ? 100 : prev + 100 / (SLIDE_DURATION / 50)));
        }, 50);
        intervalRef.current = setInterval(goNext, SLIDE_DURATION);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (progressRef.current) clearInterval(progressRef.current);
        };
    }, [currentIndex, isPaused, goNext]);

    const handleTouchStart = (e) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };
    const handleTouchMove = (e) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };
    const handleTouchEnd = () => {
        const diff = touchStartX.current - touchEndX.current;
        if (Math.abs(diff) > 60) {
            diff > 0 ? goNext() : goPrev();
        }
    };

    const currentSlide = slides[currentIndex];

    return (
        <div
            className="carousel-wrapper"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div
                className="carousel-bg-wash"
                style={{
                    background: `radial-gradient(ellipse at 70% 50%, ${currentSlide.accent}18 0%, transparent 70%)`,
                }}
            />

            <div className="carousel-inner">
                <div className="carousel-content">
                    <div className="carousel-content-inner">
                        <div className={`carousel-collection-num ${isTransitioning ? "transitioning" : "visible"}`}>
                            <span className="carousel-num-line" />
                            <span className="carousel-num-text">
                                {String(currentIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                            </span>
                        </div>

                        <h2 className={`carousel-title ${isTransitioning ? "transitioning" : "visible"}`}>
                            {currentSlide.title}
                        </h2>

                        <p
                            className={`carousel-subtitle ${isTransitioning ? "transitioning" : "visible"}`}
                            style={{ color: currentSlide.accent }}
                        >
                            {currentSlide.subtitle}
                        </p>

                        <p className={`carousel-date ${isTransitioning ? "transitioning" : "visible"}`}>
                            {currentSlide.date}
                        </p>

                        <p className={`carousel-description ${isTransitioning ? "transitioning" : "visible"}`}>
                            {currentSlide.description}
                        </p>

                        <div className="carousel-nav-arrows">
                            <button onClick={goPrev} className="carousel-arrow-btn" aria-label="Previous slide">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                >
                                    <path d="M19 12H5M12 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button onClick={goNext} className="carousel-arrow-btn" aria-label="Next slide">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                >
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="carousel-image-container">
                    <div className={`carousel-image-frame ${isTransitioning ? "transitioning" : "visible"}`}>
                        <img src={currentSlide.imageUrl} alt={currentSlide.title} className="carousel-image" />
                        <div
                            className="carousel-image-overlay"
                            style={{
                                background: `linear-gradient(135deg, ${currentSlide.accent}22 0%, transparent 50%)`,
                            }}
                        />
                    </div>
                    <div
                        className="carousel-frame-corner carousel-frame-corner--tl"
                        style={{ borderColor: currentSlide.accent }}
                    />
                    <div
                        className="carousel-frame-corner carousel-frame-corner--br"
                        style={{ borderColor: currentSlide.accent }}
                    />
                </div>
            </div>

            <div className="carousel-progress-bar">
                {slides.map((slide, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`carousel-progress-item ${index === currentIndex ? "active" : ""}`}
                        aria-label={`Go to slide ${index + 1}`}
                    >
                        <div className="carousel-progress-track">
                            <div
                                className="carousel-progress-fill"
                                style={{
                                    width:
                                        index === currentIndex ? `${progress}%` : index < currentIndex ? "100%" : "0%",
                                    backgroundColor: index === currentIndex ? currentSlide.accent : undefined,
                                }}
                            />
                        </div>
                        <span className="carousel-progress-label">{slide.title}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
