import { describe, it, expect, vi, Mock } from 'vitest';
import { render, screen, fireEvent } from '@/tests/tools';
import { CharactersList } from '../CharactersList';
import { useQuery } from '@tanstack/react-query';
import { mockCharacters } from '@/tests/mocks';

vi.mock('@tanstack/react-query');
vi.mock('@/store/loading', () => ({
  useLoadingStore: vi.fn().mockReturnValue({ setLoading: vi.fn() }),
}));

describe('CharactersList Component', () => {
  it('Displays the search bar and initial results count', () => {
    const mockRQ = useQuery as Mock;
    mockRQ.mockReturnValue({
      data: [],
      isLoading: false,
      error: false,
    });

    render(<CharactersList />);

    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByRole('paragraph')).toHaveTextContent('0 results');
  });

  it('Displays loading state when data is being fetched', () => {
    const mockRQ = useQuery as Mock;
    mockRQ.mockReturnValue({
      data: [],
      isLoading: true,
      error: false,
    });

    render(<CharactersList />);
    expect(screen.getByRole('status')).toHaveTextContent(/loading characters.../i);
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('Displays characters when the API returns results', () => {
    const mockRQ = useQuery as Mock;
    mockRQ.mockReturnValue({
      data: mockCharacters,
      isLoading: false,
      error: false,
    });

    render(<CharactersList />);

    mockCharacters.forEach((character) => {
      expect(screen.getByText(character.name)).toBeInTheDocument();
    });
    expect(screen.getByRole('paragraph')).toHaveTextContent(`${mockCharacters.length} results`);
  });

  it('Displays "no results" message when search yields no results', () => {
    const mockRQ = useQuery as Mock;
    mockRQ.mockReturnValue({
      data: [],
      isLoading: false,
      error: false,
    });

    render(<CharactersList />);
    const searchInput = screen.getByRole('searchbox');

    fireEvent.change(searchInput, { target: { value: 'UnknownCharacter' } });

    expect(screen.getByRole('paragraph')).toHaveTextContent('0 results');
  });

  it('Updates the results count and characters when the user searches', () => {
    const mockRQ = useQuery as Mock;
    mockRQ.mockReturnValueOnce({
      data: [mockCharacters[0]],
      isLoading: false,
      error: false,
    });

    render(<CharactersList />);
    const searchInput = screen.getByRole('searchbox');

    fireEvent.change(searchInput, { target: { value: 'Spider-Man' } });

    expect(screen.getByRole('paragraph')).toHaveTextContent('1 results');
    expect(screen.getByText(mockCharacters[0].name)).toBeInTheDocument();
  });

  it('Shows an error message when the API call fails', () => {
    const mockRQ = useQuery as Mock;
    mockRQ.mockReturnValue({
      data: [],
      isLoading: false,
      error: true,
    });

    render(<CharactersList />);
    expect(screen.getByText(/error loading the characters./i)).toBeInTheDocument();
  });
});
