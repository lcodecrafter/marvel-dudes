import { useQuery } from '@tanstack/react-query';
import { getCharacterById, getComicsByCharacter } from '../services/api';
import { Comic } from '../types';
import { useLoadingStore } from '@/store/loading';
import { useEffect } from 'react';

export function useCharacterDetail(characterId: string | undefined) {
  const id = characterId || '';
  const { setLoading } = useLoadingStore();

  // Fetch character details
  const {
    data: character = null,
    isLoading: isLoadingCharacter,
    error: characterError,
  } = useQuery({
    queryKey: ['character', id],
    queryFn: () => getCharacterById(id),
    enabled: !!id,
  });

  // Fetch comics
  const {
    data: comicsRaw = [],
    isLoading: isLoadingComics,
    error: comicsError,
  } = useQuery({
    queryKey: ['comics', id],
    queryFn: () => getComicsByCharacter(id),
    enabled: !!id,
  });

  const comics: Comic[] = comicsRaw.map((comic) => ({
    id: comic.id,
    title: comic.title,
    thumbnail: comic.thumbnail,
    onsaleDate: (() => {
      const onsaleDateRaw = comic.dates.find((date) => date.type === 'onsaleDate')?.date;
      return onsaleDateRaw ? new Date(onsaleDateRaw).getFullYear().toString() : 'N/A';
    })(),
  }));

  const isLoading = isLoadingCharacter || isLoadingComics;

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  return {
    character,
    comics: comics,
    isLoading,
    error: characterError || comicsError,
  };
}
