import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { fetcher } from '@api/index';
import { readContract } from '@wagmi/core';
import { routerAddr } from '@/constant/contract';
import { routerABI } from '@/constant/abi';

export interface CurrencyBaseInfoProps {
  address: string;
  configId: number;
  decimal: number;
  gmtCreate: string;
  gmtModified: string;
  icon: string;
  name: string;
  symbol: string;
  index: number;
  collateralable: boolean;
  paused: boolean;
  sToken: string;
  dToken: string;
}

export interface AssetProps {
  index: number;
  collateralable: boolean;
  paused: boolean;
  sToken: string;
  dToken: string;
  address: string;
}

export type str = string;

export default function useCurrencyList() {
  const [list, setList] = useState<CurrencyBaseInfoProps[]>();

  const { data, error, isLoading } = useSWR(
    {
      url: '/config/list'
    },
    fetcher
  );

  const getUnderlyings = async () => {
    return await readContract({
      address: routerAddr,
      abi: routerABI,
      functionName: 'getUnderlyings'
    });
  };
  const getAssets = async () => {
    return await readContract({
      address: routerAddr,
      abi: routerABI,
      functionName: 'getAssets'
    });
  };

  if (error) {
    return {
      data: null,
      error,
      isLoading
    };
  }

  const getList = async () => {
    if (data && data.length) {
      const addressList = await getUnderlyings();
      const assets = await getAssets();
      const assetsList = assets.map((address: AssetProps, num: number) => {
        const { index, paused, collateralable, sToken, dToken } = address;
        return {
          index,
          paused,
          collateralable,
          sToken,
          dToken,
          address: addressList[num].toLowerCase()
        };
      });
      const obj: { [key: string]: AssetProps } = {};
      assetsList.map((item: AssetProps) => {
        const { address } = item;
        obj[address] = item;
      });
      const currencies = data.map((item: CurrencyBaseInfoProps) => {
        const { address } = item;
        return {
          ...item,
          ...obj[address]
        };
      });
      setList(currencies);
    }
  };

  useEffect(() => {
    getList();
  }, [data]);

  return {
    data: list,
    error,
    isLoading
  };
}
