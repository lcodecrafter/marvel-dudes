import { describe, it, expect } from 'vitest';
import { CharactersGrid } from '../CharactersGrid';
import { render, screen } from '@/tests/tools';
import { mockCharacters } from '@/tests/mocks';

describe('CharactersGrid Component', () => {
  it('Shows loading message when isLoading is true', () => {
    render(<CharactersGrid characters={[]} isLoading={true} error={false} />);
    expect(screen.getByText(/Loading characters.../i)).toBeInTheDocument();
  });

  it('Shows error message when error is true', () => {
    render(<CharactersGrid characters={[]} isLoading={false} error={true} />);
    expect(screen.getByText(/Error loading the characters./i)).toBeInTheDocument();
  });

  it('Shows a list of characters', () => {
    render(<CharactersGrid characters={mockCharacters} isLoading={false} error={false} />);

    expect(screen.getByText('Spider-Man')).toBeInTheDocument();
    expect(screen.getByText('Iron Man')).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });

  it('Truncates long character names', () => {
    const longNameCharacters = [...mockCharacters];
    longNameCharacters[0].name = 'This is a very long character name that should be truncated';

    render(<CharactersGrid characters={longNameCharacters} isLoading={false} error={false} />);

    const name = screen.getByText(longNameCharacters[0].name);
    expect(name).toHaveClass('truncate');
  });

  it('Shows fav button', () => {
    render(<CharactersGrid characters={mockCharacters} isLoading={false} error={false} />);
    const heartButton = screen.getAllByRole('button', { name: 'heart' })[0];
    expect(heartButton).toBeInTheDocument();
  });
});
