import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@/tests/tools';
import { SearchBar } from '../SearchBar';

describe('SearchBar Component', () => {
  it('Shows search input with placeholder text and search icon', () => {
    render(<SearchBar onSearch={() => {}} />);

    expect(screen.getByRole('searchbox')).toHaveAttribute('type', 'search');
    expect(screen.getByRole('img', { name: 'search' })).toBeInTheDocument();
  });

  it('Allows typing in the search input', () => {
    render(<SearchBar onSearch={() => {}} />);
    const input = screen.getByRole('searchbox');

    fireEvent.change(input, { target: { value: 'Spider-Man' } });

    expect(input).toHaveValue('Spider-Man');
  });

  it('Calls onSearch with the correct value after debounce', async () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByRole('searchbox');

    fireEvent.change(input, { target: { value: 'Iron Man' } });

    // Wait for the debounce delay to complete
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('Iron Man');
    });
  });

  it('Does not call onSearch immediately while typing', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByRole('searchbox');

    fireEvent.change(input, { target: { value: 'Hulk' } });

    expect(mockOnSearch).not.toHaveBeenCalled();
  });
});
