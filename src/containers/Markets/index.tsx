import * as React from 'react';
import useSWR from 'swr';
import { fetcher } from '@api/index';
import style from './index.module.less';
import cls from 'classnames';
import Card from './Card';
import Title from './Card/Title';
import AprDataDisplay from './Card/AprDataDisplay';
import MoneyDataDisplay from './Card/MoneyDataDisplay';
import EnhancedTable, { Data, HeadCell, rows } from '@/components/Table';
import { MarketTableRows } from '@/components/Table/MarketTableRows';

const headCells: HeadCell<Data>[] = [
  {
    id: 'asset',
    label: '资产',
    needSort: false
  },
  {
    id: 'totalDeposit',

    label: '存款总额',
    needSort: true
  },
  {
    id: 'depositApr',

    label: '存款 APR',
    needSort: true
  },
  {
    id: 'totalLoan',

    label: '借款总额',
    needSort: true
  },
  {
    id: 'loanApr',

    label: '借款 APR',
    needSort: true
  },
  {
    id: 'matchAmount',

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
        <EnhancedTable<Data>
          headCells={headCells}
          rows={rows}
          TableRows={MarketTableRows}
          defaultOrderBy="totalDeposit"
        />
      </main>
    </div>
  );
};

export default Markets;
