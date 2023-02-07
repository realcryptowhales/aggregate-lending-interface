import useSWR from 'swr';
import { fetcher } from '@api/index';
import style from './index.module.less';
import cls from 'classnames';
import AssetInfo from './AssetInfo';
import EnhancedTable, { Asset, HeadCell, rows } from '@/components/Table';
import { DepositTableRows } from './DepositTableRows';
import { Tooltip } from '@mui/material';
import Tab, { Tabs } from './Tab';
import { useMemo, useState } from 'react';
import { BorrowTableRows } from './BorrowTableRows';
import { Link } from 'react-router-dom';
export interface DepositData {
  key: string;
  depositToken: Asset;
  depositAmount: number;
  supplyApr: number;
  availableBalance: number;
  dailyEstProfit: number;
  collateral: boolean;
  action: React.ReactNode;
}

const DepositHeadCells: HeadCell<DepositData>[] = [
  {
    id: 'depositToken',
    label: '存款币种',
    needSort: true
  },
  {
    id: 'depositAmount',

    label: '存款头寸',
    needSort: true
  },
  {
    id: 'supplyApr',
    label: '存款 APR',
    needSort: true
  },
  {
    id: 'availableBalance',

    label: '钱包可用余额',
    needSort: true
  },
  {
    id: 'dailyEstProfit',

    label: (
      <div className={cls('flex')}>
        今日预估收益
        <Tooltip style={{ marginLeft: 6 }} title="Add" arrow>
          <i
            className={cls('iconfont icon-exclamation-circle-o cursor-pointer')}
            style={{ color: '#000000', fontSize: 15, marginLeft: 4 }}
          />
        </Tooltip>
      </div>
    ),
    needSort: false
  },
  {
    id: 'collateral',

    label: (
      <div className={cls('flex')}>
        抵押开关
        <Tooltip style={{ marginLeft: 6 }} title="Add" arrow>
          <i
            className={cls('iconfont icon-exclamation-circle-o cursor-pointer')}
            style={{ color: '#000000', fontSize: 15, marginLeft: 4 }}
          />
        </Tooltip>
      </div>
    ),
    needSort: false
  },
  {
    id: 'action',

    label: '操作',
    needSort: false
  }
];
function createDepositData(
  depositToken: Asset,
  depositAmount: number,
  supplyApr: number,
  availableBalance: number,
  dailyEstProfit: number,
  collateral: boolean,
  action?: React.ReactNode
): DepositData {
  return {
    key: depositToken.symbol,
    depositToken,
    depositAmount,
    supplyApr,
    availableBalance,
    dailyEstProfit,
    collateral,
    action
  };
}

