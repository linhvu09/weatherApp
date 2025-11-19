export type SpotifyImage = {
    url: string;
    height: number | null;
    width: number | null;
};

export type SpotifyArtist = {
    id: string;
    name: string;
};

export type SpotifyAlbum = {
    id: string;
    name: string;
    images: SpotifyImage[];
};

export type SpotifyTrack = {
    id: string;
    name: string;
    artists: SpotifyArtist[];
    album: SpotifyAlbum;
    duration_ms: number;
    preview_url: string | null;
};

export type PlaylistTrackItem = {
    track: SpotifyTrack | null;
    added_at: string;
};

export type SpotifyPlaylist = {
    id: string;
    name: string;
    description: string;
    images: SpotifyImage[];
    public: boolean;
    tracks: {
        href: string;
        items: PlaylistTrackItem[];
        limit: number;
        next: string | null;
        offset: number;
        total: number;
    };
};

export type SimplifiedTrack = {
    id: string;
    title: string;
    artistName: string;
    imageUrl: string | null;
    duration: number;
};
