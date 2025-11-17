import type {
    GetArtistAlbumsParams,
    GetArtistAlbumsResponse,
} from "@/types/artist";
import { apiClient } from "../api-client";

class ArtistService {
    async getArtistAlbums(
        params: GetArtistAlbumsParams,
    ): Promise<GetArtistAlbumsResponse> {
        if (!params.id || params.id.trim().length === 0) {
            throw new Error("ID nghệ sĩ không được để trống");
        }

        // Validate limit
        if (params.limit !== undefined) {
            if (params.limit < 1 || params.limit > 50) {
                throw new Error("Limit phải từ 1 đến 50");
            }
        }

        // Validate offset
        if (params.offset !== undefined && params.offset < 0) {
            throw new Error("Offset không được âm");
        }

        // Validate include_groups
        if (params.include_groups) {
            const validGroups = [
                "album",
                "single",
                "appears_on",
                "compilation",
            ];
            const groups = params.include_groups
                .split(",")
                .map((g) => g.trim());
            const invalidGroups = groups.filter(
                (g) => !validGroups.includes(g),
            );

            if (invalidGroups.length > 0) {
                throw new Error(
                    `Include_groups không hợp lệ: ${invalidGroups.join(", ")}. ` +
                        `Chỉ chấp nhận: ${validGroups.join(", ")}`,
                );
            }
        }

        try {
            const response = await apiClient.get<GetArtistAlbumsResponse>(
                `/artists/${params.id}/albums`,
                {
                    params: {
                        include_groups: params.include_groups,
                        market: params.market,
                        limit: params.limit ?? 20,
                        offset: params.offset ?? 0,
                    },
                },
            );

            return response.data;
        } catch (error: any) {
            if (error.response?.status === 404) {
                throw new Error("Không tìm thấy nghệ sĩ");
            }
            console.error("Lỗi khi tải albums của nghệ sĩ:", error);
            throw error;
        }
    }
}

export const artistService = new ArtistService();
