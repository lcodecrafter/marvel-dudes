import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { CharactersList } from '@/features/characters/pages/CharactersList';
import { Error } from '@/pages/error';
import { Base } from './layouts/Base';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Base />} errorElement={<Error />}>
      <Route errorElement={<Error />}>
        <Route index element={<CharactersList />} />
      </Route>
    </Route>,
  ),
);
