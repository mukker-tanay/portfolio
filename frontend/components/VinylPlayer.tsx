'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Disc } from 'lucide-react';

const TRACKS = [
    { title: "Blinding Lights", url: "/music/blinding-lights.mp3" },
    { title: "Summer of 69", url: "/music/summer-of-69.mp3" },
    { title: "Dil Hi Toh Hai", url: "/music/dil-hi-toh-hai.mp3" }
];

export default function VinylPlayer() {
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTrack, setCurrentTrack] = useState(1);
    const [isMuted, setIsMuted] = useState(true);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Create audio instance
        const audio = new Audio(TRACKS[currentTrack].url);
        audio.loop = true;
        audio.volume = 0.2; // Set direct volume, handle mute separately via muted prop if possible or manual set
        audioRef.current = audio;

        // Error handling
        audio.addEventListener('error', (e) => {
            console.error("Audio Load Error:", e);
            setIsPlaying(false);
        });

        // Cleanup
        return () => {
            audio.pause();
            audioRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (!audioRef.current) return;
        
        // Handle track change
        const wasPlaying = isPlaying;
        if (audioRef.current.src !== TRACKS[currentTrack].url) {
            audioRef.current.src = TRACKS[currentTrack].url;
            if (wasPlaying) {
                audioRef.current.play().catch(e => console.error("Play error:", e));
            }
        }
    }, [currentTrack]);

    useEffect(() => {
        if (!audioRef.current) return;

        if (isPlaying) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error("Autoplay prevented or error:", error);
                    setIsPlaying(false);
                });
            }
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        if (!audioRef.current) return;
        // Simple mute/unmute without complex fading ensuring reliability
        audioRef.current.volume = isMuted ? 0 : 0.4;
    }, [isMuted]);

    const togglePlay = () => {
        if (isMuted) setIsMuted(false); 
        setIsPlaying(!isPlaying);
    };

    const nextTrack = () => {
        setCurrentTrack((prev) => (prev + 1) % TRACKS.length);
    };

    return (
        <div className="fixed bottom-8 left-8 z-40 flex items-center gap-4">
            {/* Spinning Record Visual - Using CSS 3D for simpler foreground integration than R3F canvas layering */}
            <div 
                className={`relative w-24 h-24 rounded-full bg-neutral-900 border border-neutral-800 shadow-2xl flex items-center justify-center transition-transform duration-5000 ${isPlaying ? 'animate-spin-slow' : ''}`}
                style={{ animationDuration: '3s' }}
                onClick={togglePlay}
            >
                {/* Vinyl Grooves */}
                <div className="absolute inset-2 rounded-full border border-neutral-800 opacity-50" />
                <div className="absolute inset-4 rounded-full border border-neutral-800 opacity-50" />
                <div className="absolute inset-6 rounded-full border border-neutral-800 opacity-50" />
                
                {/* Label */}
                <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-black" />
                </div>

                {/* Play/Pause Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/40 rounded-full transition-opacity cursor-pointer">
                    {isPlaying ? <Pause className="w-8 h-8 text-neutral-100" /> : <Play className="w-8 h-8 text-neutral-100" />}
                </div>
            </div>

            {/* Controls */}
            {isPlaying && (
                <div className="flex flex-col gap-1 animate-in fade-in slide-in-from-left-4 duration-500">
                    <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Now Playing</span>
                    <span className="text-sm font-medium text-neutral-200 cursor-pointer hover:underline" onClick={nextTrack}>
                        {TRACKS[currentTrack].title}
                    </span>
                    <button 
                        onClick={() => setIsMuted(!isMuted)}
                        className="text-xs text-neutral-500 hover:text-neutral-300 text-left"
                    >
                        {isMuted ? 'Unmute' : 'Mute'}
                    </button>
                </div>
            )}
            
            <style jsx global>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin linear infinite;
                }
            `}</style>
        </div>
    );
}
