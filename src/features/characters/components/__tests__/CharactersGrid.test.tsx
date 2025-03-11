import { describe, it, expect, vi, Mock, beforeEach } from 'vitest';
import { CharactersGrid } from '../CharactersGrid';
import { render, screen, fireEvent } from '@/tests/tools';
import { mockCharacters } from '@/tests/mocks';
import { useFavoritesStore } from '@/store/favorites';

vi.mock('@/store/favorites');

describe('CharactersGrid Component', () => {
  let mockFavoritesStore: Mock;

  beforeEach(() => {
    mockFavoritesStore = useFavoritesStore as unknown as Mock;

    mockFavoritesStore.mockReturnValue({
      favorites: [],
      isFavorite: () => false,
      addFavorite: vi.fn(),
      removeFavorite: vi.fn(),
    });
  });

  it('Shows error message when error is true', () => {
    render(<CharactersGrid characters={[]} error={true} />);
    expect(screen.getByText(/Error loading the characters./i)).toBeInTheDocument();
  });

  it('Shows a list of characters', () => {
    render(<CharactersGrid characters={mockCharacters} error={false} />);

    expect(screen.getByText(mockCharacters[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockCharacters[1].name)).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(mockCharacters.length);
  });

  it('Truncates long character names', () => {
    const longNameCharacters = [...mockCharacters];
    longNameCharacters[0].name = 'This is a very long character name that should be truncated';

    render(<CharactersGrid characters={longNameCharacters} error={false} />);

    const name = screen.getByText(longNameCharacters[0].name);
    expect(name).toHaveClass('truncate');
  });

  it('Shows fav button', () => {
    render(<CharactersGrid characters={mockCharacters} error={false} />);
    expect(screen.getAllByRole('button', { name: 'Add favorite' })).toHaveLength(
      mockCharacters.length,
    );
  });

  it('Displays the characters with initial non-favorite state', () => {
    render(<CharactersGrid characters={mockCharacters} error={false} />);

    expect(screen.getAllByRole('button', { name: /add favorite/i })).toHaveLength(
      mockCharacters.length,
    );
  });

  it('Displays favorite icon when user clicks on a non-favorite', () => {
    const addFavoriteMock = vi.fn();
    const nonFavoriteCharacterId = mockCharacters[0].id;

    mockFavoritesStore.mockReturnValue({
      favorites: [],
      isFavorite: () => false,
      addFavorite: addFavoriteMock,
      removeFavorite: vi.fn(),
    });

    render(<CharactersGrid characters={mockCharacters} error={false} />);

    const favoriteButton = screen.getAllByRole('button', { name: 'Add favorite' })[0];
    fireEvent.click(favoriteButton);

    expect(addFavoriteMock).toHaveBeenCalledWith(mockCharacters[0]);

    mockFavoritesStore.mockReturnValue({
      favorites: { [nonFavoriteCharacterId]: mockCharacters[0] },
      isFavorite: (id: number) => id === nonFavoriteCharacterId,
      addFavorite: addFavoriteMock,
      removeFavorite: vi.fn(),
    });

    render(<CharactersGrid characters={mockCharacters} error={false} />);

    expect(screen.getAllByRole('button', { name: 'Remove favorite' })[0]).toBeInTheDocument();
  });

  it('Displays non-favorite icon when user clicks on a favorite', () => {
    const removeFavoriteMock = vi.fn();
    const favoriteCharacterId = mockCharacters[0].id;

    mockFavoritesStore.mockReturnValue({
      favorites: [favoriteCharacterId],
      isFavorite: (id: number) => id === favoriteCharacterId,
      addFavorite: vi.fn(),
      removeFavorite: removeFavoriteMock,
    });

    render(<CharactersGrid characters={mockCharacters} error={false} />);

    const favoriteButton = screen.getAllByRole('button', { name: 'Remove favorite' })[0];
    fireEvent.click(favoriteButton);

    expect(removeFavoriteMock).toHaveBeenCalledWith(favoriteCharacterId);

    mockFavoritesStore.mockReturnValue({
      favorites: [],
      isFavorite: () => false,
      addFavorite: vi.fn(),
      removeFavorite: removeFavoriteMock,
    });

    render(<CharactersGrid characters={mockCharacters} error={false} />);

    expect(screen.getAllByRole('button', { name: 'Add favorite' })[0]).toBeInTheDocument();
  });
});
