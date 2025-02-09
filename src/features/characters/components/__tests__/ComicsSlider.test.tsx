import { describe, it, expect } from 'vitest';
import { render, screen } from '@/tests/tools';
import { ComicsSlider } from '../ComicsSlider';
import { mockComics } from '@/tests/mocks';

describe('ComicsSlider Component', () => {
  it('Renders the correct number of comics', () => {
    render(<ComicsSlider comics={mockComics} />);

    expect(screen.getAllByRole('img')).toHaveLength(mockComics.length);
  });

  it('Displays the title and release year for each comic', () => {
    render(<ComicsSlider comics={mockComics} />);

    mockComics.forEach((comic) => {
      expect(screen.getByRole('heading', { name: comic.title })).toBeInTheDocument();

      const releaseDate = new Date(comic.onsaleDate);
      const releaseYear = isNaN(releaseDate.getTime()) ? 'Unknown' : releaseDate.getFullYear();

      expect(screen.getByText(String(releaseYear))).toBeInTheDocument();
    });
  });

  it('Adds the correct aria-label to each comic', () => {
    render(<ComicsSlider comics={mockComics} />);

    mockComics.forEach((comic) => {
      expect(screen.getByLabelText(`Comic: ${comic.title}`)).toBeInTheDocument();
    });
  });

  it('Truncates long titles after two lines', () => {
    render(<ComicsSlider comics={mockComics} />);
    const truncatedTitle = screen.getAllByRole('heading')[0];

    expect(truncatedTitle).toHaveClass('line-clamp-2');
  });

  it('Renders the correct image for each comic', () => {
    render(<ComicsSlider comics={mockComics} />);

    mockComics.forEach((comic) => {
      const img = screen.getByRole('img', { name: comic.title });
      expect(img).toHaveAttribute('src', `${comic.thumbnail.path}.${comic.thumbnail.extension}`);
    });
  });

  it('Displays "Unknown" for missing or invalid onsaleDate', () => {
    render(<ComicsSlider comics={mockComics} />);
    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });
});
