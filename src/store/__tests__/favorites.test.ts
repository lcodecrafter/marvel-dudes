import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFavoritesStore } from '../favorites';

describe('Favorites Store', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useFavoritesStore());
    act(() => {
      result.current.favorites = [];
    });
  });

  it('Adds a favorite character', () => {
    const { result } = renderHook(() => useFavoritesStore());

    act(() => {
      result.current.addFavorite(1);
    });

    expect(result.current.favorites).toContain(1);
  });

  it('Removes a favorite character', () => {
    const { result } = renderHook(() => useFavoritesStore());

    act(() => {
      result.current.addFavorite(1);
      result.current.addFavorite(2);
      result.current.removeFavorite(1);
    });

    expect(result.current.favorites).not.toContain(1);
    expect(result.current.favorites).toContain(2);
  });

  it('Checks if a character is favorite', () => {
    const { result } = renderHook(() => useFavoritesStore());

    act(() => {
      result.current.addFavorite(1);
    });

    expect(result.current.isFavorite(1)).toBe(true);
    expect(result.current.isFavorite(2)).toBe(false);
  });
});
