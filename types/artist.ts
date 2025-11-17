// Get Artist's Albums Types
export interface GetArtistAlbumsParams {
    id: string;
    include_groups?: "album" | "single" | "appears_on" | "compilation" | string;
    market?: string;
    limit?: number;
    offset?: number;
}

export interface ImageObject {
    url: string;
    height: number;
    width: number;
}

export interface ExternalUrls {
    spotify: string;
}

export interface SimplifiedArtistObject {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    type: "artist";
    uri: string;
}

export interface Restrictions {
    reason: "market" | "product" | "explicit";
}

export interface SimplifiedAlbumObject {
    album_type: "album" | "single" | "compilation";
    total_tracks: number;
    available_markets: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: ImageObject[];
    name: string;
    release_date: string;
    release_date_precision: "year" | "month" | "day";
    restrictions?: Restrictions;
    type: "album";
    uri: string;
    artists: SimplifiedArtistObject[];
    album_group: "album" | "single" | "compilation" | "appears_on";
}

export interface GetArtistAlbumsResponse {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: SimplifiedAlbumObject[];
}
