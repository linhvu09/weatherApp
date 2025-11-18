import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const STORAGE_KEY = "search_history";

export function useSearchHistory() {
    const [history, setHistory] = useState<string[]>([]);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        if (data) setHistory(JSON.parse(data));
    };

    const addHistory = async (keyword: string) => {
        if (!keyword.trim()) return;

        const updated = [
            keyword,
            ...history.filter((item) => item !== keyword),
        ];

        setHistory(updated);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    const removeHistoryItem = async (keyword: string) => {
        const updated = history.filter((item) => item !== keyword);
        setHistory(updated);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    const clearHistory = async () => {
        setHistory([]);
        await AsyncStorage.removeItem(STORAGE_KEY);
    };

    return { history, addHistory, removeHistoryItem, clearHistory };
}
