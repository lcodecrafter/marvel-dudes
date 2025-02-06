import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

export function Error() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? error.statusText || error.data
    : 'An unexpected error has occurred.';

  return (
    <div className="flex flex-col items-center justify-center min-h-fit w-full h-full">
      <h1 className="text-4xl font-bold mb-4">Oops :(</h1>
      <p className="text-lg">{message}</p>
    </div>
  );
}
