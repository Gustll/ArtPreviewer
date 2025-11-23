// Just for the Demo to create the mock data - a poor man's BE endpoint

import type { ApiResponse, ErrorResponse } from '@/types/api';
import type {
    AssetResponse,
    Asset,
    GameTagResponse,
    FormatResponse,
    DownloadRequest,
    HistoryAsset,
} from '@/types/asset';

const mockGameTags: GameTagResponse[] = [
    { game: 'PIXEL', id: 1 },
    { game: 'Samurai', id: 2 },
    { game: 'Elden Ring', id: 3 },
    { game: 'Cyberpunk 2077', id: 4 },
    { game: 'Zelda TOTK', id: 5 },
    { game: 'Dark Souls', id: 6 },
    { game: 'Hollow Knight', id: 7 },
];

const mockAssetFormats: FormatResponse[] = [
    { type: 'png', id: 1 },
    { type: 'svg', id: 2 },
    { type: 'jpg', id: 3 },
    { type: 'webp', id: 4 },
];

const mockAssets: AssetResponse[] = [
    {
        id: 1,
        name: 'Pixel Warrior',
        fileName: 'pixel-warrior.png',
        format: mockAssetFormats[0] as FormatResponse,
        size: '1.2 MB',
        datePosted: '2025-11-18T10:00:00Z',
        author: 'PixelArtist',
        gameTag: mockGameTags[0] as GameTagResponse,
        dimensions: '512x512',
        thumbnailUrl: 'src/api/assets/thumbnails/soldier-walk.png',
        imageUrl: 'src/api/assets/images/soldier-walk.png',
        assetId: 1,
    },
    {
        id: 2,
        name: 'Samurai Warrior',
        fileName: 'samurai-warrior.png',
        format: mockAssetFormats[0] as FormatResponse,
        size: '2.4 MB',
        datePosted: '2025-11-17T14:30:00Z',
        author: 'SamuraiDev',
        gameTag: mockGameTags[1] as GameTagResponse,
        dimensions: '1920x1080',
        thumbnailUrl: 'src/api/assets/thumbnails/samurai.png',
        imageUrl: 'src/api/assets/images/samurai.png',
        assetId: 2,
    },
    {
        id: 3,
        name: 'Elden Ring Landscape',
        fileName: 'elden-ring-landscape.jpg',
        format: mockAssetFormats[2] as FormatResponse,
        size: '3.8 MB',
        datePosted: '2025-11-16T09:15:00Z',
        author: 'FromSoftware',
        gameTag: mockGameTags[2] as GameTagResponse,
        dimensions: '2560x1440',
        thumbnailUrl: 'src/api/assets/thumbnails/soldier-walk.png',
        imageUrl: 'src/api/assets/images/soldier-walk.png',
        assetId: 3,
    },
    {
        id: 4,
        name: 'Cyberpunk City Night',
        fileName: 'cyberpunk-city-night.png',
        format: mockAssetFormats[0] as FormatResponse,
        size: '4.1 MB',
        datePosted: '2025-11-15T16:45:00Z',
        author: 'CD Projekt',
        gameTag: mockGameTags[3] as GameTagResponse,
        dimensions: '3840x2160',
        thumbnailUrl: 'src/api/assets/thumbnails/samurai.png',
        imageUrl: 'src/api/assets/images/samurai.png',
        assetId: 4,
    },
    {
        id: 5,
        name: 'Zelda Temple Icon',
        fileName: 'zelda-temple-icon.svg',
        format: mockAssetFormats[1] as FormatResponse,
        size: '245 KB',
        datePosted: '2025-11-14T11:20:00Z',
        author: 'Nintendo',
        gameTag: mockGameTags[4] as GameTagResponse,
        dimensions: '512x512',
        thumbnailUrl: 'src/api/assets/thumbnails/soldier-walk.png',
        imageUrl: 'src/api/assets/images/soldier-walk.png',
        assetId: 5,
    },
    {
        id: 6,
        name: 'Dark Souls Boss Arena',
        fileName: 'dark-souls-boss-arena.jpg',
        format: mockAssetFormats[2] as FormatResponse,
        size: '5.2 MB',
        datePosted: '2025-11-13T08:30:00Z',
        author: 'FromSoftware',
        gameTag: mockGameTags[5] as GameTagResponse,
        dimensions: '1920x1080',
        thumbnailUrl: 'src/api/assets/thumbnails/samurai.png',
        imageUrl: 'src/api/assets/images/samurai.png',
        assetId: 6,
    },
    {
        id: 7,
        name: 'Pixel Castle',
        fileName: 'pixel-castle.png',
        format: mockAssetFormats[0] as FormatResponse,
        size: '890 KB',
        datePosted: '2025-11-12T15:10:00Z',
        author: 'PixelArtist',
        gameTag: mockGameTags[0] as GameTagResponse,
        dimensions: '1024x768',
        thumbnailUrl: 'src/api/assets/thumbnails/soldier-walk.png',
        imageUrl: 'src/api/assets/images/soldier-walk.png',
        assetId: 7,
    },
    {
        id: 8,
        name: 'Hollow Knight Character',
        fileName: 'hollow-knight-character.webp',
        format: mockAssetFormats[3] as FormatResponse,
        size: '1.5 MB',
        datePosted: '2025-11-11T13:25:00Z',
        author: 'Team Cherry',
        gameTag: mockGameTags[6] as GameTagResponse,
        dimensions: '1080x1920',
        thumbnailUrl: 'src/api/assets/thumbnails/samurai.png',
        imageUrl: 'src/api/assets/images/samurai.png',
        assetId: 8,
    },
    {
        id: 9,
        name: 'Samurai Sword Icon',
        fileName: 'samurai-sword-icon.svg',
        format: mockAssetFormats[1] as FormatResponse,
        size: '180 KB',
        datePosted: '2025-11-10T10:40:00Z',
        author: 'SamuraiDev',
        gameTag: mockGameTags[1] as GameTagResponse,
        dimensions: '256x256',
        thumbnailUrl: 'src/api/assets/thumbnails/soldier-walk.png',
        imageUrl: 'src/api/assets/images/soldier-walk.png',
        assetId: 9,
    },
    {
        id: 10,
        name: 'Elden Ring Character Portrait',
        fileName: 'elden-ring-character.jpg',
        format: mockAssetFormats[2] as FormatResponse,
        size: '2.9 MB',
        datePosted: '2025-11-09T17:55:00Z',
        author: 'FromSoftware',
        gameTag: mockGameTags[2] as GameTagResponse,
        dimensions: '1200x1600',
        thumbnailUrl: 'src/api/assets/thumbnails/samurai.png',
        imageUrl: 'src/api/assets/images/samurai.png',
        assetId: 10,
    },
];

