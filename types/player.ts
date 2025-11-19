// types/player.ts
export interface Track {
    id: string;
    name: string;
    artists: {
        id: string;
        name: string;
    }[];
    album: {
        id: string;
        name: string;
        images: {
            url: string;
            height: number;
            width: number;
        }[];
    };
    duration_ms: number;
    preview_url?: string;
    uri: string;
    youtubeId?: string; // Thêm YouTube video ID
}

export interface PlayerState {
    currentTrack: Track | null;
    isPlaying: boolean;
    position: number;
    duration: number;
    queue: Track[];
    volume: number;
    repeat: "off" | "track" | "context";
    shuffle: boolean;
    youtubeId?: string; // Thêm YouTube video ID cho player
}
