import type { PlayerState, Track } from "@/types/player";
import { createContext, useCallback, useContext, useState } from "react";

interface PlayerContextValue extends PlayerState {
    playTrack: (track: Track | null) => void; // ✅ Cho phép null
    togglePlayPause: () => void;
    playNext: () => void;
    playPrevious: () => void;
    seekTo: (position: number) => void;
    addToQueue: (track: Track) => void;
    removeFromQueue: (trackId: string) => void;
    toggleShuffle: () => void;
    toggleRepeat: () => void;
    clearPlayer: () => void; // ✅ Thêm function clear
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const [queue, setQueue] = useState<Track[]>([]);
    const [volume, setVolume] = useState(1);
    const [repeat, setRepeat] = useState<"off" | "track" | "context">("off");
    const [shuffle, setShuffle] = useState(false);

    const playTrack = useCallback((track: Track | null) => {
        if (!track) {
            setCurrentTrack(null);
            setIsPlaying(false);
            setPosition(0);
            setDuration(0);
            setQueue([]);
            return;
        }

        console.log("✅ Playing track:", track.name);
        setCurrentTrack(track);
        setIsPlaying(true);
        setPosition(0);
        setDuration(track.duration_ms);
    }, []);

    const clearPlayer = useCallback(() => {
        setCurrentTrack(null);
        setIsPlaying(false);
        setPosition(0);
        setDuration(0);
        setQueue([]);
    }, []);

    const togglePlayPause = useCallback(() => {
        console.log("⏯️ Toggle play/pause");
        setIsPlaying((prev) => !prev);
    }, []);

    const playNext = useCallback(() => {
        if (queue.length > 0) {
            const nextTrack = queue[0];
            setQueue((prev) => prev.slice(1));
            playTrack(nextTrack);
        }
    }, [queue, playTrack]);

    const playPrevious = useCallback(() => {
        if (position > 3000) {
            setPosition(0);
        }
    }, [position]);

    const seekTo = useCallback((pos: number) => {
        setPosition(pos);
    }, []);

    const addToQueue = useCallback((track: Track) => {
        console.log("➕ Add to queue:", track.name);
        setQueue((prev) => [...prev, track]);
    }, []);

    const removeFromQueue = useCallback((trackId: string) => {
        setQueue((prev) => prev.filter((t) => t.id !== trackId));
    }, []);

    const toggleShuffle = useCallback(() => {
        setShuffle((prev) => !prev);
    }, []);

    const toggleRepeat = useCallback(() => {
        setRepeat((prev) => {
            if (prev === "off") return "context";
            if (prev === "context") return "track";
            return "off";
        });
    }, []);

    return (
        <PlayerContext.Provider
            value={{
                currentTrack,
                isPlaying,
                position,
                duration,
                queue,
                volume,
                repeat,
                shuffle,
                playTrack,
                togglePlayPause,
                playNext,
                playPrevious,
                seekTo,
                addToQueue,
                removeFromQueue,
                toggleShuffle,
                toggleRepeat,
                clearPlayer,
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
}

export function usePlayer() {
    const context = useContext(PlayerContext);
    if (!context) {
        throw new Error("usePlayer phải dùng trong PlayerProvider");
    }
    return context;
}
