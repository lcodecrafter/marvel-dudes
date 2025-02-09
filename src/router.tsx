import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { CharactersList } from '@/features/characters/pages/CharactersList';
import { Error } from '@/pages/error';
import { Base } from './layouts/Base';
import { Favorites } from './features/characters/pages/Favorites';
import { CharacterDetail } from './features/characters/pages/CharacterDetail';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Base />} errorElement={<Error />}>
      <Route errorElement={<Error />}>
        <Route index element={<CharactersList />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="character/:id" element={<CharacterDetail />} />
      </Route>
    </Route>,
  ),
);
