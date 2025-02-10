import { describe, it, expect, vi, Mock } from 'vitest';
import { getCharacters, getCharacterById, getComicsByCharacter } from '../api';
import { fetchClient } from '@/lib/fetchClient';
import { mockCharacters, mockComics } from '@/tests/mocks';

vi.mock('@/lib/fetchClient');

describe('API Service', () => {
  const mockFetchClient = fetchClient as Mock;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getCharacters', () => {
    it('Fetches characters successfully', async () => {
      mockFetchClient.mockResolvedValue({ data: { results: mockCharacters } });

      const result = await getCharacters();
      expect(fetchClient).toHaveBeenCalledWith('/characters?limit=50');
      expect(result).toEqual(mockCharacters);
    });

    it('Fetches characters with search query', async () => {
      mockFetchClient.mockResolvedValue({ data: { results: mockCharacters } });

      const result = await getCharacters('Spider');
      expect(fetchClient).toHaveBeenCalledWith('/characters?limit=50&nameStartsWith=Spider');
      expect(result).toEqual(mockCharacters);
    });

    it('Feturns an empty array when no characters are found', async () => {
      mockFetchClient.mockResolvedValue({ data: { results: [] } });

      const result = await getCharacters('UnknownCharacter');
      expect(result).toEqual([]);
    });
  });

  describe('getCharacterById', () => {
    it('Fetches a character by ID successfully', async () => {
      mockFetchClient.mockResolvedValue({ data: { results: [mockCharacters[0]] } });

      const result = await getCharacterById('1011334');
      expect(fetchClient).toHaveBeenCalledWith('/characters/1011334');
      expect(result).toEqual(mockCharacters[0]);
    });

    it('throws an error if character is not found', async () => {
      mockFetchClient.mockResolvedValue({ data: { results: [] } });

      await expect(getCharacterById('9999999')).rejects.toThrow('CHARACTER_NOT_FOUND');
    });
  });

  describe('getComicsByCharacter', () => {
    it('Fetches comics for a character successfully', async () => {
      mockFetchClient.mockResolvedValue({ data: { results: mockComics } });

      const result = await getComicsByCharacter('1011334');
      expect(fetchClient).toHaveBeenCalledWith(
        '/characters/1011334/comics?limit=20&orderBy=onsaleDate',
      );
      expect(result).toEqual(mockComics);
    });

    it('Returns an empty array if no comics are found', async () => {
      mockFetchClient.mockResolvedValue({ data: { results: [] } });

      const result = await getComicsByCharacter('1011334');
      expect(result).toEqual([]);
    });
  });
});
