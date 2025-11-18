import { apiClient } from "@/services/api-client";
import type { SearchParams } from "@/types/search";

export async function searchSpotify(params: SearchParams) {
    const { q, type, limit = 20, offset = 0, market = "VN" } = params;

    const res = await apiClient.get("/search", {
        params: {
            q,
            type,
            limit,
            offset,
            market,
        },
    });

    return res.data;
}
