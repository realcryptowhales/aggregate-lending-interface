import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import useSWR from 'swr';
import { fetcher } from '@api/index';
import { useStore } from '@/stores';
function Layout() {
  const {
    commonStore: { setTokenMap }
  } = useStore();
  const { data, isLoading } = useSWR(
    {
      url: 'http://35.220.222.252/aggregate-lending/config/list'
    },
    fetcher,
    {
      refreshInterval: 0
    }
    // {
    // refreshInterval: 3000
    // }
  );
  !isLoading && setTokenMap(data);
  console.log(data, 'restRes');
  return (
    <div className="w-full">
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
