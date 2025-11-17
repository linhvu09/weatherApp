import { useState } from "react";
import { searchSpotify } from "@/services/search/search";

export function useSearch() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    async function onSearch(query: string) {
        if (!query) return;

        try {
            setLoading(true);

            const data = await searchSpotify({
                q: query,
                type: "track,artist", // muốn trả về gì thì thêm ở đây
                limit: 20,
            });

            setResult(data);
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setLoading(false);
        }
    }

    return { result, loading, onSearch };
}
