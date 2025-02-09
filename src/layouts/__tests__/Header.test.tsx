import { describe, it, expect, vi, Mock } from 'vitest';
import { render, screen } from '@/tests/tools';
import { Header } from '../Header';
import { useFavoritesStore } from '@/store/favorites';

vi.mock('@/store/favorites');

describe('Header Component', () => {
  it('Displays the logo', () => {
    render(<Header />);
    expect(screen.getByRole('img', { name: 'Marvel Logo' })).toBeInTheDocument();
  });

  it('Displays the correct number of favorites', () => {
    const mockFavoritesStore = useFavoritesStore as unknown as Mock;
    mockFavoritesStore.mockReturnValue(3);

    render(<Header />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('Displays "0" when there are no favorites', () => {
    const mockFavoritesStore = useFavoritesStore as unknown as Mock;
    mockFavoritesStore.mockReturnValue(0);

    render(<Header />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('Displays the heart icon for favorites', () => {
    const mockFavoritesStore = useFavoritesStore as unknown as Mock;
    mockFavoritesStore.mockReturnValue([1]);

    render(<Header />);
    expect(screen.getByLabelText(/heart.*/i)).toBeInTheDocument();
  });
});
