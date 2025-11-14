import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const userApiClient = axios.create({
    baseURL:
        process.env.EXPO_PUBLIC_USER_API_BASE_URL ||
        "https://music-be-bqgb.onrender.com",
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
    },
});

userApiClient.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("userToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

userApiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const status = error.response.status;

            if (status === 401) {
                console.error("Unauthorized - Token hết hạn hoặc không hợp lệ");
            } else if (status === 403) {
                console.error("Forbidden - Không có quyền truy cập");
            } else if (status === 404) {
                console.error("Not Found - Endpoint không tồn tại");
            } else if (status >= 500) {
                console.error("Server Error - Backend đang gặp sự cố");
            } else {
                console.error("API Error:", error.response.data);
            }
        } else if (error.request) {
            console.error(
                "Network Error - Không kết nối được backend:",
                error.message,
            );
        } else {
            console.error("Error:", error.message);
        }
        return Promise.reject(error);
    },
);
