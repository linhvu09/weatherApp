import { apiClient } from "../api-client";
import type { Track } from "@/types/player";

class AlbumService {
    async getAlbumTracks(albumId: string): Promise<Track[]> {
        try {
            // Lấy thông tin album đầy đủ thay vì chỉ tracks
            const response = await apiClient.get(`/albums/${albumId}`);
            const album = response.data;

            return album.tracks.items.map((track: any) => ({
                ...track,
                album: {
                    id: album.id,
                    name: album.name,
                    images: album.images,
                },
            }));
        } catch (error) {
            console.error("Error fetching album tracks:", error);
            throw error;
        }
    }
}

export const albumService = new AlbumService();
