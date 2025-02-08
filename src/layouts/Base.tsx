import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export function Base() {
  return (
    <main>
      <Header />
      <div className="p-4 pt-6 md:p-12">
        <Outlet />
      </div>
    </main>
  );
}
