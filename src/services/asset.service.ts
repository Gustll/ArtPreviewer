import type { AssetResponse, AssetDownloadResponse, AssetFilters, Asset, GameTagResponse } from '@/types/asset';
import { mockApi } from './mock.service';

class AssetService {
    /**
     * List assets with filtering
     */
    async listAssets(filters: AssetFilters): Promise<Asset[]> {
        const params = new URLSearchParams();

        if (filters.search) params.append('search', filters.search);
        if (filters.format) params.append('format', filters.format);
        Object.keys(filters.gameTags).forEach(id => {
            params.append('gameTag', id);
        });

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

    /**
     * Get all gameTags
     */
    async getGameTags(): Promise<GameTagResponse[] | null> {
        return mockApi.getGameTags();
    }
}

export const assetService = new AssetService();