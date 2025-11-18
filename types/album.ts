export interface NewReleaseTrack {
    id: string;
    uri: string;
    name: string;
    artistNames: string;
    albumName: string;
    albumImageUrl: string;
}

export interface SimplifiedArtist {
    name: string;
}

export interface SimplifiedAlbum {
    id: string;
    name: string;
    images: { url: string }[];
}

export interface SimplifiedTrack {
    id: string;
    name: string;
    uri: string;
    duration_ms: number;
    artists: SimplifiedArtist[];
}
