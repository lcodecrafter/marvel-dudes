interface thumbnail {
  path: string;
  extension: string;
}

export interface MarvelCharacter {
  id: number;
  name: string;
  description: string;
  thumbnail: thumbnail;
}

export interface MarvelComic {
  id: number;
  title: string;
  thumbnail: thumbnail;
  dates: { type: string; date: string }[];
}
