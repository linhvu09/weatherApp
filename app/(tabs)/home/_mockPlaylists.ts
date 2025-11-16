import { ImageSourcePropType } from "react-native";

export interface Song {
    id: number;
    title: string;
    artist: string;
    imageSource: ImageSourcePropType;
}

export interface Playlist {
    title: string;
    songCount: number;
    coverSource: ImageSourcePropType;
}

export interface MockDataPlaylistContainer {
    playlist: Playlist;
    songs: Song[];
}

const categories = [
    "Thư giãn",
    "Tập luyện",
    "Du lịch",
    "Tập trung",
    "Ngủ",
    "Di chuyển",
];

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMockData(): Record<string, MockDataPlaylistContainer[]> {
    const data: Record<string, MockDataPlaylistContainer[]> = {};
    let globalSongId = 1;

    categories.forEach((category) => {
        const numPlaylists = getRandomInt(2, 4);
        data[category] = [];

        for (let i = 0; i < numPlaylists; i++) {
            const numSongs = getRandomInt(3, 4);
            const songs: Song[] = [];

            for (let j = 0; j < numSongs; j++) {
                songs.push({
                    id: globalSongId,
                    title: `Song ${globalSongId}`,
                    artist: `Artist ${globalSongId}`,
                    imageSource: {
                        uri: `https://picsum.photos/100/100?random=${globalSongId}`,
                    },
                });
                globalSongId++;
            }

            data[category].push({
                playlist: {
                    title: `${category} Playlist ${i + 1}`,
                    songCount: numSongs,
                    coverSource: {
                        uri: `https://picsum.photos/400/400?random=${globalSongId}&blur=1`,
                    },
                },
                songs,
            });
        }
    });

    return data;
}

export const mockDataByCategory = generateMockData();
