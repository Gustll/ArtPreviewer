// Just for the Demo to create the mock data - a poor man's BE endpoint

import type { ApiResponse, ErrorResponse } from '@/types/api';
import type { AssetResponse, AssetDownloadResponse } from '@/types/asset';

const mockAssets: AssetResponse[] = [
    {
        name: "Elden Ring Landscape",
        fileName: "elden-ring-landscape.jpg",
        format: "jpg",
        size: "2.4 MB",
        datePosted: "2025-11-18",
        author: "FromSoftware",
        gameTag: "Elden Ring",
        dimensions: "1920x1080"
    },
    {
        name: "Cyberpunk Night City",
        fileName: "cyberpunk-night-city.png",
        format: "png",
        size: "3.1 MB",
        datePosted: "2025-11-17",
        author: "CD Projekt Red",
        gameTag: "Cyberpunk 2077",
        dimensions: "2560x1440"
    },
    {
        name: "Zelda Hyrule Field",
        fileName: "zelda-hyrule-field.webp",
        format: "webp",
        size: "1.8 MB",
        datePosted: "2025-11-16",
        author: "Nintendo",
        gameTag: "Zelda TOTK",
        dimensions: "1920x1080"
    }
];

const mockDownloadHistory: AssetDownloadResponse[] = [
    {
        ...mockAssets[0] as AssetResponse,
        downloadDate: "2025-11-20"
    },
    {
        ...mockAssets[1] as AssetResponse,
        downloadDate: "2025-11-19"
    }
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
    async getAssets(params: URLSearchParams): Promise<AssetResponse[]> {
        // Simulate network delay - Just for the demo
        await new Promise(resolve => setTimeout(resolve, 500));

        // Simulate error if enabled
        if (SIMULATE_ERROR) {
            throw simulateError();
        }


        let filtered = [...mockAssets];

        // Backend filtering logic
        const search = params.get('search');
        const format = params.get('format');
        const gameTag = params.get('gameTag');

        if (search) {
            const searchLower = search.toLowerCase();
            filtered = filtered.filter(asset =>
                asset.name.toLowerCase().includes(searchLower) ||
                asset.fileName.toLowerCase().includes(searchLower)
            );
        }

        if (format) {
            filtered = filtered.filter(asset =>
                asset.format.toLowerCase() === format.toLowerCase()
            );
        }

        if (gameTag) {
            filtered = filtered.filter(asset =>
                asset.gameTag.toLowerCase() === gameTag.toLowerCase()
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

        return mockAssets.find(asset => asset.fileName === fileName) || null;
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
    }
};