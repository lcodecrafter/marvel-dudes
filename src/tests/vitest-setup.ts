import '@testing-library/jest-dom';
import { cleanup, configure } from '@testing-library/react';
import { afterEach } from 'vitest';

configure({
  throwSuggestions: true,
});

afterEach(() => {
  cleanup();
});
