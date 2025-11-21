import type { AssetResponse, AssetDownloadResponse, AssetFilters } from '@/types/asset';
import { mockApi } from './mock.service';
import type { ErrorResponse } from '@/types/api';

class AssetService {
    /**
     * List assets with filtering
     */
    async listAssets(filters: AssetFilters): Promise<AssetResponse[]> {
        const params = new URLSearchParams();

        if (filters.search) params.append('search', filters.search);
        if (filters.format) params.append('format', filters.format);
        if (filters.gameTag) params.append('gameTag', filters.gameTag);

        // Mock API call (simulates: GET /api/assets?search=xxx&format=jpg)
        return mockApi.getAssets(params);
    }

    /**
     * Get single asset
     */
    async getAsset(fileName: string): Promise<AssetResponse | null> {
        return mockApi.getAsset(fileName);
    }

    /**
     * Get download history
     */
    async getDownloadHistory(): Promise<AssetDownloadResponse[]> {
        return mockApi.getDownloadHistory();
    }
}

export const assetService = new AssetService();