const SIMULATE_ERROR = false;
const ERROR_TYPE: 'network' | 'server' | 'notfound' = 'network';

/**
 * Simulate different error scenarios
 */
function getErrorResponse(): ErrorResponse {
    switch (ERROR_TYPE) {
        case 'network':
            return {
                message: 'Network error: Unable to reach server',
                statusCode: 0,
            };
        case 'server':
            return {
                message: 'Internal server error',
                statusCode: 500,
            };
        case 'notfound':
            return {
                message: 'Resource not found',
                statusCode: 404,
            };
    }
}

function simulateError(): never {
    const errorResponse = getErrorResponse();

    throw {
        error: errorResponse,
        data: undefined,
    } as ApiResponse<never>;
}

interface DownloadRecord {
    id: number; // id of the download
    assetId: number;
    userId: string;
    insertedAt: string; // ISO timestamp
}

/**
 * Mock API endpoints that simulate backend behavior
 */
export const mockApi = {
    /**
     * GET /api/assets
     * Query params: search, format, gameTag
     */
    async getAssets(params: URLSearchParams): Promise<Asset[]> {
        // Simulate network delay - Just for the demo
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Simulate error if enabled
        if (SIMULATE_ERROR) {
            throw simulateError();
        }

        let filtered = [...mockAssets];

        // Backend filtering logic
        const search = params.get('search');
        const formatIds = params.getAll('format');
        const gameTagIds = params.getAll('gameTag');

        if (search) {
            const searchLower = search.toLowerCase();
            filtered = filtered.filter((asset) =>
                asset.name.toLowerCase().includes(searchLower),
            );
        }

        if (formatIds.length > 0) {
            // Convert string IDs to numbers for comparison
            const formatIdsAsNumbers = formatIds.map((id) => Number(id));

            // Filter assets where asset.gameTag.id matches any of the requested IDs
            filtered = filtered.filter((asset) =>
                formatIdsAsNumbers.includes(asset.format.id),
            );
        }

        if (gameTagIds.length > 0) {
            // Convert string IDs to numbers for comparison
            const tagIdsAsNumbers = gameTagIds.map((id) => Number(id));

            // Filter assets where asset.gameTag.id matches any of the requested IDs
            filtered = filtered.filter((asset) =>
                tagIdsAsNumbers.includes(asset.gameTag.id),
            );
        }

        return filtered;
    },

    /**
     * GET /api/assets/:assetId
     * Get single asset by ID with full details
     */
    async getAsset(assetId: number): Promise<AssetResponse | null> {
        await new Promise((resolve) => setTimeout(resolve, 200));

        if (SIMULATE_ERROR) {
            throw simulateError();
        }

        const asset = mockAssets.find((a) => a.id === assetId);

        if (!asset) {
            throw {
                message: 'Asset not found',
                statusCode: 404,
            };
        }

        return asset;
    },

    /**
     * GET /api/downloads/history
     */
    async getDownloadHistory(params: URLSearchParams): Promise<HistoryAsset[]> {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        if (SIMULATE_ERROR) {
            throw simulateError();
        }

        const STORAGE_KEY = 'asset_downloads';

        // Extract userId from params (FE sends this)
        const userId = params.get('userId');
        if (!userId) {
            throw {
                message: 'userId is required',
                statusCode: 400,
            };
        }

        // 1. Read download records from localStorage
        let downloadRecords: DownloadRecord[] = [];
        const stored = localStorage.getItem(STORAGE_KEY);

        if (stored) {
            try {
                downloadRecords = JSON.parse(stored);
            } catch {
                downloadRecords = [];
            }
        }

        // 2. Filter by userId
        downloadRecords = downloadRecords.filter(
            (record) => record.userId === userId,
        );

        // 3. Join with mockAssets to get minimal asset data
        let downloadHistory: HistoryAsset[] = downloadRecords
            .map((record) => {
                const asset = mockAssets.find((a) => a.id === record.assetId);
                if (!asset) return null;

                return {
                    id: record.id, // Download ID
                    name: asset.name,
                    format: asset.format,
                    gameTag: asset.gameTag,
                    thumbnailUrl: asset.thumbnailUrl,
                    insertedAt: record.insertedAt,
                    assetId: asset.id,
                };
            })
            .filter((item) => item !== null) as HistoryAsset[];

        // 4. Apply filters
        const search = params.get('search');
        const formatIds = params.getAll('format');
        const gameTagIds = params.getAll('gameTag');

        if (search) {
            const searchLower = search.toLowerCase();
            downloadHistory = downloadHistory.filter((asset) =>
                asset.name.toLowerCase().includes(searchLower),
            );
        }

        if (formatIds.length > 0) {
            const formatIdsAsNumbers = formatIds.map((id) => Number(id));
            downloadHistory = downloadHistory.filter((asset) =>
                formatIdsAsNumbers.includes(asset.format.id),
            );
        }

        if (gameTagIds.length > 0) {
            const tagIdsAsNumbers = gameTagIds.map((id) => Number(id));
            downloadHistory = downloadHistory.filter((asset) =>
                tagIdsAsNumbers.includes(asset.gameTag.id),
            );
        }
        // 5. Sort by download ID (DESC) - most recent downloads first
        downloadHistory.sort((a, b) => b.id - a.id);

        return downloadHistory;
    },

    async getGameTags(): Promise<GameTagResponse[]> {
        await new Promise((resolve) => setTimeout(resolve, 300));

        if (SIMULATE_ERROR) {
            throw simulateError();
        }
        return mockGameTags;
    },

    async getAssetFormats(): Promise<FormatResponse[]> {
        await new Promise((resolve) => setTimeout(resolve, 300));

        if (SIMULATE_ERROR) {
            throw simulateError();
        }
        return mockAssetFormats;
    },

    async saveDownloads(downloads: DownloadRequest[]): Promise<void> {
        await new Promise((resolve) => setTimeout(resolve, 300));

        const STORAGE_KEY = 'asset_downloads';

        // Read existing downloads from localStorage
        let existingDownloads: DownloadRecord[] = [];
        const stored = localStorage.getItem(STORAGE_KEY);

        if (stored) {
            try {
                existingDownloads = JSON.parse(stored);
            } catch {
                existingDownloads = [];
            }
        }

        const maxDownloadId =
            existingDownloads.length > 0
                ? Math.max(...existingDownloads.map((d) => d.id))
                : 0;

        // Create new download records with timestamp
        const newDownloads: DownloadRecord[] = downloads.map(
            (download, index) => ({
                id: maxDownloadId + index + 1,
                assetId: download.assetId,
                userId: download.userId,
                insertedAt: new Date().toISOString(), // Backend generates timestamp
            }),
        );

        // Append new downloads to existing ones
        const allDownloads = [...existingDownloads, ...newDownloads];

        // Save back to localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allDownloads));
    },

    async getAssetsByIds(assetIds: number[]): Promise<Asset[]> {
        await new Promise((resolve) => setTimeout(resolve, 200));

        return mockAssets.filter((asset) => assetIds.includes(asset.id));
    },
};
