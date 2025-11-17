import axios from "axios";
import { encode } from "base-64";

const clientId = process.env.EXPO_PUBLIC_CLIENT_ID_SPOTIFY;
const clientSecret = process.env.EXPO_PUBLIC_CLIENT_SECRET_SPOTIFY;

if (!clientId || !clientSecret) {
    console.warn("Thiếu Spotify credentials trong .env");
}

let cachedToken: string | null = null;
let tokenExpiry: number = 0;

export async function getSpotifyToken(): Promise<string | null> {
    const now = Date.now();

    if (cachedToken && now < tokenExpiry) {
        return cachedToken;
    }

    if (!clientId || !clientSecret) {
        console.error("Thiếu CLIENT_ID hoặc CLIENT_SECRET");
        return null;
    }

    try {
        const credentials = `${clientId}:${clientSecret}`;
        const authHeader = encode(credentials);

        const res = await axios.post(
            "https://accounts.spotify.com/api/token",
            "grant_type=client_credentials",
            {
                headers: {
                    Authorization: `Basic ${authHeader}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            },
        );

        cachedToken = res.data.access_token;
        tokenExpiry = now + (res.data.expires_in - 300) * 1000;

        console.log("Spotify token refreshed");
        return cachedToken;
    } catch (err: any) {
        console.error(
            "Lỗi lấy Spotify token:",
            err.response?.data || err.message,
        );
        return null;
    }
}
