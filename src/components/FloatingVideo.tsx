import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FloatingVideoProps {
  videoUrl: string;
}

export function FloatingVideo({ videoUrl }: FloatingVideoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isScaling, setIsScaling] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [videoRatio, setVideoRatio] = useState(16 / 9);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  const expandedW = Math.min(360, Math.round(320 * videoRatio));
  const expandedH = Math.round(expandedW / videoRatio);

  return (
    <>
      <AnimatePresence>
        {isScaling && (
          <motion.div
            key="fullscreen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            onClick={() => setIsScaling(false)}
          >
            <video
              ref={videoRef}
              src={videoUrl}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onClick={(e) => { e.stopPropagation(); togglePlay(); }}
              className="max-h-full max-w-full object-contain rounded-2xl"
            />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
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
                onClick={(e) => { e.stopPropagation(); setIsScaling(false); }}
                className="h-10 w-10 rounded-full bg-white/20 backdrop-blur text-white grid place-items-center hover:bg-white/30 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3" /></svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, width: 160, height: 160 / videoRatio }}
        animate={{
          opacity: 1,
          width: isHovered ? expandedW : 160,
          height: isHovered ? expandedH : 160 / videoRatio,
          borderRadius: 16,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed bottom-4 right-4 z-40 overflow-hidden bg-black shadow-2xl border border-white/20"
        style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
      >
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          onClick={togglePlay}
          onLoadedMetadata={() => {
            if (videoRef.current) {
              setVideoRatio(videoRef.current.videoWidth / videoRef.current.videoHeight);
            }
          }}
          className="absolute inset-0 h-full w-full object-cover bg-black"
        />

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 flex flex-col justify-between p-2 pointer-events-none"
            >
              <div className="flex justify-end pointer-events-auto">
                <button
                  onClick={(e) => { e.stopPropagation(); setIsScaling(true); }}
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

        {!isHovered && !isPlaying && (
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
