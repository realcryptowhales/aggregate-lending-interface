import * as React from 'react';
import useSWR from 'swr';
import { fetcher } from '@api/index';
import style from './index.module.less';
import cls from 'classnames';
import Card from './Card';
import Title from './Card/Title';
import AprDataDisplay from './Card/AprDataDisplay';
import MoneyDataDisplay from './Card/MoneyDataDisplay';
import EnhancedTable, { HeadCell, rows } from '@/components/Table';
import { MarketTableRows } from '@/components/Table/MarketTableRows';

const headCells: HeadCell[] = [
  {
    id: 'asset',
    numeric: false,
    disablePadding: true,
    label: '资产',
    needSort: false
  },
  {
    id: 'totalDeposit',
    numeric: true,
    disablePadding: false,
    label: '存款总额',
    needSort: true
  },
  {
    id: 'depositApr',
    numeric: true,
    disablePadding: false,
    label: '存款 APR',
    needSort: true
  },
  {
    id: 'totalLoan',
    numeric: true,
    disablePadding: false,
    label: '借款总额',
    needSort: true
  },
  {
    id: 'loanApr',
    numeric: true,
    disablePadding: false,
    label: '借款 APR',
    needSort: true
  },
  {
    id: 'matchAmount',
    numeric: true,
    disablePadding: false,
    label: '撮合金额',
    needSort: true
  },
  {
    id: 'option',
    numeric: true,
    disablePadding: false,
    label: '操作',
    needSort: false
  }
];
const Home: React.FC = () => {
  return (
    <div className={cls(style.container)}>
      <head className={cls(style.header)}>
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
              selectLabel="Token"
              selectOption={['usdt', 'okt', 'eth']}
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
              selectLabel="Token"
              selectOption={['usdt', 'okt', 'eth']}
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
      </head>
      <main className={cls(style.main)}>
        <div className={cls(style.market)}>市场</div>
        <EnhancedTable
          headCells={headCells}
          rows={rows}
          TableRows={MarketTableRows}
        />
      </main>
    </div>
  );
};

export default Home;
