import { describe, it, expect, vi, Mock } from 'vitest';
import { render, screen } from '@/tests/tools';
import { Header } from '../Header';
import { useFavoritesStore } from '@/store/favorites';
import { useLoadingStore } from '@/store/loading';

vi.mock('@/store/favorites');
vi.mock('@/store/loading');

describe('Header Component', () => {
  const mockUseLoadingStore = useLoadingStore as unknown as Mock;
  const mockFavoritesStore = useFavoritesStore as unknown as Mock;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Displays the loading spinner when loading is true', () => {
    mockUseLoadingStore.mockReturnValue({ isLoading: true });

    render(<Header />);

    const loadingBar = screen.getByRole('progressbar');

    expect(loadingBar).toBeInTheDocument();
    expect(loadingBar).toHaveAttribute('aria-valuetext', 'Loading...');
  });

  it('Hides the loading spinner when loading is false', () => {
    mockUseLoadingStore.mockReturnValue({ isLoading: false });

    render(<Header />);
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('Displays the logo', () => {
    render(<Header />);
    expect(screen.getByRole('img', { name: 'Marvel Logo' })).toBeInTheDocument();
  });

  it('Displays the correct number of favorites', () => {
    mockFavoritesStore.mockReturnValue(3);

    render(<Header />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('Displays "0" when there are no favorites', () => {
    mockFavoritesStore.mockReturnValue(0);

    render(<Header />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('Displays the heart icon for favorites', () => {
    mockFavoritesStore.mockReturnValue([1]);

    render(<Header />);
    expect(screen.getByLabelText(/heart.*/i)).toBeInTheDocument();
  });
});
