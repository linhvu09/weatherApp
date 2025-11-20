import AsyncStorage from "@react-native-async-storage/async-storage";

export interface FollowedArtist {
    id: string;
    name: string;
    imageUrl: string;
    followedAt: string;
}

const STORAGE_KEY = "followedArtists";

class FollowingService {
    /**
     * Lấy danh sách nghệ sĩ đã follow
     */
    async getFollowedArtists(): Promise<FollowedArtist[]> {
        try {
            const data = await AsyncStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error("Error getting followed artists:", error);
            return [];
        }
    }

    /**
     * Kiểm tra đã follow nghệ sĩ chưa
     */
    async isFollowing(artistId: string): Promise<boolean> {
        try {
            const artists = await this.getFollowedArtists();
            return artists.some((a) => a.id === artistId);
        } catch (error) {
            console.error("Error checking follow status:", error);
            return false;
        }
    }

    /**
     * Follow nghệ sĩ
     */
    async followArtist(artist: {
        id: string;
        name: string;
        imageUrl: string;
    }): Promise<void> {
        try {
            const artists = await this.getFollowedArtists();

            // Kiểm tra đã follow chưa
            if (artists.some((a) => a.id === artist.id)) {
                return;
            }

            const newArtist: FollowedArtist = {
                ...artist,
                followedAt: new Date().toISOString(),
            };

            const updatedArtists = [newArtist, ...artists];
            await AsyncStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(updatedArtists),
            );

            console.log("✅ Followed:", artist.name);
        } catch (error) {
            console.error("Error following artist:", error);
            throw error;
        }
    }

    /**
     * Unfollow nghệ sĩ
     */
    async unfollowArtist(artistId: string): Promise<void> {
        try {
            const artists = await this.getFollowedArtists();
            const updatedArtists = artists.filter((a) => a.id !== artistId);

            await AsyncStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(updatedArtists),
            );

            console.log("❌ Unfollowed:", artistId);
        } catch (error) {
            console.error("Error unfollowing artist:", error);
            throw error;
        }
    }

    /**
     * Toggle follow status
     */
    async toggleFollow(artist: {
        id: string;
        name: string;
        imageUrl: string;
    }): Promise<boolean> {
        const isFollowing = await this.isFollowing(artist.id);

        if (isFollowing) {
            await this.unfollowArtist(artist.id);
            return false;
        } else {
            await this.followArtist(artist);
            return true;
        }
    }

    /**
     * Đếm số nghệ sĩ đã follow
     */
    async getFollowingCount(): Promise<number> {
        const artists = await this.getFollowedArtists();
        return artists.length;
    }
}

export const followingService = new FollowingService();