const DepositRows = [
  createDepositData(
    {
      logo: 'https://static.okx.com/cdn/assets/imgs/221/C25FE324914596B9.png',
      symbol: 'BTC',
      name: 'btc'
    },
    305,
    3.7,
    67,
    4.3,
    true,
    <div>1231231312313131</div>
  ),
  createDepositData(
    {
      logo: 'https://static.okx.com/cdn/assets/imgs/221/5F33E3F751873296.png',
      symbol: 'ETH',
      name: 'eth'
    },
    452,
    25.0,
    51,
    4.9,
    true,

    <div>123</div>
  ),
  createDepositData(
    {
      logo: 'https://static.okx.com/cdn/assets/imgs/221/5F74EB20302D7761.png',
      symbol: 'USDT',
      name: 'usdt'
    },
    262,
    16.0,
    24,
    6.0,
    true,
    <div>123</div>
  ),
  createDepositData(
    {
      logo: 'https://static.okx.com/cdn/announce/20220119/1642588815382f0fd4a29-ba95-4ba9-ab33-23c1258ce96a.png',
      symbol: 'OKT',
      name: 'okt'
    },
    159,
    6.0,
    24,
    4.0,
    true,

    <div>123</div>
  )
];
export interface BorrowData {
  key: string;
  borrowToken: Asset;
  borrowAmount: number;
  borrowApr: number;
  borrowLimit: number;
  dailyEstInterest: number;
  action: React.ReactNode;
}
const BorrowHeadCells: HeadCell<BorrowData>[] = [
  {
    id: 'borrowToken',
    label: '借款币种',
    needSort: true
  },
  {
    id: 'borrowAmount',

    label: '借款头寸',
    needSort: true
  },
  {
    id: 'borrowApr',
    label: '借款 APR',
    needSort: true
  },
  {
    id: 'borrowLimit',

    label: '可借数量',
    needSort: true
  },
  {
    id: 'dailyEstInterest',

    label: (
      <div className={cls('flex')}>
        今日预估利息
        <Tooltip style={{ marginLeft: 6 }} title="Add" arrow>
          <i
            className={cls('iconfont icon-exclamation-circle-o cursor-pointer')}
            style={{ color: '#000000', fontSize: 15, marginLeft: 4 }}
          />
        </Tooltip>
      </div>
    ),
    needSort: false
  },
  {
    id: 'action',
    label: '操作',
    needSort: false
  }
];
function createBorrowData(
  borrowToken: Asset,
  borrowAmount: number,
  borrowApr: number,
  borrowLimit: number,
  dailyEstInterest: number
): Omit<BorrowData, 'action'> {
  return {
    key: borrowToken.symbol,
    borrowToken,
    borrowAmount,
    borrowApr,
    borrowLimit,
    dailyEstInterest
  };
}
const BorrowRows = [
  createBorrowData(
    {
      logo: 'https://static.okx.com/cdn/assets/imgs/221/C25FE324914596B9.png',
      symbol: 'BTC',
      name: 'btc'
    },
    123,
    2,
    32,
    123
  ),
  createBorrowData(
    {
      logo: 'https://static.okx.com/cdn/assets/imgs/221/5F33E3F751873296.png',
      symbol: 'ETH',
      name: 'eth'
    },
    4522,
    225.0,
    511,
    14.9
  ),
  createBorrowData(
    {
      logo: 'https://static.okx.com/cdn/assets/imgs/221/5F74EB20302D7761.png',
      symbol: 'USDT',
      name: 'usdt'
    },
    2362,
    1612.0,
    1324,
    1236.0
  ),
  createBorrowData(
    {
      logo: 'https://static.okx.com/cdn/announce/20220119/1642588815382f0fd4a29-ba95-4ba9-ab33-23c1258ce96a.png',
      symbol: 'OKT',
      name: 'okt'
    },
    113159,
    6131.0,
    2234,
    4123.0
  )
];
const MyAsset = () => {
  const [curTab, setCurTab] = useState(Tabs.DEPOSIT);
  const options = [
    { value: Tabs.DEPOSIT, label: '我的存款' },
    { value: Tabs.BORROW, label: '我的借款' }
  ];
  const [curHeadCells, curTableRow, renderCurTableRows, defaultOrderBy] =
    useMemo(() => {
      if (curTab === Tabs.DEPOSIT)
        return [
          DepositHeadCells,
          DepositRows,
          DepositTableRows,
          'depositAmount'
        ];
      return [BorrowHeadCells, BorrowRows, BorrowTableRows, 'borrowLimit'];
    }, [curTab]);
  return (
    <div className={cls(style.container)}>
      <div className={cls(style['container-head'])}>
        <div>我的资产</div>
        <Link to="/porfolio/liquidation" style={{ textDecoration: 'none' }}>
          <div className={cls('flex items-center cursor-pointer')}>
            <i
              className={cls('iconfont icon-Records')}
              style={{ fontSize: 24, marginRight: 8 }}
            />
            资产清算记录
          </div>
        </Link>
      </div>
      <main>
        <AssetInfo />
        <Tab
          curValue={curTab}
          option={options}
          onChange={(tab) => {
            setCurTab(tab);
          }}
        />
        <EnhancedTable<any>
          headCells={curHeadCells}
          rows={curTableRow}
          TableRows={renderCurTableRows}
          defaultOrderBy={defaultOrderBy}
        />
      </main>
    </div>
  );
};

export default MyAsset;