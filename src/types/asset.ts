export interface AssetResponse {
    name: string,
    fileName: string,
    format: string,
    size: string,
    datePosted: string,
    author: string,
    gameTag: string,
    dimensions: string
}

export interface AssetFilters {
    search: string;
    format: string;
    gameTag: string;
}

export interface AssetDownloadResponse extends AssetResponse {
    downloadDate: string;   // ISO string or "Nov 18, 2025"
}