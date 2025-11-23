export interface Asset {
    id: number,
    name: string,
    format: FormatResponse,
    gameTag: GameTagResponse,
    thumbnailUrl: string,
    assetId: number,
}

export interface HistoryAsset extends Asset {
    insertedAt: string
}

export interface AssetResponse extends Asset {
    fileName: string,
    size: string,
    datePosted: string,
    author: string,
    dimensions: string
    imageUrl: string
}

export interface AssetFilters {
    search: string;
    format: Record<number, string>;
    gameTags: Record<number, string>,
    visible: boolean
}

export interface AssetDownloadResponse extends AssetResponse {
    downloadDate: string;   // ISO string or "Nov 18, 2025"
}

export interface GameTagResponse {
    game: string,
    id: number
}

export interface FormatResponse {
    type: string,
    id: number
}

export interface DownloadRequest {
    assetId: number,
    userId: string
}