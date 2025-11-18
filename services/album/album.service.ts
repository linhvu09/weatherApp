import {
    NewReleaseTrack,
    SimplifiedAlbum,
    SimplifiedTrack,
} from "@/types/album";
import { apiClient } from "../api-client";

const MAX_ALBUMS = 15;
const MAX_TRACKS_PER_ALBUM = 10;
const TARGET_MARKET = "VN";

class AlbumService {
    async fetchNewReleaseTracks(): Promise<NewReleaseTrack[]> {
        try {
            const newReleasesRes = await apiClient.get<{
                albums: { items: SimplifiedAlbum[] };
            }>(
                `/browse/new-releases?limit=${MAX_ALBUMS}&country=${TARGET_MARKET}`,
            );

            const newAlbums = newReleasesRes.data.albums.items;
            const allNewTracks: NewReleaseTrack[] = [];

            const trackPromises = newAlbums.map(async (album) => {
                try {
                    const tracksRes = await apiClient.get<{
                        items: SimplifiedTrack[];
                    }>(
                        `/albums/${album.id}/tracks?limit=${MAX_TRACKS_PER_ALBUM}`,
                    );

                    return tracksRes.data.items.map(
                        (track: SimplifiedTrack) => ({
                            id: track.id,
                            uri: track.uri,
                            name: track.name,
                            artistNames: track.artists
                                .map((a) => a.name)
                                .join(", "),
                            albumName: album.name,
                            albumImageUrl: album.images[0]?.url || "",
                        }),
                    );
                } catch (error) {
                    console.error(
                        `Lỗi khi lấy tracks cho album ${album.name}:`,
                        error,
                    );
                    return [];
                }
            });

            const results = await Promise.all(trackPromises);
            results.forEach((tracksArray) => allNewTracks.push(...tracksArray));

            return allNewTracks;
        } catch (error) {
            console.error("Lỗi khi fetch New Releases Tracks:", error);
            return [];
        }
    }
}

export const albumService = new AlbumService();
