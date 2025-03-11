import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@/tests/tools';
import { useLoadingStore } from '../loading';

describe('useLoadingStore', () => {
  beforeEach(() => {
    useLoadingStore.setState({ isLoading: false });
  });

  it('Has an initial state of isLoading as false', () => {
    const { result } = renderHook(() => useLoadingStore());
    expect(result.current.isLoading).toBe(false);
  });

  it('Updates isLoading to true when setLoading(true) is called', () => {
    const { result } = renderHook(() => useLoadingStore());

    act(() => {
      result.current.setLoading(true);
    });

    expect(result.current.isLoading).toBe(true);
  });

  it('Updates isLoading back to false when setLoading(false) is called', () => {
    const { result } = renderHook(() => useLoadingStore());

    act(() => {
      result.current.setLoading(true);
    });
    expect(result.current.isLoading).toBe(true);

    act(() => {
      result.current.setLoading(false);
    });
    expect(result.current.isLoading).toBe(false);
  });
});
