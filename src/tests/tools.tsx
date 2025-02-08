import { render, screen, fireEvent, within, waitFor, act } from '@testing-library/react';
import type { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';

function renderWithRouter(ui: ReactNode) {
  return {
    ...render(<MemoryRouter>{ui}</MemoryRouter>),
  };
}

export { renderWithRouter as render, screen, fireEvent, within, waitFor, act };
