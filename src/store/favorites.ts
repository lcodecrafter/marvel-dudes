import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoriteState {
  favorites: number[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (id) =>
        set((state) => ({
          favorites: [...state.favorites, id],
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((favoriteId) => favoriteId !== id),
        })),
      isFavorite: (id) => get().favorites.includes(id),
    }),
    {
      name: 'favorites-storage',
    },
  ),
);
