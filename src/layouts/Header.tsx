import { Link } from 'react-router-dom';
import { MarvelLogo } from '@/assets/MarvelLogo';
import { HeartIcon } from '@/components/ui/icons';
//TODO: Use favoutites context to show the number of favourites
export const Header = () => {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-12 py-4 bg-black text-white shadow-md">
      <Link to="/">
        <MarvelLogo />
      </Link>

      <Link to="/favorites" className="flex items-center">
        <HeartIcon className="h-5 w-6" />
        <span className=" text-white mx-2">0</span>
      </Link>
    </header>
  );
};
