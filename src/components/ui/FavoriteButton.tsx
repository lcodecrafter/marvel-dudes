import { HeartIcon } from '@/components/ui/icons/HeartIcon';

import { ButtonHTMLAttributes } from 'react';

interface FavoriteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isFavorite: boolean;
  onAdd: () => void;
  onRemove: () => void;
  ariaLabelAdd?: string;
  ariaLabelRemove?: string;
  iconClassName?: string;
}

export function FavoriteButton({
  isFavorite,
  onAdd,
  onRemove,
  ariaLabelAdd = 'Add favorite',
  ariaLabelRemove = 'Remove favorite',
  iconClassName = 'w-3 h-2.5',
  ...rest
}: FavoriteButtonProps) {
  const handleClick = () => {
    if (isFavorite) {
      onRemove();
    } else {
      onAdd();
    }
  };

  return (
    <button
      {...rest}
      onClick={handleClick}
      aria-label={isFavorite ? ariaLabelRemove : ariaLabelAdd}
      className={`flex items-center justify-center h-6 w-6 cursor-pointer hover:scale-125 ${rest?.className}`}
    >
      <HeartIcon className={iconClassName} variant={isFavorite ? 'filled' : 'outlined'} />
    </button>
  );
}
