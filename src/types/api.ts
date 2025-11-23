export interface ErrorResponse {
    message: string;
    statusCode: number;
    details?: unknown;
}

export interface ApiResponse<T> {
    data?: T;
    error?: ErrorResponse;
}

export function isErrorResponse(
    value: unknown,
): value is ApiResponse<never> & { error: ErrorResponse; data: undefined } {
    return (
        typeof value === 'object' &&
        value !== null &&
        'error' in value &&
        value.error !== undefined &&
        (!('data' in value) || value.data === undefined)
    );
}
