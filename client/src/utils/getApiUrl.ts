// src/utils/getApiUrl.ts

export function getApiUrl(): string {
    if (typeof process !== 'undefined' && process.env && process.env.VITE_API_URL) {
        return process.env.VITE_API_URL;
    }
    return 'http://localhost:3001/api';
}
