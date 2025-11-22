import type { AssetResponse, AssetDownloadResponse, AssetFilters, Asset, GameTagResponse, FormatResponse, DownloadRequest, HistoryAsset } from '@/types/asset';
import { mockApi } from './mock.service';
import { authService } from './auth.service';

class AssetService {
    /**
     * List assets with filtering
     */
    async listAssets(filters: AssetFilters): Promise<Asset[]> {
        const params = new URLSearchParams();

        if (filters.search) params.append('search', filters.search);
        Object.keys(filters.format).forEach(id => {
            params.append('format', id);
        });
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
    async listHistory(filters: AssetFilters): Promise<HistoryAsset[]> {
        const params = new URLSearchParams();
        const userId = authService.getCurrentUserId();

        if (filters.search) params.append('search', filters.search);
        Object.keys(filters.format).forEach(id => {
            params.append('format', id);
        });
        Object.keys(filters.gameTags).forEach(id => {
            params.append('gameTag', id);
        });
        params.append('userId', userId);

        return mockApi.getDownloadHistory(params);
    }

    /**
     * Get all gameTags
     */
    async getGameTags(): Promise<GameTagResponse[] | null> {
        return mockApi.getGameTags();
    }

    /**
     * Get all asset formats
     */
    async getAssetFormats(): Promise<FormatResponse[] | null> {
        return mockApi.getAssetFormats();
    }

    /**
     * Downloads all the assets
     */
    async downloadAssets(assetIds: number[]): Promise<void> {
        const userId = authService.getCurrentUserId();

        // Prepare request payload
        const downloadRequests: DownloadRequest[] = assetIds.map(assetId => ({
            assetId,
            userId
        }));

        // Call backend
        await mockApi.saveDownloads(downloadRequests);
    }
}

export const assetService = new AssetService();