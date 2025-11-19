import axios from "axios";

const YOUTUBE_API_KEY =
    process.env.EXPO_PUBLIC_YOUTUBE_API_KEY || "YOUR_YOUTUBE_API_KEY";

class YouTubeService {
    /**
     * Tìm video ID của bài hát trên YouTube
     * @param trackName Tên bài hát
     * @param artistName Tên nghệ sĩ
     * @returns YouTube video ID
     */
    async searchTrack(
        trackName: string,
        artistName: string,
    ): Promise<string | null> {
        try {
            const query = `${trackName} ${artistName} official audio`;
            const response = await axios.get(
                "https://www.googleapis.com/youtube/v3/search",
                {
                    params: {
                        part: "snippet",
                        q: query,
                        type: "video",
                        maxResults: 1,
                        videoCategoryId: "10", // Music category
                        key: YOUTUBE_API_KEY,
                    },
                },
            );

            if (response.data.items && response.data.items.length > 0) {
                return response.data.items[0].id.videoId;
            }

            return null;
        } catch (error) {
            console.error("Error searching YouTube:", error);
            // Fallback: extract video ID từ search query trực tiếp
            return this.fallbackSearch(trackName, artistName);
        }
    }

    /**
     * Phương án dự phòng: Tìm kiếm không cần API key
     * Sử dụng web scraping hoặc alternative method
     */
    private async fallbackSearch(
        trackName: string,
        artistName: string,
    ): Promise<string | null> {
        try {
            // Có thể dùng youtube-search-without-api-key hoặc methods khác
            console.log("Using fallback search for:", trackName, artistName);
            return null;
        } catch (error) {
            console.error("Fallback search failed:", error);
            return null;
        }
    }
}

export const youtubeService = new YouTubeService();
