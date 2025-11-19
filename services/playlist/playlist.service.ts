import {
    PlaylistTrackItem,
    SimplifiedTrack,
    SpotifyPlaylist,
} from "@/types/playlist";
import { apiClient } from "../api-client";

const mapToSimplifiedTrack = (
    trackItem: PlaylistTrackItem,
): SimplifiedTrack | null => {
    const track = trackItem.track;

    if (!track) {
        return null;
    }

    const artistName = track.artists.map((artist) => artist.name).join(", ");
    const imageUrl = track.album.images[0]?.url || null;

    return {
        id: track.id,
        title: track.name,
        artistName: artistName,
        imageUrl: imageUrl,
        duration: track.duration_ms,
    };
};

class PlaylistService {
    async getPlaylistTracks(playlistId: string): Promise<SimplifiedTrack[]> {
        try {
            const endpoint = `/playlists/${playlistId}`;

            const response = await apiClient.get<SpotifyPlaylist>(endpoint, {
                params: {
                    fields: "id,name,images,tracks(items(track(id,name,artists(name),album(images),duration_ms)))",
                    limit: 100,
                },
            });

            const playlistData = response.data;
            const trackItems = playlistData.tracks.items;

            const simplifiedTracks: SimplifiedTrack[] = trackItems
                .map(mapToSimplifiedTrack)
                .filter((track): track is SimplifiedTrack => track !== null);

            return simplifiedTracks;
        } catch (error) {
            console.error(
                "Lỗi trong PlaylistService.getPlaylistTracks:",
                error,
            );
            return [];
        }
    }
}

export const playlistService = new PlaylistService();
