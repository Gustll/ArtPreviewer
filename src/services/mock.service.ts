// Just for the Demo to create the mock data - a poor man's BE endpoint

import type { ApiResponse, ErrorResponse } from '@/types/api';
import type { AssetResponse, AssetDownloadResponse, Asset, GameTagResponse, FormatResponse } from '@/types/asset';

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


const mockDownloadHistory: AssetDownloadResponse[] = [
    {
        ...mockAssets[0] as AssetResponse,
        downloadDate: "2025-11-20"
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
        console.log(params)
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
    async getDownloadHistory(): Promise<AssetDownloadResponse[]> {
        await new Promise(resolve => setTimeout(resolve, 300));

        if (SIMULATE_ERROR) {
            throw simulateError();
        }
        return mockDownloadHistory;
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
    }
};