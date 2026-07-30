import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FloatingVideoProps {
  videoUrl: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function FloatingVideo({ videoUrl }: FloatingVideoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoRatio, setVideoRatio] = useState(16 / 9);
  const [touchHover, setTouchHover] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const touchTimer = useRef<ReturnType<typeof setTimeout>>();
  const hoverLock = useRef(false);

  useEffect(() => {
    return () => {
      if (touchTimer.current) clearTimeout(touchTimer.current);
    };
  }, []);

  const showControlsTemporarily = useCallback(() => {
    setTouchHover(true);
    if (touchTimer.current) clearTimeout(touchTimer.current);
    touchTimer.current = setTimeout(() => setTouchHover(false), 3000);
  }, []);

  const showHover = isHovered || touchHover;

  const handleHoverStart = useCallback(() => {
    setIsHovered(true); hoverLock.current = false;
  }, []);

  const handleHoverEnd = useCallback(() => {
    if (!hoverLock.current) { setIsHovered(false); setTouchHover(false); }
  }, []);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setIsPlaying(true); }
    else { v.pause(); setIsPlaying(false); }
    showControlsTemporarily();
  }, [showControlsTemporarily]);

  const expandedW = Math.min(360, Math.round(320 * videoRatio), window.innerWidth - 32);
  const expandedH = Math.round(expandedW / videoRatio);

  return (
    <>
      <div ref={constraintsRef} className="fixed inset-0 z-40 pointer-events-none" />
      <motion.div
        layout
        drag
        dragMomentum
        dragElastic={0.2}
        dragConstraints={constraintsRef}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        onDragEnd={() => {
          if (touchTimer.current) clearTimeout(touchTimer.current);
        }}
        onTap={() => showControlsTemporarily()}
        initial={{ opacity: 0, scale: 0, bottom: 16, right: 16 }}
        animate={
          showHover
            ? { bottom: 16, right: 16, width: expandedW, height: expandedH, borderRadius: 16, opacity: 1, scale: 1 }
            : { bottom: 16, right: 16, width: 160, height: 160 / videoRatio, borderRadius: 16, opacity: 1, scale: 1 }
        }
        transition={{ type: "spring", stiffness: 350, damping: 30, mass: 1.2 }}
        className="fixed z-50 overflow-hidden bg-black shadow-2xl border border-white/20 cursor-grab active:cursor-grabbing"
        style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
      >
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          onClick={(e) => { e.stopPropagation(); togglePlay(); }}
          onMouseEnter={() => { hoverLock.current = true; }}
          onMouseLeave={() => { hoverLock.current = false; }}
          onLoadedMetadata={() => {
            if (videoRef.current) {
              setVideoRatio(videoRef.current.videoWidth / videoRef.current.videoHeight);
            }
          }}
          className="h-full w-full object-contain"
        />

        {/* Controls (shown when hovered/touched) */}
        <AnimatePresence>
          {showHover && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 flex items-center justify-center p-2 pointer-events-none"
            >
              <div className="pointer-events-auto">
                <button
                  onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                  className="h-9 w-9 rounded-full bg-black/60 backdrop-blur text-white grid place-items-center hover:bg-black/80 transition-colors"
                >
                  {isPlaying ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Paused overlay (minimized, not playing) */}
        {!showHover && !isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="h-9 w-9 rounded-full bg-black/60 text-white grid place-items-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}