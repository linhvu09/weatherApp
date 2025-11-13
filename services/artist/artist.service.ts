import type {
  Artist,
  ArtistSearchParams,
  ArtistSearchResponse,
  GetArtistsParams,
  GetArtistsResponse,
} from "@/types/artist";
import { apiClient } from "../api-client";

class ArtistService {
  async getArtists(params: GetArtistsParams): Promise<Artist[]> {
    if (params.ids.length === 0 || params.ids.length > 40) {
      throw new Error("Danh sách ID phải có từ 1 đến 40 mục");
    }

    try {
      const response = await apiClient.get<GetArtistsResponse>("/artist", {
        params: {
          ids: params.ids,
        },
        paramsSerializer: {
          indexes: null,
        },
      });

      return response.data.content;
    } catch (error) {
      console.error("Lỗi khi tải thông tin nghệ sĩ:", error);
      throw error;
    }
  }

  async searchArtists(
    params: ArtistSearchParams,
  ): Promise<ArtistSearchResponse> {
    if (!params.searchText || params.searchText.trim().length === 0) {
      throw new Error("Vui lòng nhập từ khóa tìm kiếm");
    }

    if (params.searchText.length > 1000) {
      throw new Error("Từ khóa tìm kiếm không được vượt quá 1000 ký tự");
    }

    try {
      const response = await apiClient.get<ArtistSearchResponse>(
        "/artist/search",
        {
          params: {
            searchText: params.searchText,
            page: params.page ?? 0,
            size: params.size ?? 25,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error("Lỗi khi tìm kiếm nghệ sĩ:", error);
      throw error;
    }
  }

  async getArtistDetail(id: string): Promise<Artist> {
    if (!id || id.trim().length === 0) {
      throw new Error("ID nghệ sĩ không được để trống");
    }

    try {
      const response = await apiClient.get<Artist>(`/artist/${id}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error("Không tìm thấy nghệ sĩ");
      }
      console.error("Lỗi khi tải chi tiết nghệ sĩ:", error);
      throw error;
    }
  }
}

export const artistService = new ArtistService();
