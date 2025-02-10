import { describe, it, expect, vi, Mock } from 'vitest';
import { fetchClient } from '../fetchClient';

global.fetch = vi.fn();

describe('fetchClient', () => {
  const mockBaseUrl = 'https://api.example.com';
  const mockApiKey = 'test-api-key';

  beforeEach(() => {
    vi.resetAllMocks();
    import.meta.env.VITE_MARVEL_BASE_URL = mockBaseUrl;
    import.meta.env.VITE_MARVEL_API_KEY = mockApiKey;
  });

  it('Makes a GET request and return the response data', async () => {
    const mockData = { data: 'response data' };

    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockData),
    });

    const result = await fetchClient<{ data: string }>('/test-endpoint');

    expect(fetch).toHaveBeenCalledWith(
      `${mockBaseUrl}/test-endpoint?apikey=${mockApiKey}`,
      expect.any(Object),
    );

    expect(result).toEqual(mockData);
  });

  it('Adds the API key using "&" if the endpoint already has a query string', async () => {
    const mockData = { success: true };

    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockData),
    });

    await fetchClient('/characters?limit=10');

    expect(fetch).toHaveBeenCalledWith(
      `${mockBaseUrl}/characters?limit=10&apikey=${mockApiKey}`,
      expect.any(Object),
    );
  });

  it('Handles HTTP errors correctly', async () => {
    (fetch as Mock).mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    await expect(fetchClient('/invalid-endpoint')).rejects.toThrow(
      'Failed to fetch - 404: Not Found',
    );
  });

  it('Allows passing custom request options', async () => {
    const mockData = { success: true };

    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockData),
    });

    await fetchClient('/test', { method: 'POST', headers: { 'Content-Type': 'application/json' } });

    expect(fetch).toHaveBeenCalledWith(
      `${mockBaseUrl}/test?apikey=${mockApiKey}`,
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }),
    );
  });

  it('Throws an error when fetch fails (network error)', async () => {
    (fetch as Mock).mockRejectedValue(new Error('Network error'));

    await expect(fetchClient('/test')).rejects.toThrow('Network error');
  });
});
