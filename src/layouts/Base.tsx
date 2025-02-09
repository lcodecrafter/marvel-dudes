import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export function Base() {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
}
