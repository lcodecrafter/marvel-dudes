import { Link } from 'react-router-dom';
import { MarvelCharacter } from '@/types/marvel';
import { HeartIcon } from '@/components/ui/icons';
import { useFavoritesStore } from '@/store/favorites';

interface CharactersGridProps {
  characters: MarvelCharacter[];
  isLoading: boolean;
  error: boolean;
}

export function CharactersGrid({ characters, isLoading, error }: CharactersGridProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  if (isLoading) return <div className="text-center text-gray-500">Loading characters...</div>;
  if (error) return <div className="text-center text-red-500">Error loading the characters.</div>;

  return (
    <div className="grid gap-4 py-6 grid-cols-[repeat(auto-fill,minmax(188px,1fr))]">
      {' '}
      {characters.map((character) => {
        const favorite = isFavorite(character.id);

        return (
          <div key={character.id} className="bg-white">
            <Link to={`/character/${character.id}`}>
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
                className="w-full h-[188px] object-cover"
              />
            </Link>

            <div className="relative flex flex-col w-full h-[61px] bg-black text-white text-sm uppercase">
              <div className="w-full h-[5px] bg-red-500"></div>
              <div className="flex justify-between items-center w-full pt-4 px-4">
                <span className="w-[calc(100%-24px)] truncate">{character.name}</span>
                <button
                  aria-label={favorite ? 'Remove favorite' : 'Add favorite'}
                  onClick={() =>
                    favorite ? removeFavorite(character.id) : addFavorite(character.id)
                  }
                  className="flex items-center justify-center h-6 w-6 cursor-pointer hover:scale-125"
                >
                  <HeartIcon className="w-3 h-2.5" variant={favorite ? 'filled' : 'outlined'} />
                </button>
              </div>
              <div className="absolute bottom-0 right-0 w-5 h-5 bg-white transform rotate-45 translate-x-2.5 translate-y-2.5 "></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
