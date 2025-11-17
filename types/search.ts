export interface SearchParams {
    q: string; // từ khóa
    type: string; // "track,artist,album"
    limit?: number; // giới hạn
    offset?: number;
    market?: string; // quốc gia
}
