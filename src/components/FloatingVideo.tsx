import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FloatingVideoProps {
  videoUrl: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function FloatingVideo({ videoUrl }: FloatingVideoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isScaling, setIsScaling] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
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
    if (!isScaling) { setIsHovered(true); hoverLock.current = false; }
  }, [isScaling]);

  const handleHoverEnd = useCallback(() => {
    if (!isScaling && !hoverLock.current) { setIsHovered(false); setTouchHover(false); }
  }, [isScaling]);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setIsPlaying(true); }
    else { v.pause(); setIsPlaying(false); }
    showControlsTemporarily();
  }, [showControlsTemporarily]);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  }, []);

  const enterFullscreen = useCallback(() => {
    setIsScaling(true);
    setTouchHover(false);
    setIsHovered(false);
  }, []);

  const exitFullscreen = useCallback(() => {
    setIsScaling(false);
  }, []);

  const expandedW = Math.min(360, Math.round(320 * videoRatio), window.innerWidth - 32);
  const expandedH = Math.round(expandedW / videoRatio);

  return (
    <>
      <div ref={constraintsRef} className="fixed inset-0 z-40 pointer-events-none" />
      <motion.div
        layout
        drag={!isScaling}
        dragMomentum
        dragElastic={0.2}
        dragConstraints={constraintsRef}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        onDragEnd={() => {
          if (touchTimer.current) clearTimeout(touchTimer.current);
        }}
        onTap={() => { if (!isScaling) showControlsTemporarily(); }}
        initial={{ opacity: 0, scale: 0 }}
        animate={
          isScaling
            ? { top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%", borderRadius: 0, opacity: 1, scale: 1 }
            : showHover
            ? { bottom: 16, right: 16, width: expandedW, height: expandedH, borderRadius: 16, opacity: 1, scale: 1 }
            : { bottom: 16, right: 16, width: 160, height: 160 / videoRatio, borderRadius: 16, opacity: 1, scale: 1 }
        }
        transition={{ type: "spring", stiffness: 350, damping: 30, mass: 1.2 }}
        className="fixed z-50 overflow-hidden bg-black shadow-2xl border border-white/20 cursor-grab active:cursor-grabbing"
        style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
      >
        <AnimatePresence>
          {isScaling && (
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 -z-10 bg-black/80"
              onClick={exitFullscreen}
            />
          )}
        </AnimatePresence>

        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          loop
          muted={isMuted}
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

        {/* Floating controls (shown when hovered/touched, not fullscreen) */}
        <AnimatePresence>
          {!isScaling && showHover && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 flex flex-col justify-between p-2 pointer-events-none"
            >
              <div className="flex justify-end pointer-events-auto">
                <button
                  onClick={(e) => { e.stopPropagation(); enterFullscreen(); }}
                  className="h-7 w-7 rounded-full bg-black/60 backdrop-blur text-white grid place-items-center text-xs hover:bg-black/80 transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" /></svg>
                </button>
              </div>
              <div className="flex justify-center gap-3 pointer-events-auto">
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

        {/* Fullscreen controls */}
        {isScaling && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
            <button
              onClick={(e) => { e.stopPropagation(); togglePlay(); }}
              className="h-10 w-10 rounded-full bg-white/20 backdrop-blur text-white grid place-items-center hover:bg-white/30 transition-colors"
            >
              {isPlaying ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
              )}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); toggleMute(); }}
              className="h-10 w-10 rounded-full bg-white/20 backdrop-blur text-white grid place-items-center hover:bg-white/30 transition-colors"
            >
              {isMuted ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" /></svg>
              )}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); exitFullscreen(); }}
              className="h-10 w-10 rounded-full bg-white/20 backdrop-blur text-white grid place-items-center hover:bg-white/30 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3" /></svg>
            </button>
          </div>
        )}

        {/* Paused overlay (minimized, not playing) */}
        {!isScaling && !showHover && !isPlaying && (
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