import type {
    AuthResponse,
    LoginCredentials,
    RegisterData,
    User,
} from "@/types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import { userApiClient } from "../api-user-be";

WebBrowser.maybeCompleteAuthSession();

class AuthService {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        try {
            const response = await userApiClient.post(
                "/api/auth/login",
                credentials,
            );

            const { token, user } = response.data.data;

            await AsyncStorage.setItem("userToken", token);
            await AsyncStorage.setItem("user", JSON.stringify(user));

            return { token, user };
        } catch (error: any) {
            console.error(
                "Lỗi đăng nhập:",
                error.response?.data || error.message,
            );

            if (error.response?.status === 401) {
                throw new Error("Tên đăng nhập hoặc mật khẩu không đúng");
            }

            throw new Error(
                error.response?.data?.message || "Đăng nhập thất bại",
            );
        }
    }

    async register(data: RegisterData): Promise<AuthResponse> {
        try {
            const response = await userApiClient.post<any>(
                "/api/auth/register",
                data,
            );

            const { token, user } = response.data?.data;

            if (!token || !user) {
                throw new Error("Backend không trả về token hoặc user");
            }

            await AsyncStorage.setItem("userToken", token);
            await AsyncStorage.setItem("user", JSON.stringify(user));
            return { token, user };
        } catch (error: any) {
            if (error.response?.status === 400) {
                throw new Error("Tên đăng nhập hoặc email đã tồn tại");
            }

            throw new Error(
                error.response?.data?.message || "Đăng ký thất bại",
            );
        }
    }

    async loginWithGoogle(): Promise<AuthResponse> {
        try {
            const baseUrl = userApiClient.defaults.baseURL;
            const authUrl = `${baseUrl}/api/auth/google`;
            const appRedirect = "musicapp://auth/callback";

            const result = await WebBrowser.openAuthSessionAsync(
                authUrl,
                appRedirect,
            );

            if (result.type === "success") {
                console.log("Success URL:", result.url);

                const url = new URL(result.url);
                const token = url.searchParams.get("token");
                const userParam = url.searchParams.get("user");
                const error = url.searchParams.get("error");

                if (error) {
                    throw new Error(decodeURIComponent(error));
                }

                if (!token || !userParam) {
                    throw new Error("Không nhận được thông tin từ Google");
                }

                const user: User = JSON.parse(decodeURIComponent(userParam));

                await AsyncStorage.setItem("userToken", token);
                await AsyncStorage.setItem("user", JSON.stringify(user));

                return { token, user };
            } else if (result.type === "cancel") {
                throw new Error("Đã hủy đăng nhập");
            } else {
                throw new Error("Đăng nhập Google thất bại");
            }
        } catch (error: any) {
            console.error("Lỗi đăng nhập Google:", error.message);
            throw error;
        }
    }

    async loginWithFacebook(): Promise<AuthResponse> {
        try {
            const baseUrl = userApiClient.defaults.baseURL;
            const authUrl = `${baseUrl}/api/auth/facebook`;

            const appRedirect = "musicapp://auth/callback";

            const result = await WebBrowser.openAuthSessionAsync(
                authUrl,
                appRedirect,
            );

            if (result.type === "success") {
                console.log("Success URL:", result.url);

                const url = new URL(result.url);
                const token = url.searchParams.get("token");
                const userParam = url.searchParams.get("user");
                const error = url.searchParams.get("error");

                if (error) {
                    throw new Error(decodeURIComponent(error));
                }

                if (!token || !userParam) {
                    throw new Error("Không nhận được thông tin từ Facebook");
                }

                const user: User = JSON.parse(decodeURIComponent(userParam));

                await AsyncStorage.setItem("userToken", token);
                await AsyncStorage.setItem("user", JSON.stringify(user));

                return { token, user };
            } else if (result.type === "cancel") {
                throw new Error("Đã hủy đăng nhập");
            } else {
                throw new Error("Đăng nhập Facebook thất bại");
            }
        } catch (error: any) {
            console.error("Lỗi đăng nhập Facebook:", error.message);
            throw error;
        }
    }

    async logout(): Promise<void> {
        try {
            await AsyncStorage.multiRemove(["userToken", "user"]);
        } catch (error) {
            console.error("Lỗi khi đăng xuất:", error);
        }
    }

    async getStoredUser(): Promise<User | null> {
        try {
            const userString = await AsyncStorage.getItem("user");
            return userString ? JSON.parse(userString) : null;
        } catch (error) {
            console.error("Lỗi đọc user từ storage:", error);
            return null;
        }
    }

    async getStoredToken(): Promise<string | null> {
        try {
            return await AsyncStorage.getItem("userToken");
        } catch (error) {
            console.error("Lỗi đọc token từ storage:", error);
            return null;
        }
    }

    async isAuthenticated(): Promise<boolean> {
        const token = await this.getStoredToken();
        return token !== null;
    }

    async updateStoredUser(user: User): Promise<void> {
        try {
            await AsyncStorage.setItem("user", JSON.stringify(user));
            console.log("Đã cập nhật user trong storage");
        } catch (error) {
            console.error("Lỗi cập nhật user:", error);
        }
    }
}

export const authService = new AuthService();
