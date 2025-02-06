import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { Home } from '@/pages/home';
import { Error } from '@/pages/error';
import { Base } from './pages/base';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Base />} errorElement={<Error />}>
      <Route errorElement={<Error />}>
        <Route index element={<Home />} />
      </Route>
    </Route>,
  ),
);
