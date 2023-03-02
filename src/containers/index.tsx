import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';

function Layout() {
  return (
    <div className="w-full">
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
