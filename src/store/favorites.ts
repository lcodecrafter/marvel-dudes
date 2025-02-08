import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MarvelCharacter } from '@/types/marvel';

interface FavoriteState {
  favorites: Record<number, MarvelCharacter>; // Store characters as an object
  addFavorite: (character: MarvelCharacter) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: {},
      addFavorite: (character) =>
        set((state) => ({
          favorites: { ...state.favorites, [character.id]: character },
        })),
      removeFavorite: (id) =>
        set((state) => {
          const newFavorites = { ...state.favorites };
          delete newFavorites[id];
          return { favorites: newFavorites };
        }),
      isFavorite: (id) => Boolean(get().favorites[id]),
    }),
    {
      name: 'favorites-storage',
    },
  ),
);
