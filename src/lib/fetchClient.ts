function ensureEndsWithSlash(base: string): string {
  return base.endsWith('/') ? base : `${base}/`;
}

function ensureNoLeadingSlash(path: string): string {
  return path.startsWith('/') ? path.slice(1) : path;
}

export const createFetchClient = (baseUrl: string, apiKey: string) => {
  const finalBase = ensureEndsWithSlash(baseUrl);

  return async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
    const finalEndpoint = ensureNoLeadingSlash(endpoint);

    const url = new URL(finalEndpoint, finalBase);
    url.searchParams.append('apikey', apiKey);

    const response = await fetch(url.href, { ...options });

    if (!response.ok) {
      throw new Error(`Failed to fetch - ${response.status}: ${response.statusText}`);
    }

    return response.json();
  };
};
