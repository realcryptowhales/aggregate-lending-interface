import * as React from 'react';
import { useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import Summary from '@components/Summary';
import Avatar from '@mui/material/Avatar';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import Tooltip from '@mui/material/Tooltip';
import Detail from '@/components/Detail';
import {
  queryHelperContractAddr,
  queryHelperABI,
  mockUSDTAddr
} from '@constant/index';
import { useContractRead, useContractReads, useAccount } from 'wagmi';
import { BigNumber as BN } from 'ethers';
import useSWR from 'swr';
import { fetcher } from '@api/index';

const queryHelperContract = {
  address: queryHelperContractAddr as `0x${string}`,
  abi: queryHelperABI
};

function PorfolioItem() {
  const [searchParams, setSearchParams] = useSearchParams();
  let tokenAddr = searchParams.get('address');
  // TODO: remove test
  tokenAddr = mockUSDTAddr;

  const dataList = [
    {
      key: 'index1',
      title: '价格',
      text: '$ 18,000.49'
    },
    {
      key: 'index2',
      title: '价格来源',
      text: (
        <div className="flex items-center">
          <Avatar
            sx={{ width: '18px', height: '18px' }}
            alt="Remy Sharp"
            src="https://static.okx.com/cdn/announce/20220119/1642588815382f0fd4a29-ba95-4ba9-ab33-23c1258ce96a.png"
          />
          <span className="font-500 text-3.5 leading-4 ml-2">OKC</span>
        </div>
      )
    },
    {
      key: 'index3',
      title: '你的存款数量',
      text: '90.49349018'
    },
    {
      key: 'index4',
      title: '你的借款数量',
      text: '50.49349018'
    },
    {
      key: 'index5',
      title: (
        <div className="flex items-center">
          <span className="mr-4">最高抵押率</span>
          <Tooltip title="hover的内容" arrow>
            <ErrorOutlineOutlinedIcon sx={{ width: '17px', height: '17px' }} />
          </Tooltip>
        </div>
      ),
      text: '84.37%'
    },
    {
      key: 'index6',
      title: (
        <div className="flex items-center">
          <span className="mr-4">清算阈值</span>
          <Tooltip title="hover的内容" arrow>
            <ErrorOutlineOutlinedIcon sx={{ width: '17px', height: '17px' }} />
          </Tooltip>
        </div>
      ),
      text: '89.37%'
    }
  ];

  const tokenList = useSWR(
    {
      url: 'http://35.220.222.252/aggregate-lending/config/list'
    },
    fetcher
  );
  const currencyList = useMemo(() => {
    if (!tokenList.data) return [];
    return tokenList.data;
  }, [tokenList.data]);
  console.log(currencyList, 'restRes');

  const thirdRes = useSWR(
    {
      url: 'http://35.220.222.252/aggregate-lending/apr/calc',
      params: {
        configId: 2, // token id
        operateType: 1, // 0:存款 1:取款
        beginTime: 1667275932000,
        endTime: 1677575532000,
        platformType: 0 //平台类型
      }
    },
    fetcher,
    {
      refreshInterval: 0
    }
  );
  console.log(thirdRes, 'thirdRes');

  // const { data, isError, isLoading } = useContractRead({
  //   ...queryHelperContract,
  //   functionName: 'getMarketInfo',
  //   args: [mockUSDTAddr],
  //   watch: true
  // });
  // console.log(data, 'data');
  const { address } = useAccount();
  const contractsArgs = useMemo(() => {
    const options: any = [
      {
        ...queryHelperContract,
        functionName: 'getSupplyMarkets'
      },
      {
        ...queryHelperContract,
        functionName: 'getBorrowMarkets'
      }
    ];
    if (address) {
      options.push({
        ...queryHelperContract,
        functionName: 'getTokenInfoWithUser',
        args: [address]
      });
    }
    return options;
  }, [address]);

  const { data, isError, isLoading } = useContractReads({
    contracts: contractsArgs,
    watch: true
  });
  console.log(data, isError, isLoading, 'multicall');

  return (
    <div className="w-full box-border px-27 py-6">
      <Summary
        selectValue={tokenAddr}
        currencyList={currencyList || []}
        dataList={dataList}
      />
      <Detail />
    </div>
  );
}

export default PorfolioItem;
