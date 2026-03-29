import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const ScrollExpandHero = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMobileState, setIsMobileState] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, [mediaType]);

  // Allow programmatic instant-expansion from Navbar clicks
  useEffect(() => {
    const handleForceExpand = () => {
      setScrollProgress(1);
      setMediaFullyExpanded(true);
      setShowContent(true);
    };
    window.addEventListener('forceExpandHero', handleForceExpand);
    return () => window.removeEventListener('forceExpandHero', handleForceExpand);
  }, []);

  useEffect(() => {
    const handleWheel = (e) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.0009;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
        setScrollProgress(newProgress);
        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e) => setTouchStartY(e.touches[0].clientY);

    const handleTouchMove = (e) => {
      if (!touchStartY) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
        setScrollProgress(newProgress);
        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = () => setTouchStartY(0);
    const handleScroll = () => { if (!mediaFullyExpanded) window.scrollTo(0, 0); };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  useEffect(() => {
    const checkIfMobile = () => setIsMobileState(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);

  return (
    <div ref={sectionRef} className="transition-colors duration-700 ease-in-out overflow-x-hidden">
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">
          <motion.div
            className="absolute inset-0 z-0 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <img
              src={bgImageSrc}
              alt="Background"
              className="w-screen h-screen object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/10" />
          </motion.div>

          <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">
              <div
                className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: '95vw',
                  maxHeight: '85vh',
                  boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.3)',
                }}
              >
                {mediaType === 'video' ? (
                  <div className="relative w-full h-full pointer-events-none">
                    <video
                      src={mediaSrc}
                      poster={posterSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="w-full h-full object-cover rounded-xl"
                      controls={false}
                    />
                    <motion.div
                      className="absolute inset-0 bg-black/30 rounded-xl"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={mediaSrc}
                      alt={title || 'Media content'}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <motion.div
                      className="absolute inset-0 bg-black/50 rounded-xl"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}

                <div className="flex flex-col items-center text-center relative z-10 mt-4"
                  style={{ opacity: Math.max(1 - scrollProgress * 3, 0) }}
                >
                  {date && (
                    <p className="text-2xl text-blue-200">
                      {date}
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`flex items-center justify-center text-center gap-4 w-full relative z-10 transition-none flex-col`}
              >
                <div className="flex flex-col items-center mb-8 relative h-64 justify-center">
                  <motion.div
                    className="flex flex-col items-center z-10 gap-3 md:gap-6"
                    style={{ transform: `scale(${1 + scrollProgress * 0.2})` }}
                  >
                    <h2 className="text-5xl md:text-7xl lg:text-[100px] font-extrabold text-white drop-shadow-2xl tracking-tight leading-none font-serif">
                      {title}
                    </h2>

                    <div className="grid grid-cols-1 grid-rows-1 place-items-center w-full mt-2">
                      {/* The subtitle that fades out */}
                      <motion.div
                        className="col-start-1 row-start-1"
                        style={{
                          opacity: Math.max(0, 1 - scrollProgress * 3),
                          pointerEvents: scrollProgress > 0.1 ? 'none' : 'auto',
                        }}
                      >
                        {scrollToExpand && (
                          <p className="text-xl md:text-2xl text-blue-100 font-medium tracking-wide drop-shadow-md max-w-2xl px-4 text-center">
                            {scrollToExpand}
                          </p>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            <motion.section
              className="flex flex-col w-full px-8 py-10 md:px-16 lg:py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandHero;
