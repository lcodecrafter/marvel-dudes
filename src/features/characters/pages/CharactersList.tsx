import { useQuery } from '@tanstack/react-query';
import { getCharacters } from '@/features/characters/services/api';
import { useState } from 'react';
import { CharactersGrid } from '../components/CharactersGrid';
import { SearchBar } from '../components/SearchBar';

export function CharactersList() {
  const [search, setSearch] = useState('');

  const {
    data: characters = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['characters', search],
    queryFn: () => getCharacters(search),
    staleTime: 24 * 60 * 60 * 1000,
  });

  return (
    <div className="p-4 pt-6 md:p-12">
      <div className=" mb-9">
        <SearchBar onSearch={setSearch} />
        <p className="mt-3 text-black text-xs uppercase">{characters.length} results</p>
      </div>

      <CharactersGrid characters={characters} isLoading={isLoading} error={!!error} />
    </div>
  );
}
