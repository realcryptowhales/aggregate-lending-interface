import style from './index.module.less';
import cls from 'classnames';
import AssetInfo from './AssetInfo';
import EnhancedTable, { HeadCell } from '@/components/Table';
import { DepositTableRows } from './DepositTableRows';
import { Button, Tooltip } from '@mui/material';
import Tab, { Tabs } from './Tab';
import { useMemo, useState } from 'react';
import { BorrowTableRows } from './BorrowTableRows';
import { Link } from 'react-router-dom';
import { useStore } from '@/stores';
import { useAccount, useContractReads } from 'wagmi';
import { mockUSDTAddr } from '@/constant/contract';
import { queryHelperContract } from '@/stores/marketStore';
import { PorfolioData } from '@/stores/porfolioStore';
import { observer } from 'mobx-react-lite';
import SmallDialog from '@/components/SmallDialog';
import { useCollateralModal } from '@/hooks/useCollateralModal';
export interface DepositData {
  key: string;
  symbol: string;
  underlying: string;
  depositValue: string;
  depositApr: string;
  depositAmount: string;
  availableBalance: string;
  dailyEstProfit: string;
  protocolSupplyPercentage: string;
  matchedSupplyPercentage: string;
  collateral: boolean;
  matchedBorrowPercentage: string;
  protocolBorrowPercentage: string;
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

export interface BorrowData {
  key: string;
  symbol: string;

  underlying: string;
  borrowValue: string;
  borrowAmount: string;
  borrowApr: string;
  borrowLimit: string;
  dailyEstInterest: string;
  matchedBorrowPercentage: string;
  protocolBorrowPercentage: string;
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
  useContractReads({
    watch: true,
    cacheTime: 4_000,
    onSuccess(data: PorfolioData) {
      console.log('PorfolioContractData', data);
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
          'depositValue'
        ];
      return [
        BorrowHeadCells,
        userBorrowedList,
        BorrowTableRows,
        'borrowValue'
      ];
    }, [curTab, userSuppliedList, userBorrowedList]);
  // const { config } = usePrepareContractWrite({
  //   address: routerAddr,
  //   abi: routerABI,
  //   functionName: 'supply',
  //   args: [
  //     {
  //       asset: '0x1f901fe9EF8bA33149f28Cafdbb4E5DcF4a9526E',
  //       amount: '100000000000000000000',
  //       to: '0x49f8948c60cE2b4180DEf540f03148540268C5B0'
  //     },
  //     true,
  //     true
  //   ]
  // });

  const {
    tokenSymbol,
    onCancel,
    onConfirm,
    openModalAction,
    collateralStatus,
    modalVisible
  } = useCollateralModal();
  const modalInfo = useMemo(() => {
    return collateralStatus === 'openCollateral'
      ? {
          title: '开启抵押',
          button: (
            <Button
              style={{
                width: '130px',
                height: '40px'
              }}
              sx={{
                background: '#000000',
                color: '#ffffff',
                '&:hover': { background: '#000000' }
              }}
              onClick={() => {
                //todo 上链 -> 切换按钮状态 成功后关闭
                // setCollateralStatus(true);
                onConfirm();
              }}
            >
              Confirm
            </Button>
          ),
          content: (
            <div className="flex flex-col items-center justify-center min-w-85.75 min-h-47 text-3.5 leading-4">
              {`请确定以${tokenSymbol}作为抵押品 作为抵押品的资产可以用于借贷`}
            </div>
          )
        }
      : {
          title: '关闭抵押',
          button: (
            <div className={cls('grow flex justify-center')}>
              <Button
                style={{
                  width: '130px',
                  height: '40px',
                  marginRight: '20px'
                }}
                sx={{
                  border: '1px solid #000000',
                  background: '#ffffff',
                  color: '#000000',
                  '&:hover': { background: '#ffffff' }
                }}
                onClick={() => {
                  //todo 上链 -> 切换按钮状态 成功后关闭
                  // setCollateralStatus(false);
                  onConfirm();
                }}
              >
                关闭抵押
              </Button>
              <Button
                style={{
                  width: '130px',
                  height: '40px'
                }}
                sx={{
                  background: '#000000',
                  color: '#ffffff',
                  '&:hover': { background: '#000000' }
                }}
                onClick={() => {
                  onCancel();
                }}
              >
                取 消
              </Button>
            </div>
          ),
          content: (
            <div className="flex flex-col items-center justify-center min-w-85.75 min-h-47 text-3.5 leading-4">
              <span>关闭按钮会增加您的资产清算风险，</span>
              <div>若需关闭，建议存入更多资产或归还部分借款</div>
            </div>
          )
        };
  }, [collateralStatus, tokenSymbol, onCancel, onConfirm]);
  // console.log('address', address);
  // const { config } = usePrepareContractWrite({
  //   address: configContractAddr,
  //   abi: configABI,
  //   functionName: 'setUsingAsCollateral',
  //   args: [
  //     '0x49f8948c60cE2b4180DEf540f03148540268C5B0',
  //     '0x0b99A10c7EDdEDB735040a23a923A08248CE6f4f',
  //     true
  //   ],
  //   onSettled(data, error) {
  //     console.log('Settled', { data, error });
  //   }
  // });
  // const { isLoading, isSuccess, write, data } = useContractWrite(config);
  // console.log('data', data);
  return (
    <div className={cls(style.container)}>
      <div className={cls(style['container-head'])}>
        <div
          onClick={() => {
            // write?.();
          }}
        >
          我的资产
        </div>
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
          TableRows={renderCurTableRows as any}
          defaultOrderBy={defaultOrderBy}
          openCollateralModal={openModalAction}
        />
      </main>
      <SmallDialog open={modalVisible} handleClose={onCancel} {...modalInfo} />
    </div>
  );
};

export default observer(Porfolio);
