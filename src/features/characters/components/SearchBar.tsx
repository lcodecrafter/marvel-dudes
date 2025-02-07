import { SearchIcon } from '@/components/ui/icons';
import { useDebounceCallback } from 'usehooks-ts';
//TODO: Move useDebounceCallback to barrel file on utils folder

interface SearchBarProps {
  onSearch: (value: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const debounceSearch = useDebounceCallback((value: string) => {
    onSearch(value);
  }, 300);

  return (
    <div className="w-full flex items-center border-b border-black">
      <SearchIcon className="w-3 h-3 text-black" />

      <input
        type="search"
        placeholder="SEARCH A CHARACTER..."
        className="w-full pl-4 py-2 text-gray-700 focus:outline-none"
        onChange={(e) => debounceSearch(e.target.value)}
      />
    </div>
  );
}
