import { Link } from 'react-router-dom';
import { MarvelLogo } from '@/assets/MarvelLogo';
import { HeartIcon } from '@/components/ui/icons';
import { useFavoritesStore } from '@/store/favorites';
import { useLoadingStore } from '@/store/loading';
import styles from './header.module.css';

export const Header = () => {
  const favoritesCount = useFavoritesStore((state) => Object.values(state.favorites).length);
  const { isLoading } = useLoadingStore();

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-12 py-4 bg-black text-white shadow-md">
      <Link to="/">
        <MarvelLogo />
      </Link>

      <Link to="/favorites" className="flex items-center" aria-label="Favorites">
        <HeartIcon className="h-5 w-6" />
        <span className=" text-white mx-2">{favoritesCount}</span>
      </Link>
      {isLoading && (
        <div role="progressbar" aria-valuetext="Loading..." className={styles.loadingBar}></div>
      )}
    </header>
  );
};
