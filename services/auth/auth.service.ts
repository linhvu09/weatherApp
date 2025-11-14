// services/auth/auth.service.ts
import type {
    AuthResponse,
    LoginCredentials,
    RegisterData,
    User,
} from "@/types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { userApiClient } from "../api-user-be";

WebBrowser.maybeCompleteAuthSession();

class AuthService {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        try {
            const response = await userApiClient.post<AuthResponse>(
                "/api/auth/login",
                credentials,
            );

            const { token, user } = response.data;

            await AsyncStorage.setItem("userToken", token);
            await AsyncStorage.setItem("user", JSON.stringify(user));

            console.log("Đăng nhập thành công:", user.username);
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

    // Đăng ký tài khoản mới
    async register(data: RegisterData): Promise<AuthResponse> {
        try {
            const response = await userApiClient.post<AuthResponse>(
                "/api/auth/register",
                data,
            );

            const { token, user } = response.data;

            await AsyncStorage.setItem("userToken", token);
            await AsyncStorage.setItem("user", JSON.stringify(user));

            console.log("Đăng ký thành công:", user.username);
            return { token, user };
        } catch (error: any) {
            console.error(
                "Lỗi đăng ký:",
                error.response?.data || error.message,
            );

            if (error.response?.status === 400) {
                throw new Error("Tên đăng nhập hoặc email đã tồn tại");
            }

            throw new Error(
                error.response?.data?.message || "Đăng ký thất bại",
            );
        }
    }

    //  Đăng nhập bằng Google
    async loginWithGoogle(): Promise<AuthResponse> {
        try {
            const baseUrl = userApiClient.defaults.baseURL;
            const redirectUri = AuthSession.makeRedirectUri({
                path: "auth/google/callback",
            });

            console.log("📍 Redirect URI:", redirectUri);

            // Mở browser để đăng nhập Google
            const result = await WebBrowser.openAuthSessionAsync(
                `${baseUrl}/api/auth/google?redirect_uri=${encodeURIComponent(redirectUri)}`,
                redirectUri,
            );

            if (result.type === "success") {
                // Parse URL để lấy token
                const url = new URL(result.url);
                const token = url.searchParams.get("token");
                const userParam = url.searchParams.get("user");

                if (!token || !userParam) {
                    throw new Error("Không nhận được thông tin từ Google");
                }

                const user: User = JSON.parse(decodeURIComponent(userParam));

                // Lưu vào AsyncStorage
                await AsyncStorage.setItem("userToken", token);
                await AsyncStorage.setItem("user", JSON.stringify(user));

                console.log("Đăng nhập Google thành công:", user.username);
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

    // Đăng nhập bằng Facebook
    async loginWithFacebook(): Promise<AuthResponse> {
        try {
            const baseUrl = userApiClient.defaults.baseURL;
            const redirectUri = AuthSession.makeRedirectUri({
                path: "auth/facebook/callback",
            });

            console.log("📍 Redirect URI:", redirectUri);

            // Mở browser để đăng nhập Facebook
            const result = await WebBrowser.openAuthSessionAsync(
                `${baseUrl}/api/auth/facebook?redirect_uri=${encodeURIComponent(redirectUri)}`,
                redirectUri,
            );

            if (result.type === "success") {
                const url = new URL(result.url);
                const token = url.searchParams.get("token");
                const userParam = url.searchParams.get("user");

                if (!token || !userParam) {
                    throw new Error("Không nhận được thông tin từ Facebook");
                }

                const user: User = JSON.parse(decodeURIComponent(userParam));

                await AsyncStorage.setItem("userToken", token);
                await AsyncStorage.setItem("user", JSON.stringify(user));

                console.log("Đăng nhập Facebook thành công:", user.username);
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

    //  Đăng xuất
    async logout(): Promise<void> {
        try {
            await AsyncStorage.multiRemove(["userToken", "user"]);
            console.log("Đăng xuất thành công");
        } catch (error) {
            console.error("Lỗi khi đăng xuất:", error);
        }
    }

    //  Lấy thông tin user đã lưu
    async getStoredUser(): Promise<User | null> {
        try {
            const userString = await AsyncStorage.getItem("user");
            return userString ? JSON.parse(userString) : null;
        } catch (error) {
            console.error("Lỗi đọc user từ storage:", error);
            return null;
        }
    }

    // Lấy token đã lưu
    async getStoredToken(): Promise<string | null> {
        try {
            return await AsyncStorage.getItem("userToken");
        } catch (error) {
            console.error("Lỗi đọc token từ storage:", error);
            return null;
        }
    }

    // Kiểm tra user đã đăng nhập chưa
    async isAuthenticated(): Promise<boolean> {
        const token = await this.getStoredToken();
        return token !== null;
    }

    // Cập nhật thông tin user trong storage
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
