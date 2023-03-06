import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@api/index';
import { useStore } from '@/stores';
import Test from './Test';
function Layout() {
  const {
    commonStore: { setTokenMap }
  } = useStore();
  const { data, isLoading } = useSWRImmutable(
    {
      url: '/config/list'
    },
    fetcher
  );
  useEffect(() => {
    !isLoading && setTokenMap(data);
  }, [isLoading, data]);
  return (
    <div className="w-full">
      <Header />
      {/* <Test /> */}
      <Outlet />
    </div>
  );
}

export default Layout;
