import useSWRImmutable from 'swr/immutable'; // use cache for swr
import { useState, useMemo } from 'react';
import { fetcher } from '@api/index';
import { useContractReads } from 'wagmi';
import { routerAddr } from '@/constant/contract';
import {
  ContractsArgsProps,
  CurrencyBaseInfoProps,
  AssetProps
} from '@/constant/type';
import { routerABI } from '@/constant/abi';

export default function useCurrencyList() {
  const [list, setList] = useState<CurrencyBaseInfoProps[]>();

  const { data } = useSWRImmutable(
    {
      url: '/aggregate-lending/config/list'
    },
    fetcher
  );

  const getList = (addressList: any[], assets: AssetProps[]) => {
    if (data && data.length) {
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
          ...obj[address!]
        };
      });
      setList(currencies);
    }
  };

  const contractsArgs = useMemo(() => {
    let res: ContractsArgsProps[] = [];
    if (data && data.length) {
      res = [
        {
          address: routerAddr,
          abi: routerABI,
          functionName: 'getUnderlyings'
        },
        {
          address: routerAddr,
          abi: routerABI,
          functionName: 'getAssets'
        }
      ];
    }
    return res;
  }, [data]);

  useContractReads({
    contracts: contractsArgs,
    onSuccess(data: any[]) {
      if (data && data.length === 2) {
        getList(data[0], data[1]);
      }
    }
  });

  return list;
}
