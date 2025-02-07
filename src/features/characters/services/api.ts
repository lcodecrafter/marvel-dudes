import { fetchClient } from '../../../lib/fetchClient';
import type { MarvelCharacter, MarvelComic } from '@/types/marvel';

export const getCharacters = async (search?: string) => {
  const query = search ? `&nameStartsWith=${search}` : '';
  return fetchClient<{ data: { results: MarvelCharacter[] } }>(`/characters?limit=50${query}`);
};

export const getCharacterById = async (id: string) => {
  return fetchClient<{ data: { results: MarvelCharacter } }>(`/characters/${id}`);
};

export const getComicsByCharacter = async (characterId: string) => {
  return fetchClient<MarvelComic>(`/characters/${characterId}/comics?limit=20`);
};
