import axios from "axios";
import { getSpotifyToken } from "./spotify-token";

export const apiClient = axios.create({
    baseURL:
        process.env.EXPO_PUBLIC_API_BASE_URL || "https://api.spotify.com/v1",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(
    async (config) => {
        const token = await getSpotifyToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                console.error("Token Spotify đã hết hạn hoặc không hợp lệ.");
            }
            console.error("API Lỗi:", error.response.data);
        } else if (error.request) {
            console.error("Lỗi Mạng:", error.message);
        } else {
            console.error("Lỗi:", error.message);
        }
        return Promise.reject(error);
    },
);
