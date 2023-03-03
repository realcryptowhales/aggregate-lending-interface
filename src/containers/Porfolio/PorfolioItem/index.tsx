import * as React from 'react';
import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Summary from '@components/Summary';
// import Avatar from '@mui/material/Avatar';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import Tooltip from '@mui/material/Tooltip';
import Detail from '@/components/Detail';
import { queryHelperContractAddr, queryHelperABI } from '@constant/index';
import { useContractReads, useAccount } from 'wagmi';
import { rawToThousandNumber, rawToPercent } from '@utils/format';
import useSWR from 'swr';
import { fetcher } from '@api/index';

const queryHelperContract = {
  address: queryHelperContractAddr as `0x${string}`,
  abi: queryHelperABI
};

function PorfolioItem() {
  const [searchParams, setSearchParams] = useSearchParams();
  // get token address
  const tokenAddr = searchParams.get('address')?.toLocaleLowerCase();
  // get token list
  const { data: currencyList } = useSWR(
    {
      url: 'http://35.220.222.252/aggregate-lending/config/list'
    },
    fetcher
  );
  // console.log(currencyList, 'restRes');

  // get token
  const nowToken = useMemo(() => {
    const selectList = currencyList?.filter((currency: any) => {
      return (
        currency.address.toLocaleLowerCase() === tokenAddr?.toLocaleLowerCase()
      );
    });
    if (selectList && Array.isArray(selectList)) {
      return selectList[0];
    }
    return {};
  }, [currencyList, tokenAddr]);
  // set date
  const [todayDate, setTodayDate] = useState<any>(null); //今天的毫秒时间
  const [lastThirtyDate, setLastThirtyDate] = useState<any>(null); //过去30天的毫秒时间
  useEffect(() => {
    setTodayDate(new Date().getTime());
    setLastThirtyDate(new Date(todayDate - 1000 * 60 * 60 * 24 * 30).getTime());
  }, []);

  // get apr
  const { data: aggAPR } = useSWR(
    todayDate && lastThirtyDate
      ? {
          url: 'http://35.220.222.252/aggregate-lending/apr/calc',
          params: {
            configId: 2, // token id
            operateType: 1, // 0:存款 1:取款
            beginTime: lastThirtyDate,
            endTime: todayDate,
            platformType: 0 // 平台类型 0：agg; 1：aave; 2：comp
          }
        }
      : null,
    fetcher
  );
  // console.log(aggAPR, 'aggAPR');

  const { data: aaveAPR } = useSWR(
    todayDate && lastThirtyDate
      ? {
          url: 'http://35.220.222.252/aggregate-lending/apr/calc',
          params: {
            configId: 2, // token id
            operateType: 1, // 0:存款 1:取款
            beginTime: lastThirtyDate,
            endTime: todayDate,
            platformType: 1 // 平台类型 0：agg; 1：aave; 2：comp
          }
        }
      : null,
    fetcher
  );
  // console.log(aaveAPR, 'aaveAPR');

  const { data: compAPR } = useSWR(
    todayDate && lastThirtyDate
      ? {
          url: 'http://35.220.222.252/aggregate-lending/apr/calc',
          params: {
            configId: 2, // token id
            operateType: 1, // 0:存款 1:取款
            beginTime: lastThirtyDate,
            endTime: todayDate,
            platformType: 2 // 平台类型 0：agg; 1：aave; 2：comp
          }
        }
      : null,
    fetcher
  );
  // console.log(compAPR, 'compAPR');

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
    contracts: contractsArgs
    // watch: true
  });
  const [supplyData, borrowData, userData] = data;
  console.log(userData, 'userData');
  const userSummary = useMemo(() => {
    let nowUserData = [];
    if (userData && Array.isArray(userData)) {
      const filterList = userData?.filter((tokenUserData: any) => {
        if (
          tokenUserData.underlying.toLocaleLowerCase() ===
          tokenAddr?.toLocaleLowerCase()
        ) {
          console.log(tokenUserData, 'tokenUserData');
          return tokenUserData;
        }
      });
      nowUserData = filterList[0] || [];
    }
    console.log(nowUserData, 'nowUserData');
    const [
      underlying,
      tokenPrice,
      depositAmount,
      borrowAmount,
      maxLTV,
      liquidationThreshold
    ] = nowUserData;

    return [
      {
        key: 'index1',
        title: '价格',
        text: rawToThousandNumber(tokenPrice?.toString(), 8, 4) || '--'
      },
      {
        key: 'index2',
        title: '价格来源',
        text: '预言机'
        // (
        //   <div className="flex items-center">
        //     <Avatar
        //       sx={{ width: '18px', height: '18px' }}
        //       alt="Remy Sharp"
        //       src="https://static.okx.com/cdn/announce/20220119/1642588815382f0fd4a29-ba95-4ba9-ab33-23c1258ce96a.png"
        //     />
        //     <span className="font-500 text-3.5 leading-4 ml-2">预言机</span>
        //   </div>
        // )
      },
      {
        key: 'index3',
        title: '你的存款数量',
        text:
          rawToThousandNumber(depositAmount?.toString(), nowToken.decimal, 4) ||
          '--'
      },
      {
        key: 'index4',
        title: '你的借款数量',
        text:
          rawToThousandNumber(borrowAmount?.toString(), nowToken.decimal, 4) ||
          '--'
      },
      {
        key: 'index5',
        title: (
          <div className="flex items-center">
            <span className="mr-4">最高抵押率</span>
            <Tooltip title="hover的内容" arrow>
              <ErrorOutlineOutlinedIcon
                sx={{ width: '17px', height: '17px' }}
              />
            </Tooltip>
          </div>
        ),
        text: rawToPercent(maxLTV?.toString(), 6, 4) || '--'
      },
      {
        key: 'index6',
        title: (
          <div className="flex items-center">
            <span className="mr-4">清算阈值</span>
            <Tooltip title="hover的内容" arrow>
              <ErrorOutlineOutlinedIcon
                sx={{ width: '17px', height: '17px' }}
              />
            </Tooltip>
          </div>
        ),
        text: rawToPercent(liquidationThreshold?.toString(), 6, 4) || '--'
      }
    ];
  }, [userData]);
  console.log(userSummary, 'userSummary');
  // supplyData?.forEatch((tokenSupplyData: any) => {
  //   const [
  //     supplyUnderlying,
  //     supplyAmount,
  //     supplyValue,
  //     supplyMatchAmount,
  //     supplies
  //   ] = tokenSupplyData;
  // });

  // borrowData?.forEach((tokenBorrowData: any) => {
  //   const [
  //     borrowUnderlying,
  //     borrowAmount,
  //     borrowValue,
  //     borrowMatchAmount,
  //     borrows
  //   ] = tokenBorrowData;
  // });

  console.log(data, isError, isLoading, 'multicall');

  return (
    <div className="w-full box-border px-27 py-6">
      <Summary
        selectValue={tokenAddr || ''}
        currencyList={currencyList || []}
        dataList={userSummary}
      />
      <Detail />
    </div>
  );
}

export default PorfolioItem;
