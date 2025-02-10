import { describe, it, expect } from 'vitest';
import { render, screen } from '@/tests/tools';
import { Spinner } from '../Spinner';

describe('Spinner Component', () => {
  it('renders the spinner with the default message', () => {
    render(<Spinner />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it('renders the spinner with a custom message', () => {
    render(<Spinner message="Fetching data..." />);
    expect(screen.getByText(/fetching data.../i)).toBeInTheDocument();
  });
});
