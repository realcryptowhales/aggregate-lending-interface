import EnhancedTable, { HeadCell } from '@/components/Table';
import { TablePagination } from '@mui/material';
import { useState } from 'react';
import { liquidationTableRows } from './LiquidationTableRows';
import style from './index.module.less';
import useSWR from 'swr';
import { useAccount } from 'wagmi';
import { fetcher } from '@api/index';

interface LiquidationHistoryRecord {
  liquidator: string;
  redeemToken: string;
  redeemTokenSymbol: string;
  redeemTokenIcon: string;
  redeemTokenName: string;
  redeemAmount: number;
  repayedToken: string;
  repayedTokenSymbol: string;
  repayedTokenIcon: string;
  repayedTokenName: string;
  repayedAmount: number;
  assetAddress: string;
  transactionHash: string;

  gmtCreate: number;
  liquidateRewardRatio: number;
}
export interface LiquidationData extends LiquidationHistoryRecord {
  key: any;
  event: string;
  liquidationThreshold: number;
}

const liquidationHeadCells: HeadCell<LiquidationData>[] = [
  {
    id: 'gmtCreate',
    label: '时间',
    needSort: false
  },
  {
    id: 'event',

    label: '事件类型',
    needSort: false
  },
  {
    id: 'redeemToken',
    label: '抵押资产',
    needSort: false
  },
  {
    id: 'redeemAmount',

    label: '抵押资产数量',
    needSort: false
  },
  {
    id: 'repayedToken',
    label: '偿还资产',
    needSort: false
  },
  {
    id: 'repayedAmount',

    label: '偿还资产数量',
    needSort: false
  },

  {
    id: 'liquidateRewardRatio',

    label: '清算惩罚',
    needSort: false
  },

  {
    id: 'liquidator',

    label: '清算人地址',
    needSort: false
  },
  {
    id: 'transactionHash',

    label: '交易详情',
    needSort: false
  }
];
interface Params {
  assetAddress: string;
  pageNo: number;
  pageSize: number;
}

const Liquidation = () => {
  const [pageNo, setPageNo] = useState(0);
  const handleChangePage = (event: unknown, newPageNo: number) => {
    setPageNo(newPageNo);
  };
  const { address, isConnected } = useAccount();
  const { data = { totalNum: 0, result: [] } } =
    isConnected &&
    address &&
    (useSWR(
      {
        url: '/aggregate-lending/liquidator/list',
        params: {
          pageNo: pageNo + 1,
          assetAddress: address,
          pageSize: 8
        }
      },
      fetcher
    ) as any);
  const { totalNum, result } = data;
  // const computedLiquidationRows = React.useMemo(() => {
  //   return liquidationRows.slice(
  //     page * rowsPerPage,
  //     page * rowsPerPage + rowsPerPage
  //   );
  // }, [liquidationRows, page, rowsPerPage]);

  return (
    <div className={style.container}>
      <div className={style.title}>资产清算记录</div>
      <EnhancedTable<LiquidationData>
        headCells={liquidationHeadCells}
        rows={result}
        TableRows={liquidationTableRows}
      />
      {!!totalNum && (
        <TablePagination
          style={{ marginTop: '40px', marginBottom: '64px' }}
          component="div"
          count={totalNum}
          rowsPerPage={8}
          page={pageNo}
          labelRowsPerPage="" //hidden select
          SelectProps={{ sx: { display: 'none' } }} //hidden select
          onPageChange={handleChangePage}
          // onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </div>
  );
};

export default Liquidation;
