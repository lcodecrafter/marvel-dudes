import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup, configure } from '@testing-library/react';
import { afterEach, expect } from 'vitest';

configure({
  throwSuggestions: true,
});

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
