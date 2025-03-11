import { Link } from 'react-router-dom';
import { MarvelCharacter } from '@/types/marvel';
import { useFavoritesStore } from '@/store/favorites';
import { FavoriteButton } from '@/components/ui/FavoriteButton';
import styles from './CharactersGrid.module.css';
interface CharactersGridProps {
  characters: MarvelCharacter[];
  error: boolean;
}

export function CharactersGrid({ characters, error }: CharactersGridProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  if (error) return <div className="text-center text-red-500">Error loading the characters.</div>;

  return (
    <div role="list" className="grid gap-4 py-6 grid-cols-[repeat(auto-fill,minmax(188px,1fr))]">
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

            <div
              className={`${styles.characterInfo} flex flex-col w-full h-[61px] bg-black text-white text-sm uppercase`}
            >
              <div className="z-1 flex justify-between items-center w-full pt-5 px-4">
                <span className="w-[calc(100%-24px)] truncate">{character.name}</span>
                <FavoriteButton
                  className={styles.favoriteButton}
                  isFavorite={favorite}
                  onAdd={() => {
                    addFavorite(character);
                  }}
                  onRemove={() => {
                    removeFavorite(character.id);
                  }}
                />
              </div>
              <div className="z-1 absolute bottom-0 right-0 w-5 h-5 bg-white transform rotate-45 translate-x-2.5 translate-y-2.5 "></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
