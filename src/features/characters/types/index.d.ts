import type { MarvelComic } from '@/types/marvel';

export type Comic = Omit<MarvelComic, 'dates'> & { onsaleDate: string };
