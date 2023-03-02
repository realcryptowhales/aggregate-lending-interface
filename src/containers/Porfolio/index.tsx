import style from './index.module.less';
import cls from 'classnames';
import AssetInfo from './AssetInfo';
import EnhancedTable, { HeadCell } from '@/components/Table';
import { DepositTableRows } from './DepositTableRows';
import { Tooltip } from '@mui/material';
import Tab, { Tabs } from './Tab';
import { useEffect, useMemo, useState } from 'react';
import { BorrowTableRows } from './BorrowTableRows';
import { Link } from 'react-router-dom';
import { useStore } from '@/stores';
import { useAccount, useContractRead, useContractReads } from 'wagmi';
import { mockUSDTAddr, queryHelperContractAddr } from '@/constant/contract';
import { queryHelperContract } from '@/stores/marketStore';
import { queryHelperABI } from '@/constant';
import {
  BorrowedInfo,
  PorfolioData,
  SuppliedInfo,
  UserInfo
} from '@/stores/porfolioStore';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { BigNumberish } from 'ethers';
export interface DepositData {
  key: string;
  symbol: string;
  underlying: string;
  depositValue: number;
  depositApr: number;
  depositAmount: string;
  availableBalance: number;
  dailyEstProfit: number;
  collateral: boolean;
  action: React.ReactNode;
}

const DepositHeadCells: HeadCell<DepositData>[] = [
  {
    id: 'symbol',
    label: '存款币种',
    needSort: true
  },
  {
    id: 'depositValue',

    label: '存款头寸',
    needSort: true
  },
  {
    id: 'depositApr',
    label: '存款 APR',
    needSort: true
  },
  {
    id: 'availableBalance',

    label: '钱包余额',
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
// function createDepositData(
//   depositToken: string,
//   depositAmount: number,
//   supplyApr: number,
//   availableBalance: number,
//   dailyEstProfit: number,
//   collateral: boolean,
//   action?: React.ReactNode
// ): DepositData {
//   return {
//     key: depositToken,
//     depositToken,
//     depositAmount,
//     supplyApr,
//     availableBalance,
//     dailyEstProfit,
//     collateral,
//     action
//   };
// }

// const DepositRows = [
//   createDepositData(
//     'BTC',
//     305,
//     3.7,
//     67,
//     4.3,
//     false,
//     <div>1231231312313131</div>
//   ),
//   createDepositData(
//     'ETH',
//     452,
//     25.0,
//     51,
//     4.9,
//     false,

//     <div>123</div>
//   ),
//   createDepositData('USDT', 262, 16.0, 24, 6.0, false, <div>123</div>),
//   createDepositData(
//     'OKB',
//     159,
//     6.0,
//     24,
//     4.0,
//     false,

//     <div>123</div>
//   )
// ];
export interface BorrowData {
  key: string;
  symbol: string;

  underlying: string;
  borrowValue: BigNumberish;
  borrowAmount: string;
  borrowApr: BigNumberish;
  borrowLimit: BigNumberish;
  dailyEstInterest: BigNumberish;
  action: React.ReactNode;
}
const BorrowHeadCells: HeadCell<BorrowData>[] = [
  {
    id: 'symbol',
    label: '借款币种',
    needSort: true
  },
  {
    id: 'borrowValue',

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

const Porfolio = () => {
  const [curTab, setCurTab] = useState(Tabs.DEPOSIT);
  const options = [
    { value: Tabs.DEPOSIT, label: '我的存款' },
    { value: Tabs.BORROW, label: '我的借款' }
  ];
  const {
    porfolioStore: {
      computePorfolioData,
      netProfit,
      userSuppliedList,
      userBorrowedList
    }
  } = useStore();

  const { address } = useAccount();
  const { data } = useContractReads({
    // watch: true,
    // cacheTime: 4_000,
    onSuccess(data: PorfolioData) {
      console.log('Success', data);
      computePorfolioData(data);
    },
    contracts: [
      {
        ...queryHelperContract,
        functionName: 'getUserSupplied',
        args: [address, mockUSDTAddr]
      },
      {
        ...queryHelperContract,
        functionName: 'getUserBorrowed',
        args: [address, mockUSDTAddr]
      },
      {
        ...queryHelperContract,
        functionName: 'getUserInfo',
        args: [address, mockUSDTAddr]
      }
    ]
  });
  const [curHeadCells, curTableRow, renderCurTableRows, defaultOrderBy] =
    useMemo(() => {
      if (curTab === Tabs.DEPOSIT)
        return [
          DepositHeadCells,
          userSuppliedList,
          DepositTableRows,
          'depositAmount'
        ];
      return [
        BorrowHeadCells,
        userBorrowedList,
        BorrowTableRows,
        'borrowLimit'
      ];
    }, [curTab, userSuppliedList, data, userBorrowedList]);
  console.log('data', data);
  return (
    <div className={cls(style.container)}>
      <div className={cls(style['container-head'])}>
        <div>我的资产{netProfit}</div>
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

export default observer(Porfolio);
