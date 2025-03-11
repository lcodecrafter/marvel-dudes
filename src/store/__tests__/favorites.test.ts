import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFavoritesStore } from '../favorites';
import { mockCharacters } from '@/tests/mocks';

describe('Favorites Store', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ favorites: {} });
  });

  it('Adds a favorite character', () => {
    const { result } = renderHook(() => useFavoritesStore());
    const character = mockCharacters[0];

    act(() => {
      result.current.addFavorite(character);
    });

    expect(result.current.favorites[character.id]).toEqual(character);
  });

  it('Removes a favorite character', () => {
    const { result } = renderHook(() => useFavoritesStore());
    const character = mockCharacters[0];
    const character2 = mockCharacters[1];

    act(() => {
      result.current.addFavorite(character);
      result.current.addFavorite(character2);
      result.current.removeFavorite(character.id);
    });

    expect(result.current.favorites).not.toContain(character.id);
    expect(result.current.favorites).toEqual({ [character2.id]: character2 });
  });

  it('Checks if a character is favorite', () => {
    const { result } = renderHook(() => useFavoritesStore());
    const character = mockCharacters[0];
    const character2 = mockCharacters[1];

    act(() => {
      result.current.addFavorite(character);
    });

    expect(result.current.isFavorite(character.id)).toBe(true);
    expect(result.current.isFavorite(character2.id)).toBe(false);
  });
});
