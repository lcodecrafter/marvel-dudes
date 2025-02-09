import { MarvelCharacter } from '@/types/marvel';
import { Comic } from '@/features/characters/types';

export const mockCharacters: MarvelCharacter[] = [
  {
    id: 1,
    name: 'Spider-Man',
    thumbnail: { path: 'http://example.com/spiderman', extension: 'jpg' },
    description: 'The amazing spiderman',
  },
  {
    id: 2,
    name: 'Iron Man',
    thumbnail: { path: 'http://example.com/ironman', extension: 'jpg' },
    description: 'The invincible ironman',
  },
];

export const mockComics = [
  {
    id: 1,
    title: 'Comic Title 1',
    thumbnail: { path: 'http://example.com/image1', extension: 'jpg' },
    dates: [{ type: 'onsaleDate', date: '2023-06-10T00:00:00-0500' }],
  },
  {
    id: 2,
    title: 'Comic Title 2',
    thumbnail: { path: 'http://example.com/image2', extension: 'jpg' },
    dates: [{ type: 'onsaleDate', date: '2020-09-15T00:00:00-0500' }],
  },
  {
    id: 3,
    title: 'Comic Title 3',
    thumbnail: { path: 'http://example.com/image3', extension: 'jpg' },
    dates: [{ type: 'differentDateType', date: '2018-02-22T00:00:00-0500' }],
  },
];

export const mockComicsProcessed: Comic[] = [
  {
    id: 1,
    title: 'Comic Title 1',
    thumbnail: { path: 'http://example.com/image1', extension: 'jpg' },
    onsaleDate: '2022-01-01T00:00:00Z',
  },
  {
    id: 2,
    title: 'Comic Title 2 with a very long title that should be truncated',
    thumbnail: { path: 'http://example.com/image2', extension: 'jpg' },
    onsaleDate: '2020-05-15T00:00:00Z',
  },
  {
    id: 3,
    title: 'Comic Title 3',
    thumbnail: { path: 'http://example.com/image3', extension: 'jpg' },
    onsaleDate: 'invalid-date',
  },
];
