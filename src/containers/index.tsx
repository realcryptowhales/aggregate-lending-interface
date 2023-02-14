import * as React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';
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
