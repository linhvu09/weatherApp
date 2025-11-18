import { apiClient } from "../api-client";

interface AlbumTrack {
    id: string;
    name: string;
    duration_ms: number;
    preview_url: string | null;
    track_number: number;
    artists: {
        id: string;
        name: string;
    }[];
}

interface GetAlbumTracksResponse {
    items: AlbumTrack[];
    total: number;
}

class AlbumService {
    async getAlbumTracks(albumId: string): Promise<AlbumTrack[]> {
        try {
            const response = await apiClient.get<{
                tracks: GetAlbumTracksResponse;
            }>(`/albums/${albumId}`);
            return response.data.tracks.items;
        } catch (error) {
            console.error("Lỗi khi lấy tracks từ album:", error);
            return [];
        }
    }
}

export const albumService = new AlbumService();
