// types/artist.ts
export interface Artist {
  id: string;
  name: string;
  href: string;
}

export interface ArtistSearchParams {
  searchText: string;
  page?: number;
  size?: number;
}

export interface ArtistSearchResponse {
  content: Artist[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface GetArtistsParams {
  ids: string[];
}

export interface GetArtistsResponse {
  content: Artist[];
}
