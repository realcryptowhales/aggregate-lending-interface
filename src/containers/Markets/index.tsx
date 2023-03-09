import React, { useState } from 'react';
import style from './index.module.less';
import cls from 'classnames';
import Card from './Card';
import Title from './Card/Title';
import AprDataDisplay from './Card/AprDataDisplay';
import MoneyDataDisplay from './Card/MoneyDataDisplay';
import EnhancedTable, { HeadCell } from '@/components/Table';
import { Data, MarketTableRows } from '@/components/Table/MarketTableRows';
import { useStore } from '@/stores';
import {
  mockUSDCAddr,
  mockUSDTAddr,
  mockWBTCAddr,
  mockWETHAddr,
  routerAddr
} from '@/constant/contract';
import { queryHelperContract } from '@/stores/marketStore';
import { PorfolioData } from '@/stores/porfolioStore';
import { useContractReads } from 'wagmi';
import { observer } from 'mobx-react-lite';
import { routerABI } from '@/constant';
import { BigNumber, ethers } from 'ethers';
const headCells: HeadCell<any>[] = [
  {
    id: 'symbol',
    label: '资产',
    needSort: true
  },
  {
    id: 'totalSupplied',

    label: '存款总额',
    needSort: true
  },
  {
    id: 'supplyRate',

    label: '存款 APR',
    needSort: true
  },
  {
    id: 'totalBorrowed',

    label: '借款总额',
    needSort: true
  },
  {
    id: 'borrowRate',

    label: '借款 APR',
    needSort: true
  },
  {
    id: 'totalMatched',

    label: '撮合金额',
    needSort: true
  },
  {
    id: 'option',

    label: '操作',
    needSort: false
  }
];

const Markets: React.FC = () => {
  const {
    marketStore: {
      setCurrentSupplyRates,
      setCurrentBorrowRates,
      setMarketsInfo,
      // setPlatformInfo,
      marketTableList,
      totalValue,
      matchTotalValue,
      totalSupplyValue,
      totalBorrowValue,
      supplyAaveApr,
      supplyCompoundApr,
      supplyAggregationPlatformApr,
      borrowAaveApr,
      borrowCompoundApr,
      borrowAggregationPlatformApr,
      bestSupApr,
      bestBroApr
    },
    commonStore: { tokenList }
  } = useStore();
  console.log('supplyAggregationPlatformApr', supplyAggregationPlatformApr);
  const [selectedSupToken, setSelectedSupToken] = useState(mockUSDTAddr);
  const [selectedBorToken, setSelectedBorToken] = useState(mockUSDTAddr);

  const { data } = useContractReads({
    // watch: true,
    // cacheTime: 4_000,
    onSuccess(data: any[]) {
      console.log('marketContractdata', data);
      // computePorfolioData(data);
      setCurrentBorrowRates(data[0]);
      setCurrentSupplyRates(data[1]);
      setMarketsInfo(data[2] || []);
      // setPlatformInfo(data[3]);
    },
    contracts: [
      {
        ...queryHelperContract,
        functionName: 'getCurrentBorrowRates',
        args: [selectedBorToken]
      },
      {
        ...queryHelperContract,
        functionName: 'getCurrentSupplyRates',
        args: [selectedSupToken]
      },
      {
        ...queryHelperContract,
        functionName: 'getMarketsInfo',
        args: [
          [mockUSDTAddr, mockUSDCAddr, mockWBTCAddr, mockWETHAddr],
          mockUSDTAddr
        ]
      }
      // {
      //   ...queryHelperContract,
      //   functionName: 'getPlatformInfo'
      //   // args: [routerAddr, priceOracleAddr]
      // },
    ]
  });

  return (
    <div className={cls(style.container)}>
      <div className={cls(style.header)}>
        <Card title={'平台总数据'}>
          <MoneyDataDisplay
            totalMarket={totalValue}
            matchTotalValue={matchTotalValue}
            totalDepositValue={totalSupplyValue}
            totalLoanValue={totalBorrowValue}
          />
        </Card>
        <Card
          title={
            <Title
              title="存款 APR 对比"
              defaultValue="USDT"
              currencyList={tokenList}
              onChange={setSelectedSupToken}
            />
          }
          secondTitle="聚合平台所有币种收益率长期保持最高"
        >
          {/* deposit */}
          <AprDataDisplay
            lendingPlatform="APR"
            AggregationPlatform={supplyAggregationPlatformApr}
            aave={supplyAaveApr}
            compound={supplyCompoundApr}
            bestApr={bestSupApr}
          />
        </Card>
        <Card
          title={
            <Title
              title="借款 APR 对比"
              defaultValue="USDT"
              currencyList={tokenList}
              onChange={setSelectedBorToken}
            />
          }
          secondTitle="聚合平台所有币种利息长期保持最低"
        >
          {/* borrow */}
          <AprDataDisplay
            lendingPlatform="APR"
            AggregationPlatform={borrowAggregationPlatformApr}
            aave={borrowAaveApr}
            compound={borrowCompoundApr}
            bestApr={bestBroApr}
          />
        </Card>
      </div>
      <main className={cls(style.main)}>
        <div className={cls(style.market)}>市场</div>
        <EnhancedTable<any>
          headCells={headCells}
          rows={marketTableList}
          TableRows={MarketTableRows}
          defaultOrderBy="totalSupplied"
        />
      </main>
    </div>
  );
};

export default observer(Markets);
