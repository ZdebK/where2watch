// testUtils/mockFetch.ts
export function mockFetchJson(data: any) {
    return jest.fn(() => Promise.resolve({
        ok: true,
        status: 200,
        headers: { get: () => '123' },
        json: () => Promise.resolve(data),
        text: () => Promise.resolve(JSON.stringify(data)),
    }));
}
