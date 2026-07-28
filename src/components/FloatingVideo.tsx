import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface FloatingVideoProps {
  videoUrl: string;
}

export function FloatingVideo({ videoUrl }: FloatingVideoProps) {
  const [isMinimized, setIsMinimized] = useState(true);
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

  const toggleScale = useCallback(() => {
    setIsScaling((prev) => !prev);
  }, []);

  const handleClick = useCallback(() => {
    if (isMinimized) {
      setIsMinimized(false);
    }
  }, [isMinimized]);

  const videoWidth = Math.min(360, Math.round(320 * videoRatio));
  const videoHeight = Math.round(videoWidth / videoRatio);

  return (
    <motion.div
      drag={isMinimized && !isScaling}
      dragMomentum={false}
      dragElastic={0.1}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={
        isScaling
          ? { width: "80vw", height: "80vh", borderRadius: 0, opacity: 1, scale: 1, x: 0, y: 0 }
          : isMinimized
          ? { width: 160, height: 160 / videoRatio, borderRadius: 16, opacity: 0.9, scale: 1 }
          : { width: videoWidth, height: videoHeight, borderRadius: 16, opacity: 1, scale: 1 }
      }
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className={`fixed z-50 overflow-hidden bg-black shadow-2xl border border-white/20 cursor-pointer group ${
        isScaling ? "inset-0 m-auto" : isMinimized ? "bottom-4 right-4" : "bottom-20 right-6"
      }`}
      style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
      onClick={isMinimized ? handleClick : undefined}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        onLoadedMetadata={() => {
          if (videoRef.current) {
            setVideoRatio(videoRef.current.videoWidth / videoRef.current.videoHeight);
          }
        }}
        className="h-full w-full object-cover bg-black pointer-events-none"
      />

      {!isMinimized && (
        <div className="absolute inset-0 flex flex-col justify-between p-2 pointer-events-none">
          <div className="flex justify-end pointer-events-auto">
            <button
              onClick={(e) => { e.stopPropagation(); toggleScale(); }}
              className="h-7 w-7 rounded-full bg-black/60 backdrop-blur text-white grid place-items-center text-xs hover:bg-black/80 transition-colors"
            >
              {isScaling ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3" /></svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" /></svg>
              )}
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
            {isScaling && (
              <button
                onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                className="h-9 w-9 rounded-full bg-black/60 backdrop-blur text-white grid place-items-center hover:bg-black/80 transition-colors"
              >
                {isMuted ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" /></svg>
                )}
              </button>
            )}
          </div>
        </div>
      )}

      {isMinimized && (
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3" /></svg>
        </div>
      )}
    </motion.div>
  );
}
