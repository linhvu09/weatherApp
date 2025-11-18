export interface Song {
    id: string;
    title: string;
    artist: string;
    album?: string;
    coverUrl: string;
    duration: number;
    preview_url?: string;
}

export interface LibraryCategory {
    id: string;
    title: string;
    count: number;
    icon: string;
    route: string;
}
