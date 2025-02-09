import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@/tests/tools';
import { FavoriteButton } from '../FavoriteButton';

describe('FavoriteButton Component', () => {
  it('Renders the button with the correct aria-label when not a favorite', () => {
    render(
      <FavoriteButton
        isFavorite={false}
        onAdd={() => {}}
        onRemove={() => {}}
        ariaLabelAdd="Add to favorites"
        ariaLabelRemove="Remove from favorites"
      />,
    );

    const button = screen.getByRole('button', { name: 'Add to favorites' });
    expect(button).toBeInTheDocument();
  });

  it('Renders the button with the correct aria-label when a favorite', () => {
    render(
      <FavoriteButton
        isFavorite={true}
        onAdd={() => {}}
        onRemove={() => {}}
        ariaLabelAdd="Add to favorites"
        ariaLabelRemove="Remove from favorites"
      />,
    );

    const button = screen.getByRole('button', { name: 'Remove from favorites' });
    expect(button).toBeInTheDocument();
  });

  it('Calls the onAdd function when clicked and not a favorite', () => {
    const mockOnAdd = vi.fn();
    const mockOnRemove = vi.fn();

    render(<FavoriteButton isFavorite={false} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

    const button = screen.getByRole('button', { name: 'Add favorite' });
    fireEvent.click(button);

    expect(mockOnAdd).toHaveBeenCalledTimes(1);
    expect(mockOnRemove).not.toHaveBeenCalled();
  });

  it('Calls the onRemove function when clicked and a favorite', () => {
    const mockOnAdd = vi.fn();
    const mockOnRemove = vi.fn();

    render(<FavoriteButton isFavorite={true} onAdd={mockOnAdd} onRemove={mockOnRemove} />);

    const button = screen.getByRole('button', { name: 'Remove favorite' });
    fireEvent.click(button);

    expect(mockOnRemove).toHaveBeenCalledTimes(1);
    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  it('Renders the HeartIcon with the correct variant based on isFavorite', () => {
    const { rerender } = render(
      <FavoriteButton isFavorite={false} onAdd={() => {}} onRemove={() => {}} />,
    );

    expect(screen.getByLabelText('heart-clear')).toBeInTheDocument();

    rerender(<FavoriteButton isFavorite={true} onAdd={() => {}} onRemove={() => {}} />);
    expect(screen.getByLabelText('heart-filled')).toBeInTheDocument();
  });
});
