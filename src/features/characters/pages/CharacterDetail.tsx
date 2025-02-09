import { useParams } from 'react-router-dom';
import { useCharacterDetail } from '@/features/characters/hooks/useCharacterDetail';
import { useFavoritesStore } from '@/store/favorites';
import { ComicsSlider } from '@/features/characters/components/ComicsSlider';
import { FavoriteButton } from '@/components/ui/FavoriteButton';

export function CharacterDetail() {
  const { id } = useParams<{ id: string }>();
  const { character, comics, isLoading, error } = useCharacterDetail(id || '');
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();

  if (isLoading) return <div className="text-center text-gray-500">Loading...</div>;

  if (error && error.message !== 'CHARACTER_NOT_FOUND') {
    return <div className="text-center text-red-500">Error loading character details.</div>;
  }

  if (!character) {
    return <div className="text-center text-gray-500">Character not found.</div>;
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row lg:lg:px-[276px] bg-black">
        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
          className="w-ful h-auto sm:w-[278px] sm:h-[278px]"
        />
        <div className="flex flex-col justify-center w-full px-4 sm:px-12 py-6 text-white">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">{character.name}</h1>

            <FavoriteButton
              isFavorite={isFavorite(character.id)}
              onAdd={() => addFavorite(character)}
              onRemove={() => removeFavorite(character.id)}
              iconClassName="w-6 h-5.5"
              className="self-start"
            />
          </div>

          <p className="text-sm">{character.description || 'No description available.'}</p>
        </div>
      </div>

      <section className="p-4 pt-6 md:p-12 lg:px-[276px] ">
        <h2 className="mb-6 text-2xl font-bold uppercase">Comics</h2>
        <ComicsSlider comics={comics} />
      </section>
    </div>
  );
}
