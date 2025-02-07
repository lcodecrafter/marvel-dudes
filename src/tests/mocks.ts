import { MarvelCharacter } from '@/types/marvel';

export const mockCharacters: MarvelCharacter[] = [
  {
    id: 1,
    name: 'Spider-Man',
    thumbnail: { path: 'http://example.com/spiderman', extension: 'jpg' },
  },
  {
    id: 2,
    name: 'Iron Man',
    thumbnail: { path: 'http://example.com/ironman', extension: 'jpg' },
  },
];
