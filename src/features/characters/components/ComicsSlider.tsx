import { Comic } from '../types';

interface ComicsSliderProps {
  comics: Comic[];
}

export function ComicsSlider({ comics }: ComicsSliderProps) {
  if (comics.length === 0)
    return <div className="text-center text-gray-500">There is no comics</div>;

  return (
    <div className="flex overflow-x-auto gap-4 scroll-smooth snap-x snap-mandatory touch-pan-x scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-100">
      {comics.map((comic) => {
        const releaseDate = new Date(comic.onsaleDate);
        const releaseYear = isNaN(releaseDate.getTime()) ? 'Unknown' : releaseDate.getFullYear();

        return (
          <div
            aria-label={`Comic: ${comic.title}`}
            key={comic.id}
            className="w-40 bg-white flex-none snap-center"
          >
            <img
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
              className="w-full h-[268px] object-cover"
            />
            <div className="flex flex-col justify-between pt-2 pb-6">
              <div role="heading" className="line-clamp-2 text-xs font-medium">
                {comic.title}
              </div>
              <div className="mt-2 text-xs text-gray-500">{releaseYear}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
