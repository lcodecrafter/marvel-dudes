import { describe, it, expect, vi, Mock, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@/tests/tools';
import { Favorites } from '../Favorites';
import { useFavoritesStore } from '@/store/favorites';
import { mockCharacters } from '@/tests/mocks';

vi.mock('@/store/favorites');

describe('Favorites Page', () => {
  let mockFavoritesStore: Mock;
  const favorites = {
    [mockCharacters[0].id]: mockCharacters[0],
    [mockCharacters[1].id]: mockCharacters[1],
  };

  beforeEach(() => {
    mockFavoritesStore = useFavoritesStore as unknown as Mock;
    mockFavoritesStore.mockReturnValue({
      favorites: favorites,
      isFavorite: vi.fn((id) => Boolean(favorites[id])),
      addFavorite: vi.fn(),
      removeFavorite: vi.fn(),
    });
  });

  it('Displays the list of favorite characters', () => {
    render(<Favorites />);

    expect(screen.getByText(mockCharacters[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockCharacters[1].name)).toBeInTheDocument();
  });

  it('Shows the correct number of results', () => {
    render(<Favorites />);
    expect(screen.getByRole('paragraph')).toHaveTextContent('2 results');
  });

  it('Filters characters by search input', async () => {
    render(<Favorites />);

    const searchInput = screen.getByRole('searchbox');
    fireEvent.change(searchInput, { target: { value: mockCharacters[0].name } });

    await waitFor(() => {
      expect(screen.getByText(mockCharacters[0].name)).toBeInTheDocument();
      expect(screen.queryByText(mockCharacters[1].name)).not.toBeInTheDocument();
      expect(screen.getByRole('paragraph')).toHaveTextContent('1 results');
    });
  });

  it('Shows 0 results when no matching character is found', async () => {
    mockFavoritesStore.mockReturnValue({
      favorites: {},
    });
    render(<Favorites />);

    const searchInput = screen.getByRole('searchbox');
    fireEvent.change(searchInput, { target: { value: 'NonExistingCharacter' } });

    await waitFor(() => {
      expect(screen.queryByText(mockCharacters[0].name)).not.toBeInTheDocument();
      expect(screen.queryByText(mockCharacters[1].name)).not.toBeInTheDocument();
      expect(screen.getByRole('paragraph')).toHaveTextContent('0 results');
    });
  });

  it('Removes a favorite when clicking the remove button', async () => {
    render(<Favorites />);

    const removeButton = screen.getAllByRole('button', { name: 'Remove favorite' })[0];

    fireEvent.click(removeButton);

    expect(mockFavoritesStore().removeFavorite).toHaveBeenCalledWith(mockCharacters[0].id);
  });
});
