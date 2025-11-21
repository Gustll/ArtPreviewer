export interface Asset {
    id: number,
    name: string,
    format: string,
    gameTag: string,
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
    gameTag: string;
}

export interface AssetDownloadResponse extends AssetResponse {
    downloadDate: string;   // ISO string or "Nov 18, 2025"
}