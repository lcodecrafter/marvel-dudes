interface thumbnail {
  path: string;
  extension: string;
}

export interface MarvelCharacter {
  id: number;
  name: string;
  thumbnail: thumbnail;
}

export interface MarvelComic {
  id: number;
  title: string;
  thumbnail: thumbnail;
}
