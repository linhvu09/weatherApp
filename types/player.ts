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

export interface TrackMockData {
    _id: string;
    id: string;
    name: string;
    album: string;
    album_id: string;
    artists: string[]; // mảng string
    artist_ids: string[]; // mảng string
    track_number: number;
    disc_number: number;
    explicit: boolean;
    year: number;
    release_date: string; // ISO date dạng string
    preview_url: string;
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
