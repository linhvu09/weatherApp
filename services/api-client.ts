import axios from "axios";

const API_BASE_URL = "https://api.reccobeats.com/v1";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // Thêm token nếu có
    // const token = await getToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
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
      console.error("API Lỗi:", error.response.data);
    } else if (error.request) {
      console.error("Lỗi Mạng:", error.message);
    } else {
      console.error("Lỗi:", error.message);
    }
    return Promise.reject(error);
  },
);
