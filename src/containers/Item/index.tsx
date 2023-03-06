import * as React from 'react';
import { useMemo, useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Summary from '@components/Summary';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import Tooltip from '@mui/material/Tooltip';
import Detail from '@/components/Detail';
import { queryHelperContractAddr, queryHelperABI } from '@constant/index';
import { useContractReads, useAccount, useContractRead } from 'wagmi';
import {
  rawToThousandNumber,
  rawToPercent,
  formatDate,
  formatPercent
} from '@utils/format';
// import useSWR from 'swr'; // set dedupingInterval to close cache
import useSWRImmutable from 'swr/immutable'; // use cache for swr

import { fetcher } from '@api/index';
import BigNumber from 'bignumber.js';

const queryHelperContract = {
  address: queryHelperContractAddr as `0x${string}`,
  abi: queryHelperABI
};

function PorfolioItem() {
  const [isSupply, setIsSupply] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  // get token address
  const [tokenAddr, setTokenAddr] = useState(
    searchParams.get('address')?.toLocaleLowerCase()
  );
  // get token list
  const { data: currencyList } = useSWRImmutable(
    {
      url: '/config/list'
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

  const onTokenChange = (address: string) => {
    setSearchParams({ address });
    setTokenAddr(address);
  };

  // set date
  const todayDate = useRef<any>(null);
  const lastThirtyDate = useRef<any>(null);
  const showingDate = useRef<any>(null);
  useEffect(() => {
    todayDate.current = new Date().getTime();
    showingDate.current = new Date().getTime();
    lastThirtyDate.current = new Date(
      todayDate.current - 1000 * 60 * 60 * 24 * 30
    ).getTime();
    return () => {
      todayDate.current = null;
      lastThirtyDate.current = null;
      showingDate.current = null;
    };
  }, []);

  // get current APR
  const { data: currentAPRList } = useContractRead({
    ...queryHelperContract,
    functionName: isSupply ? 'getCurrentSupplyRates' : 'getCurrentBorrowRates',
    args: [tokenAddr],
    enabled: Boolean(tokenAddr),
    watch: true,
    onSuccess(data) {
      // console.log(data, 'success');
      // update showing date;
      showingDate.current = new Date().getTime();
    }
  });
  const { currentMatchAPR, currentAaveAPR, currentCompoundAPR } =
    useMemo(() => {
      if (!currentAPRList)
        return {
          currentMatchAPR: '--',
          currentAaveAPR: '--',
          currentCompoundAPR: '--'
        };
      const [currentMatchAPR, currentAaveAPR, currentCompoundAPR] =
        currentAPRList;
      return {
        currentMatchAPR: rawToPercent(currentMatchAPR, 6, 4),
        currentAaveAPR: rawToPercent(currentAaveAPR, 6, 4),
        currentCompoundAPR: rawToPercent(currentCompoundAPR, 6, 4)
      };
    }, [currentAPRList]);
  // , isSupply, tokenAddr

  // get apr
  const { data: aggAPR } = useSWRImmutable(
    todayDate.current && lastThirtyDate.current && nowToken.configId
      ? {
          url: '/apr/calc',
          params: {
            configId: nowToken.configId, // token id
            operateType: isSupply ? 0 : 1, // 0:存款 1:借款
            beginTime: lastThirtyDate.current,
            endTime: todayDate.current,
            platformType: 0 // 平台类型 0：agg; 1：aave; 2：comp
          }
        }
      : null,
    fetcher
  );
  const aggAPRFormat = useMemo(() => {
    if (!aggAPR) return [];
    return aggAPR.map((item: any) => {
      return [item.calcTime, Number(item.apr).toFixed(4)];
    });
  }, [aggAPR]);
  // console.log(aggAPR, 'aggAPR');

  const { data: aaveAPR } = useSWRImmutable(
    todayDate.current && lastThirtyDate.current && nowToken.configId
      ? {
          url: '/apr/calc',
          params: {
            configId: nowToken.configId, // token id
            operateType: isSupply ? 0 : 1, // 0:存款 1:借款
            beginTime: lastThirtyDate.current,
            endTime: todayDate.current,
            platformType: 1 // 平台类型 0：agg; 1：aave; 2：comp
          }
        }
      : null,
    fetcher
  );
  const aaveAPRFormat = useMemo(() => {
    if (!aaveAPR) return [];
    return aaveAPR.map((item: any) => {
      return [item.calcTime, Number(item.apr).toFixed(4)];
    });
  }, [aaveAPR]);
  // console.log(aaveAPR, 'aaveAPR');

  const { data: compAPR } = useSWRImmutable(
    todayDate.current && lastThirtyDate.current && nowToken.configId
      ? {
          url: '/apr/calc',
          params: {
            configId: nowToken.configId, // token id
            operateType: isSupply ? 0 : 1, // 0:存款 1:借款
            beginTime: lastThirtyDate.current,
            endTime: todayDate.current,
            platformType: 2 // 平台类型 0：agg; 1：aave; 2：comp
          }
        }
      : null,
    fetcher
  );
  const compAPRFormat = useMemo(() => {
    if (!compAPR) return [];
    return compAPR.map((item: any) => {
      return [item.calcTime, Number(item.apr).toFixed(4)];
    });
  }, [compAPR]);
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
  }, [address, tokenAddr]);

  const { data, isError, isLoading } = useContractReads({
    contracts: contractsArgs,
    watch: true
  });
  // console.log(data, isError, isLoading, 'multicall');

  const [supplyData, borrowData, userData] = data || [];
  const userSummary = useMemo(() => {
    let nowUserData = [];
    if (userData && Array.isArray(userData)) {
      const filterList = userData?.filter((tokenUserData: any) => {
        if (
          tokenUserData.underlying.toLocaleLowerCase() ===
          tokenAddr?.toLocaleLowerCase()
        ) {
          // console.log(tokenUserData, 'tokenUserData');
          return tokenUserData;
        }
      });
      nowUserData = filterList[0] || [];
    }
    // console.log(nowUserData, 'nowUserData');
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
        text: `$ ${rawToThousandNumber(tokenPrice, 8, 4)}` || '--'
      },
      {
        key: 'index2',
        title: '价格来源',
        text: '预言机'
      },
      {
        key: 'index3',
        title: '你的存款数量',
        text: rawToThousandNumber(depositAmount, nowToken.decimal, 4) || '--'
      },
      {
        key: 'index4',
        title: '你的借款数量',
        text: rawToThousandNumber(borrowAmount, nowToken.decimal, 4) || '--'
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
        text: rawToPercent(maxLTV, 6, 4) || '--'
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
        text: rawToPercent(liquidationThreshold, 6, 4) || '--'
      }
    ];
  }, [userData, tokenAddr]);

  const [
    supplyAmount,
    supplyValue,
    supplyMatchAmount,
    supplyAaveAmount,
    supplyCompoundAmount,
    supplyMatchPercent,
    supplyAavePercent,
    supplyCompoundPercent
  ] = useMemo(() => {
    let nowSupplyData = [];
    if (supplyData && Array.isArray(supplyData)) {
      const filterList = supplyData?.filter((tokenSupplyData: any) => {
        if (
          tokenSupplyData.underlying.toLocaleLowerCase() ===
          tokenAddr?.toLocaleLowerCase()
        ) {
          // console.log(tokenUserData, 'tokenUserData');
          return tokenSupplyData;
        }
      });
      nowSupplyData = filterList[0] || [];
    }
    if (nowSupplyData.length === 0) {
      return [];
    }
    const [underlying, supplyAmount, supplyValue, supplyMatchAmount, supplies] =
      nowSupplyData;
    const [supplyAaveAmount, supplyCompoundAmount] = supplies;

    const totalSupplyAmount = supplyMatchAmount
      .add(supplyAaveAmount)
      .add(supplyCompoundAmount);

    const supplyMatchBignumber = new BigNumber(
      supplyMatchAmount.toString()
    ).div(new BigNumber(totalSupplyAmount.toString()));
    const supplyMatchPercent = formatPercent(
      supplyMatchBignumber.isNaN() ? '0' : supplyMatchBignumber.toString(),
      0
    );

    const supplyAaveBignumber = new BigNumber(supplyAaveAmount.toString()).div(
      new BigNumber(totalSupplyAmount.toString())
    );
    const supplyAavePercent = formatPercent(
      supplyAaveBignumber.isNaN() ? '0' : supplyAaveBignumber.toString(),
      0
    );

    const supplyCompoundBignumber = new BigNumber(
      supplyCompoundAmount.toString()
    ).div(new BigNumber(totalSupplyAmount.toString()));
    const supplyCompoundPercent = formatPercent(
      supplyCompoundBignumber.isNaN()
        ? '0'
        : supplyCompoundBignumber.toString(),
      0
    );

    return [
      rawToThousandNumber(supplyAmount, nowToken.decimal, 4),
      rawToThousandNumber(supplyValue, nowToken.decimal, 4),
      rawToThousandNumber(supplyMatchAmount, nowToken.decimal, 4),
      rawToThousandNumber(supplyAaveAmount, nowToken.decimal, 4),
      rawToThousandNumber(supplyCompoundAmount, nowToken.decimal, 4),
      supplyMatchPercent,
      supplyAavePercent,
      supplyCompoundPercent
    ];
  }, [supplyData, tokenAddr]);

  const [
    borrowAmount,
    borrowValue,
    borrowMatchAmount,
    borrowAaveAmount,
    borrowCompoundAmount,
    borrowMatchPercent,
    borrowAavePercent,
    borrowCompoundPercent
  ] = useMemo(() => {
    let nowBorrowData = [];
    if (borrowData && Array.isArray(borrowData)) {
      const filterList = borrowData?.filter((tokenBorrowData: any) => {
        if (
          tokenBorrowData.underlying.toLocaleLowerCase() ===
          tokenAddr?.toLocaleLowerCase()
        ) {
          // console.log(tokenUserData, 'tokenUserData');
          return tokenBorrowData;
        }
      });
      nowBorrowData = filterList[0] || [];
    }
    if (nowBorrowData.length === 0) {
      return [];
    }
    const [underlying, borrowAmount, borrowValue, borrowMatchAmount, borrows] =
      nowBorrowData;
    const [borrowAaveAmount, borrowCompoundAmount] = borrows;

    const totalBorrowAmount = borrowMatchAmount
      .add(borrowAaveAmount)
      .add(borrowCompoundAmount);

    const borrowMatchBignumber = new BigNumber(
      borrowMatchAmount.toString()
    ).div(new BigNumber(totalBorrowAmount.toString()));
    const borrowMatchPercent = formatPercent(
      borrowMatchBignumber.isNaN() ? '0' : borrowMatchBignumber.toString(),
      0
    );

    const borrowAaveBignumber = new BigNumber(borrowAaveAmount.toString()).div(
      new BigNumber(totalBorrowAmount.toString())
    );
    const borrowAavePercent = formatPercent(
      borrowAaveBignumber.isNaN() ? '0' : borrowAaveBignumber.toString(),
      0
    );

    const borrowCompoundBignumber = new BigNumber(
      borrowCompoundAmount.toString()
    ).div(new BigNumber(totalBorrowAmount.toString()));
    const borrowCompoundPercent = formatPercent(
      borrowCompoundBignumber.isNaN()
        ? '0'
        : borrowCompoundBignumber.toString(),
      0
    );

    return [
      rawToThousandNumber(borrowAmount, nowToken.decimal, 4),
      rawToThousandNumber(borrowValue, nowToken.decimal, 4),
      rawToThousandNumber(borrowMatchAmount, nowToken.decimal, 4),
      rawToThousandNumber(borrowAaveAmount, nowToken.decimal, 4),
      rawToThousandNumber(borrowCompoundAmount, nowToken.decimal, 4),
      borrowMatchPercent,
      borrowAavePercent,
      borrowCompoundPercent
    ];
  }, [borrowData, tokenAddr]);

  const props = {
    isSupply,
    setIsSupply,
    detailAmount: isSupply ? supplyAmount : borrowAmount,
    detailValue: isSupply ? supplyValue : borrowValue,
    todayDate: formatDate(showingDate.current),
    matchAmount: isSupply ? supplyMatchAmount : borrowMatchAmount,
    aaveAmount: isSupply ? supplyAaveAmount : borrowAaveAmount,
    compoundAmount: isSupply ? supplyCompoundAmount : borrowCompoundAmount,
    matchPercent: isSupply ? supplyMatchPercent : borrowMatchPercent,
    aavePercent: isSupply ? supplyAavePercent : borrowAavePercent,
    compoundPercent: isSupply ? supplyCompoundPercent : borrowCompoundPercent,
    matchAPR: aggAPRFormat,
    aaveAPR: aaveAPRFormat,
    compoundAPR: compAPRFormat,
    currentMatchAPR,
    currentAaveAPR,
    currentCompoundAPR
  };

  return (
    <div className="w-full box-border px-27 py-6">
      <Summary
        onChange={onTokenChange}
        selectValue={tokenAddr || ''}
        currencyList={currencyList || []}
        dataList={userSummary}
      />
      <Detail {...props} />
    </div>
  );
}

export default PorfolioItem;
