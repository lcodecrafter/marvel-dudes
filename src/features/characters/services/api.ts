import { fetchClient } from '../../../lib/fetchClient';
import type { MarvelCharacter, MarvelComic } from '@/types/marvel';

export const getCharacters = async (search?: string): Promise<MarvelCharacter[]> => {
  const query = search ? `&nameStartsWith=${search}` : '';
  const response = await fetchClient<{ data: { results: MarvelCharacter[] } }>(
    `/characters?limit=50${query}`,
  );
  return response.data.results || [];
};

export const getCharacterById = async (id: string): Promise<MarvelCharacter> => {
  const response = await fetchClient<{ data: { results: MarvelCharacter[] } }>(`/characters/${id}`);
  const character = response.data.results[0];
  if (!character) throw new Error('CHARACTER_NOT_FOUND');
  return character;
};

export const getComicsByCharacter = async (characterId: string): Promise<MarvelComic[]> => {
  const response = await fetchClient<{ data: { results: MarvelComic[] } }>(
    `/characters/${characterId}/comics?limit=20&orderBy=onsaleDate`,
  );
  return response.data.results || [];
};
