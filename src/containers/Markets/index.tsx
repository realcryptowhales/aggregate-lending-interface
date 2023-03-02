import * as React from 'react';
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
const headCells: HeadCell<any>[] = [
  {
    id: 'underlying',
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
const currencyList = [
  {
    icon: 'https://static.okx.com/cdn/assets/imgs/221/C25FE324914596B9.png',
    symbol: 'BTC'
  },
  {
    icon: 'https://static.okx.com/cdn/assets/imgs/221/5F33E3F751873296.png',
    symbol: 'ETH'
  },
  {
    icon: 'https://static.okx.com/cdn/announce/20220119/1642588815382f0fd4a29-ba95-4ba9-ab33-23c1258ce96a.png',
    symbol: 'OKB'
  },
  {
    icon: 'https://static.okx.com/cdn/assets/imgs/221/8EC634AF717771B6.png',
    symbol: 'LTC'
  },
  {
    icon: 'https://static.okx.com/cdn/assets/imgs/221/5F74EB20302D7761.png',
    symbol: 'USDT'
  }
];
const Markets: React.FC = () => {
  const {
    marketStore: {
      setCurrentSupplyRates,
      setCurrentBorrowRates,
      setMarketsInfo,
      setPlatformInfo,
      marketTableList,
      totalAmount,
      matchTotalAmount,
      totalSupplyAmount,
      totalBorrowAmount
    }
  } = useStore();

  const { data } = useContractReads({
    // watch: true,
    // cacheTime: 4_000,
    onSuccess(data: any[]) {
      console.log('Success', data);
      // computePorfolioData(data);
      setCurrentBorrowRates(data[0]);
      setCurrentSupplyRates(data[1]);
      setMarketsInfo(data[2]);
      setPlatformInfo(data[3]);
    },
    contracts: [
      {
        ...queryHelperContract,
        functionName: 'getCurrentBorrowRates',
        args: [mockUSDTAddr]
      },
      {
        ...queryHelperContract,
        functionName: 'getCurrentSupplyRates',
        args: [mockUSDTAddr]
      },
      {
        ...queryHelperContract,
        functionName: 'getMarketsInfo',
        args: [
          [mockUSDTAddr, mockUSDCAddr, mockWBTCAddr, mockWETHAddr],
          mockUSDTAddr
        ]
      },
      {
        ...queryHelperContract,
        functionName: 'getPlatformInfo'
        // args: [routerAddr, priceOracleAddr]
      },
      { address: routerAddr, abi: routerABI, functionName: 'getUnderlyings' }
    ]
  });
  return (
    <div className={cls(style.container)}>
      <div className={cls(style.header)}>
        <Card title={'平台总数据'}>
          <MoneyDataDisplay
            totalMarket="$ 534,290.4"
            matchTotalAmount="$ 534,290.4"
            totalDepositAmount="$ 534,290.4"
            totalLoanAmount="$ 534,290.4"
          />
        </Card>
        <Card
          title={
            <Title
              title="存款 APR 对比"
              defaultValue="BTC"
              currencyList={currencyList}
            />
          }
          secondTitle="聚合平台所有币种收益率长期保持最高"
        >
          {/* deposit */}
          <AprDataDisplay
            lendingPlatform="APR"
            AggregationPlatform="6%"
            aave="6%"
            compound="6%"
          />
        </Card>
        <Card
          title={
            <Title
              title="借款 APR 对比"
              defaultValue="ETH"
              currencyList={currencyList}
            />
          }
          secondTitle="聚合平台所有币种利息长期保持最低"
        >
          {/* borrow */}
          <AprDataDisplay
            lendingPlatform="APY"
            AggregationPlatform="76%"
            aave="6%"
            compound="6%"
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
