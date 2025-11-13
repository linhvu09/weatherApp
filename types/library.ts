// types/library.ts
export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  coverUrl: string;
  duration: number;
}

export interface LibraryCategory {
  id: string;
  title: string;
  count: number;
  icon: string;
  route: string;
}
