import type { AssetResponse, AssetFilters, Asset, GameTagResponse, FormatResponse, DownloadRequest, HistoryAsset } from '@/types/asset';
import { mockApi } from './mock.service';
import { authService } from './auth.service';
import JSZip from 'jszip';

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

        // Save download records
        const downloadRequests = assetIds.map(assetId => ({ assetId, userId }));

        if (assetIds.length === 1) {
            const assets = await mockApi.getAssetsByIds(assetIds);
            // Single file - direct download
            const assetId = assetIds[0]
            const asset = assets.filter(({ id }) => id === assetId)[0] as Asset;

            this.triggerFileDownload(asset.thumbnailUrl, asset.name);
        } else {
            // Multiple files - create ZIP
            await this.downloadAsZip(assetIds);
        }
        await mockApi.saveDownloads(downloadRequests);
    }

    private triggerFileDownload(url: string, filename: string): void {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
    }

    private async downloadAsZip(assetIds: number[]): Promise<void> {
        const zip = new JSZip();

        const assets = await mockApi.getAssetsByIds(assetIds);
        // Fetch all images and add to ZIP with correct format
        for (const asset of assets) {
            try {
                const response = await fetch(asset.thumbnailUrl);
                const blob = await response.blob();

                // Ensure filename has correct extension
                const fileName = `${asset.name}.${asset.format.type}`;

                zip.file(fileName, blob);
            } catch (error) {
                console.error(`Failed to fetch ${asset.name}:`, error);
            }
        }

        // Generate ZIP file
        const zipBlob = await zip.generateAsync({ type: 'blob' });

        // Trigger download
        const url = URL.createObjectURL(zipBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `assets-${Date.now()}.zip`;
        link.click();
        URL.revokeObjectURL(url);
    }

}

export const assetService = new AssetService();