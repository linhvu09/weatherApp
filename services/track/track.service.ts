import { TrackMockData } from "@/types/player";
import { userApiClient } from "../api-user-be";

export class TrackService {
    async getTrackById(trackId: string): Promise<TrackMockData> {
        try {
            const response = await userApiClient.get(`api/tracks/${trackId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching track:", error);
            throw error;
        }
    }
}
export const trackService = new TrackService();
