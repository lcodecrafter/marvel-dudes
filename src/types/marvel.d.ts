interface thumbnail {
  path: string;
  extension: string;
}

export interface MarvelCharacter {
  id: string;
  name: string;
  description: string;
  thumbnail: thumbnail;
}

export interface MarvelComic {
  id: string;
  title: string;
  thumbnail: thumbnail;
}
