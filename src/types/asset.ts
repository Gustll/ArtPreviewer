export interface Asset {
    id: number,
    name: string,
    format: AssetFormat,
    gameTag: GameTagResponse,
    thumbnailUrl: string,
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
    format: string;
    gameTags: Record<number, string>,
}

export interface AssetDownloadResponse extends AssetResponse {
    downloadDate: string;   // ISO string or "Nov 18, 2025"
}

export type AssetFormat = 'png' | 'svg'

export interface GameTagResponse {
    game: string,
    id: number
}