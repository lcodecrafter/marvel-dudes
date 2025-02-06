export const fetchClient = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const API_KEY = import.meta.env.VITE_MARVEL_API_KEY;
  const BASE_URL = import.meta.env.VITE_MARVEL_BASE_URL;

  const url = `${BASE_URL}${endpoint}&apikey=${API_KEY}`;

  const response = await fetch(url, { ...options });

  if (!response.ok) {
    throw new Error(`Failed to fetch - ${response.status}: ${response.statusText}`);
  }

  return response.json();
};
