export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegisterData {
    username: string;
    password: string;
    email?: string;
    displayName?: string;
}

export interface User {
    _id: string;
    username?: string;
    email?: string;
    displayName?: string;
    avatar?: string;
    googleId?: string;
    facebookId?: string;

    // Music preferences
    likedSongs?: string[];
    followedArtists?: string[];
    followedPlaylists?: string[];

    // Premium
    isPremium: boolean;
    premiumExpiry?: Date;

    // Settings
    settings?: UserSettings;

    // Counts (virtuals)
    likedSongsCount?: number;
    followedArtistsCount?: number;

    namSinh?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserSettings {
    theme: "light" | "dark" | "auto";
    language: "en" | "vi";
    audioQuality: "low" | "medium" | "high";
    downloadQuality: "low" | "medium" | "high";
    autoDownload: boolean;
    notifications: {
        newReleases: boolean;
        playlistUpdates: boolean;
    };
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface OAuthProvider {
    google: string;
    facebook: string;
}
