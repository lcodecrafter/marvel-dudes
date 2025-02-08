import { useFavoritesStore } from '@/store/favorites';
import { CharactersGrid } from '../components/CharactersGrid';
import { SearchBar } from '../components/SearchBar';
import { useState } from 'react';

export function Favorites() {
  const [search, setSearch] = useState('');
  const { favorites } = useFavoritesStore();
  const favoriteCharacters = Object.values(favorites);

  const filteredFavorites = favoriteCharacters.filter((character) =>
    character.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <div className=" mb-9">
        <SearchBar onSearch={setSearch} />
        <p className="mt-3 text-black text-xs uppercase">{filteredFavorites.length} results</p>
      </div>
      <CharactersGrid characters={filteredFavorites} isLoading={false} error={false} />
    </div>
  );
}
