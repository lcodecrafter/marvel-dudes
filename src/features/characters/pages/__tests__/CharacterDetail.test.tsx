import { describe, it, expect, vi, Mock } from 'vitest';
import { render, screen } from '@/tests/tools';
import { CharacterDetail } from '../CharacterDetail';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { mockCharacters, mockComics } from '@/tests/mocks';
import { useFavoritesStore } from '@/store/favorites';
import { useLoadingStore } from '@/store/loading';

vi.mock('@tanstack/react-query');
vi.mock('@/store/favorites');
vi.mock('@/store/loading');
vi.mock('react-router-dom', async (importOriginal) => ({
  ...(await importOriginal()),
  useParams: vi.fn(),
}));

describe('CharacterDetail Component', () => {
  const mockUseQuery = useQuery as Mock;
  const mockUseFavoritesStore = useFavoritesStore as unknown as Mock;
  const mockUseLoadingStore = useLoadingStore as unknown as Mock;
  const mockUseParams = useParams as Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseParams.mockReturnValue({ id: '1011334' });

    mockUseFavoritesStore.mockReturnValue({
      isFavorite: vi.fn().mockReturnValue(false),
      addFavorite: vi.fn(),
      removeFavorite: vi.fn(),
    });

    mockUseLoadingStore.mockReturnValue({ setLoading: vi.fn() });
  });

  it('Displays loading state when data is being fetched', () => {
    mockUseQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    render(<CharacterDetail />);

    expect(screen.getByRole('status')).toHaveTextContent(/Loading characters details.../i);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('Displays "Character not found" if the character does not exist', () => {
    mockUseQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { message: 'CHARACTER_NOT_FOUND' },
    });

    render(<CharacterDetail />);
    expect(screen.getByText(/character not found./i)).toBeInTheDocument();
  });

  it('Displays an error message if there is a generic error', () => {
    mockUseQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { message: 'Something went wrong' },
    });

    render(<CharacterDetail />);
    expect(screen.getByText(/error loading character details./i)).toBeInTheDocument();
  });

  it('Renders the character details correctly', () => {
    const characterMock = mockCharacters[0];

    mockUseQuery
      .mockReturnValueOnce({
        data: characterMock,
        isLoading: false,
        error: null,
      })
      .mockReturnValueOnce({
        data: mockComics,
        isLoading: false,
        error: null,
      });

    mockUseFavoritesStore.mockReturnValue({
      isFavorite: vi.fn().mockReturnValue(true),
      addFavorite: vi.fn(),
      removeFavorite: vi.fn(),
    });

    render(<CharacterDetail />);

    expect(screen.getByRole('heading', { name: characterMock.name })).toBeInTheDocument();
    expect(screen.getByRole('paragraph')).toHaveTextContent(characterMock.description);
    expect(screen.getByRole('img', { name: characterMock.name })).toHaveAttribute(
      'src',
      `${characterMock.thumbnail.path}.${characterMock.thumbnail.extension}`,
    );

    const favoriteButton = screen.getByRole('button', { name: 'Remove favorite' });
    expect(favoriteButton).toBeInTheDocument();
  });

  it('Renders the comics slider correctly', () => {
    mockUseQuery
      .mockReturnValueOnce({
        data: mockCharacters[0],
        isLoading: false,
        error: null,
      })
      .mockReturnValueOnce({
        data: mockComics,
        isLoading: false,
        error: null,
      });

    render(<CharacterDetail />);

    mockComics.forEach((comic) => {
      expect(screen.getByRole('heading', { name: comic.title })).toBeInTheDocument();
    });
  });
});
