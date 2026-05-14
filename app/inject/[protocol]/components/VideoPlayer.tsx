'use client';

import { useRef, useState } from 'react';
import { ProtocolContent } from '@/lib/protocols/types';

interface VideoPlayerProps {
  protocol: ProtocolContent;
}

export function VideoPlayer({ protocol }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideo] = useState(false); // Set to true when real videos are available
  const [isPlaying, setIsPlaying] = useState(false);

  const chapters = [
    { time: '0:00', label: 'Setup and preparation' },
    { time: '0:30', label: 'Site preparation' },
    { time: '1:00', label: 'Injection technique' },
    { time: '1:30', label: 'Aftercare' },
  ];

  function handlePlay() {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }

  function handlePause() {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }

  if (!hasVideo) {
    return (
      <section className="bg-zinc-950 py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <p className="eyebrow mb-3">Video Guide</p>
          <h2 className="text-headline text-champagne mb-6">Demonstration</h2>

          <div className="relative aspect-video rounded-lg border border-steel/30 bg-ink overflow-hidden flex items-center justify-center">
            <div className="text-center px-6">
              <svg width="48" height="48" viewBox="0 0 48 48" className="mx-auto mb-4 text-brass/40">
                <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <polygon points="20,16 34,24 20,32" fill="currentColor" />
              </svg>
              <p className="text-champagne/80 font-display text-lg mb-2">
                Video demonstration
              </p>
              <p className="text-brass/50 text-sm max-w-sm mx-auto">
                Filming in production. Contact your care team for a live walkthrough of this injection technique.
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            {chapters.map((ch) => (
              <span key={ch.time} className="text-xs text-brass/40 font-mono">
                {ch.time} {ch.label}
              </span>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-zinc-950 py-12 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <p className="eyebrow mb-3">Video Guide</p>
        <h2 className="text-headline text-champagne mb-6">Demonstration</h2>

        <div className="relative aspect-video rounded-lg border border-steel/30 bg-ink overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            poster={protocol.videoPoster}
            controls
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src={protocol.videoUrl} type="video/mp4" />
            <track kind="captions" src="/inject/videos/captions.vtt" label="English" default />
          </video>

          {!isPlaying && (
            <button
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors"
              aria-label="Play video"
            >
              <svg width="64" height="64" viewBox="0 0 64 64" className="text-champagne">
                <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <polygon points="26,20 46,32 26,44" fill="currentColor" />
              </svg>
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          {chapters.map((ch) => (
            <span key={ch.time} className="text-xs text-brass/50 font-mono">
              {ch.time} {ch.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
