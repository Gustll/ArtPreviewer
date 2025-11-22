// Just for the Demo to create the mock data - a poor man's BE endpoint

import type { ApiResponse, ErrorResponse } from '@/types/api';
import type { AssetResponse, AssetDownloadResponse, Asset, GameTagResponse, FormatResponse, DownloadRequest } from '@/types/asset';
import { authService } from './auth.service';

const mockGameTags: GameTagResponse[] = [{ game: 'PIXEL', id: 1 }, { game: 'Samurai', id: 2 }, { game: 'Elden Ring', id: 3 }]
const mockAssetFormats: FormatResponse[] = [{ type: 'png', id: 1 }, { type: 'svg', id: 2 }, { type: 'jpg', id: 3 }]

const mockAssets: Asset[] = [
    {
        id: 1,
        name: "Solider Walk",
        format: mockAssetFormats[0] as FormatResponse,
        gameTag: mockGameTags[0] as GameTagResponse,
        thumbnailUrl: 'src/api/assets/thumbnails/soldier-walk.png'
    },
    {
        id: 2,
        name: "Samurai",
        format: mockAssetFormats[0] as FormatResponse,
        gameTag: mockGameTags[1] as GameTagResponse,
        thumbnailUrl: 'src/api/assets/thumbnails/samurai.png'
    }
];

const mockAsset: AssetResponse =
{
    ...mockAssets[0] as Asset,
    fileName: '',
    size: '',
    datePosted: '',
    author: '',
    dimensions: '',
    imageUrl: ''
}

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
                statusCode: 0
            };
        case 'server':
            return {
                message: 'Internal server error',
                statusCode: 500
            };
        case 'notfound':
            return {
                message: 'Resource not found',
                statusCode: 404
            };
    }
}

function simulateError(): never {
    const errorResponse = getErrorResponse()

    throw {
        error: errorResponse,
        data: undefined
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
        await new Promise(resolve => setTimeout(resolve, 500));

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
            filtered = filtered.filter(asset =>
                asset.name.toLowerCase().includes(searchLower)
            );
        }

        if (formatIds.length > 0) {
            // Convert string IDs to numbers for comparison
            const formatIdsAsNumbers = formatIds.map(id => Number(id));

            // Filter assets where asset.gameTag.id matches any of the requested IDs
            filtered = filtered.filter(asset =>
                formatIdsAsNumbers.includes(asset.format.id)
            );
        }

        if (gameTagIds.length > 0) {
            // Convert string IDs to numbers for comparison
            const tagIdsAsNumbers = gameTagIds.map(id => Number(id));

            // Filter assets where asset.gameTag.id matches any of the requested IDs
            filtered = filtered.filter(asset =>
                tagIdsAsNumbers.includes(asset.gameTag.id)
            );
        }


        return filtered;
    },

    /**
     * GET /api/assets/:fileName
     */
    async getAsset(fileName: string): Promise<AssetResponse | null> {
        await new Promise(resolve => setTimeout(resolve, 200));

        if (SIMULATE_ERROR) {
            throw simulateError();
        }

        return mockAsset;
    },

    /**
     * GET /api/downloads/history
     */
    async getDownloadHistory(params: URLSearchParams): Promise<Asset[]> {
        await new Promise(resolve => setTimeout(resolve, 500));

        if (SIMULATE_ERROR) {
            throw simulateError();
        }

        const STORAGE_KEY = 'asset_downloads';

        // Extract userId from params (FE sends this)
        const userId = params.get('userId');
        if (!userId) {
            throw {
                message: 'userId is required',
                statusCode: 400
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
        downloadRecords = downloadRecords.filter(record => record.userId === userId);

        // 3. Join with mockAssets to get minimal asset data
        let downloadHistory: Asset[] = downloadRecords
            .map(record => {
                const asset = mockAssets.find(a => a.id === record.assetId);
                if (!asset) return null;

                return {
                    id: record.id,        // Download ID
                    name: asset.name,
                    format: asset.format,
                    gameTag: asset.gameTag,
                    thumbnailUrl: asset.thumbnailUrl,
                    downloadDate: record.insertedAt
                };
            })
            .filter(item => item !== null) as Asset[];



        // 4. Apply filters
        const search = params.get('search');
        const formatIds = params.getAll('format');
        const gameTagIds = params.getAll('gameTag');

        if (search) {
            const searchLower = search.toLowerCase();
            downloadHistory = downloadHistory.filter(asset =>
                asset.name.toLowerCase().includes(searchLower)
            );
        }

        if (formatIds.length > 0) {
            const formatIdsAsNumbers = formatIds.map(id => Number(id));
            downloadHistory = downloadHistory.filter(asset =>
                formatIdsAsNumbers.includes(asset.format.id)
            );
        }

        if (gameTagIds.length > 0) {
            const tagIdsAsNumbers = gameTagIds.map(id => Number(id));
            downloadHistory = downloadHistory.filter(asset =>
                tagIdsAsNumbers.includes(asset.gameTag.id)
            );
        }
        // 5. Sort by download ID (DESC) - most recent downloads first
        downloadHistory.sort((a, b) => b.id - a.id);

        return downloadHistory;
    },

    async getGameTags(): Promise<GameTagResponse[]> {
        await new Promise(resolve => setTimeout(resolve, 300));

        if (SIMULATE_ERROR) {
            throw simulateError();
        }
        return mockGameTags;
    },

    async getAssetFormats(): Promise<FormatResponse[]> {
        await new Promise(resolve => setTimeout(resolve, 300));

        if (SIMULATE_ERROR) {
            throw simulateError();
        }
        return mockAssetFormats;
    },

    async saveDownloads(downloads: DownloadRequest[]): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 300));

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

        const maxDownloadId = existingDownloads.length > 0
            ? Math.max(...existingDownloads.map(d => d.id))
            : 0;

        // Create new download records with timestamp
        const newDownloads: DownloadRecord[] = downloads.map((download, index) => ({
            id: maxDownloadId + index + 1,
            assetId: download.assetId,
            userId: download.userId,
            insertedAt: new Date().toISOString() // Backend generates timestamp
        }));

        // Append new downloads to existing ones
        const allDownloads = [...existingDownloads, ...newDownloads];

        // Save back to localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allDownloads));
    }
};