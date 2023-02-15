import EnhancedTable, { Asset, HeadCell } from '@/components/Table';
import { TablePagination, Tooltip } from '@mui/material';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { liquidationTableRows } from './LiquidationTableRows';
import style from './index.module.less';
export interface LiquidationData {
  key: any;
  time: string;
  event: string;
  liquidationAsset: Asset;
  liquidationAmount: number;
  repaidDebt: number;
  liquidationThreshold: number;
  liquidationPenalty: number;
  liquidatorAddr: string;
  hash: string;
}

const liquidationHeadCells: HeadCell<LiquidationData>[] = [
  {
    id: 'time',
    label: '时间',
    needSort: false
  },
  {
    id: 'event',

    label: '事件类型',
    needSort: false
  },
  {
    id: 'liquidationAsset',
    label: '资产',
    needSort: false
  },
  {
    id: 'liquidationAmount',

    label: '数量',
    needSort: false
  },
  {
    id: 'repaidDebt',

    label: '偿还的债务本息',
    needSort: false
  },
  {
    id: 'liquidationThreshold',

    label: '清算线',
    needSort: false
  },
  {
    id: 'liquidationPenalty',

    label: '清算惩罚',
    needSort: false
  },

  {
    id: 'liquidatorAddr',

    label: '清算人地址',
    needSort: false
  },
  {
    id: 'hash',

    label: '交易详情',
    needSort: false
  }
];
function createliquidationData(
  time: string,
  event: string,
  liquidationAsset: Asset,
  liquidationAmount: number,
  repaidDebt: number,
  liquidationThreshold: number,
  liquidationPenalty: number,
  liquidatorAddr: string,
  hash: string
): LiquidationData {
  return {
    key: liquidationAmount,
    time,
    event,
    liquidationAsset,
    liquidationAmount,
    repaidDebt,
    liquidationThreshold,
    liquidationPenalty,
    liquidatorAddr,
    hash
  };
}

const liquidationRows = [
  createliquidationData(
    '2023',
    '清算',
    {
      logo: 'https://static.okx.com/cdn/assets/imgs/221/C25FE324914596B9.png',
      symbol: 'BTC',
      name: 'btc'
    },
    305,
    3.7,
    89,
    85,
    '0x213',
    'tx2'
  ),
  createliquidationData(
    '2023',
    '清算',
    {
      logo: 'https://static.okx.com/cdn/assets/imgs/221/5F33E3F751873296.png',
      symbol: 'ETH',
      name: 'eth'
    },
    305,
    3.7,
    89,
    85,
    '0x213',
    'tx7'
  ),
  createliquidationData(
    '2023',
    '清算',
    {
      logo: 'https://static.okx.com/cdn/assets/imgs/221/5F74EB20302D7761.png',
      symbol: 'USDT',
      name: 'usdt'
    },
    305,
    3.7,
    89,
    85,
    '0x213',
    'tx7'
  ),
  createliquidationData(
    '2023',
    '清算',
    {
      logo: 'https://static.okx.com/cdn/announce/20220119/1642588815382f0fd4a29-ba95-4ba9-ab33-23c1258ce96a.png',
      symbol: 'OKB',
      name: 'okb'
    },
    305,
    3.7,
    89,
    85,
    '0x213',
    'tx9'
  ),
  createliquidationData(
    '2023',
    '清算',
    {
      logo: 'https://static.okx.com/cdn/assets/imgs/221/C25FE324914596B9.png',
      symbol: 'BTC',
      name: 'btc'
    },
    305,
    3.7,
    89,
    85,
    '0x213',
    'tx2'
  ),
  createliquidationData(
    '2023',
    '清算',
    {
      logo: 'https://static.okx.com/cdn/assets/imgs/221/5F33E3F751873296.png',
      symbol: 'ETH',
      name: 'eth'
    },
    305,
    3.7,
    89,
    85,
    '0x213',
    'tx7'
  ),
  createliquidationData(
    '2023',
    '清算',
    {
      logo: 'https://static.okx.com/cdn/assets/imgs/221/5F74EB20302D7761.png',
      symbol: 'USDT',
      name: 'usdt'
    },
    305,
    3.7,
    89,
    85,
    '0x213',
    'tx7'
  ),
  createliquidationData(
    '2023',
    '清算',
    {
      logo: 'https://static.okx.com/cdn/announce/20220119/1642588815382f0fd4a29-ba95-4ba9-ab33-23c1258ce96a.png',
      symbol: 'OKB',
      name: 'okb'
    },
    305,
    3.7,
    89,
    85,
    '0x213',
    'tx9'
  ),
  createliquidationData(
    '2023',
    '清算',
    {
      logo: 'https://static.okx.com/cdn/assets/imgs/221/C25FE324914596B9.png',
      symbol: 'BTC',
      name: 'btc'
    },
    305,
    3.7,
    89,
    85,
    '0x213',
    'tx2'
  ),
  createliquidationData(
    '2023',
    '清算',
    {
      logo: 'https://static.okx.com/cdn/assets/imgs/221/5F33E3F751873296.png',
      symbol: 'ETH',
      name: 'eth'
    },
    305,
    3.7,
    89,
    85,
    '0x213',
    'tx7'
  ),
  createliquidationData(
    '2023',
    '清算',
    {
      logo: 'https://static.okx.com/cdn/assets/imgs/221/5F74EB20302D7761.png',
      symbol: 'USDT',
      name: 'usdt'
    },
    305,
    3.7,
    89,
    85,
    '0x213',
    'tx7'
  ),
  createliquidationData(
    '2023',
    '清算',
    {
      logo: 'https://static.okx.com/cdn/announce/20220119/1642588815382f0fd4a29-ba95-4ba9-ab33-23c1258ce96a.png',
      symbol: 'OKB',
      name: 'okb'
    },
    305,
    3.7,
    89,
    85,
    '0x213',
    'tx9'
  ),
  createliquidationData(
    '2023',
    '清算',
    {
      logo: 'https://static.okx.com/cdn/assets/imgs/221/C25FE324914596B9.png',
      symbol: 'BTC',
      name: 'btc'
    },
    305,
    3.7,
    89,
    85,
    '0x213',
    'tx2'
  ),
  createliquidationData(
    '2023',
    '清算',
    {
      logo: 'https://static.okx.com/cdn/assets/imgs/221/5F33E3F751873296.png',
      symbol: 'ETH',
      name: 'eth'
    },
    305,
    3.7,
    89,
    85,
    '0x213',
    'tx7'
  ),
  createliquidationData(
    '2023',
    '清算',
    {
      logo: 'https://static.okx.com/cdn/assets/imgs/221/5F74EB20302D7761.png',
      symbol: 'USDT',
      name: 'usdt'
    },
    305,
    3.7,
    89,
    85,
    '0x213',
    'tx7'
  ),
  createliquidationData(
    '2023',
    '清算',
    {
      logo: 'https://static.okx.com/cdn/announce/20220119/1642588815382f0fd4a29-ba95-4ba9-ab33-23c1258ce96a.png',
      symbol: 'OKB',
      name: 'okb'
    },
    305,
    3.7,
    89,
    85,
    '0x213',
    'tx9'
  ),
  createliquidationData(
    '2023',
    '清算',
    {
      logo: 'https://static.okx.com/cdn/assets/imgs/221/C25FE324914596B9.png',
      symbol: 'BTC',
      name: 'btc'
    },
    305,
    3.7,
    89,
    85,
    '0x213',
    'tx2'
  ),
  createliquidationData(
    '2023',
    '清算',
    {
      logo: 'https://static.okx.com/cdn/assets/imgs/221/5F33E3F751873296.png',
      symbol: 'ETH',
      name: 'eth'
    },
    305,
    3.7,
    89,
    85,
    '0x213',
    'tx7'
  ),
  createliquidationData(
    '2023',
    '清算',
    {
      logo: 'https://static.okx.com/cdn/assets/imgs/221/5F74EB20302D7761.png',
      symbol: 'USDT',
      name: 'usdt'
    },
    305,
    3.7,
    89,
    85,
    '0x213',
    'tx7'
  ),
  createliquidationData(
    '2023',
    '清算',
    {
      logo: 'https://static.okx.com/cdn/announce/20220119/1642588815382f0fd4a29-ba95-4ba9-ab33-23c1258ce96a.png',
      symbol: 'OKB',
      name: 'okb'
    },
    305,
    3.7,
    89,
    85,
    '0x213',
    'tx9'
  ),
  createliquidationData(
    '2023',
    '清算',
    {
      logo: 'https://static.okx.com/cdn/assets/imgs/221/C25FE324914596B9.png',
      symbol: 'BTC',
      name: 'btc'
    },
    305,
    3.7,
    89,
    85,
    '0x213',
    'tx2'
  ),
  createliquidationData(
    '2023',
    '清算',
    {
      logo: 'https://static.okx.com/cdn/assets/imgs/221/5F33E3F751873296.png',
      symbol: 'ETH',
      name: 'eth'
    },
    305,
    3.7,
    89,
    85,
    '0x213',
    'tx7'
  ),
  createliquidationData(
    '2023',
    '清算',
    {
      logo: 'https://static.okx.com/cdn/assets/imgs/221/5F74EB20302D7761.png',
      symbol: 'USDT',
      name: 'usdt'
    },
    305,
    3.7,
    89,
    85,
    '0x213',
    'tx7'
  ),
  createliquidationData(
    '2023',
    '清算',
    {
      logo: 'https://static.okx.com/cdn/announce/20220119/1642588815382f0fd4a29-ba95-4ba9-ab33-23c1258ce96a.png',
      symbol: 'OKB',
      name: 'okb'
    },
    305,
    3.7,
    89,
    85,
    '0x213',
    'tx9'
  ),
  createliquidationData(
    '2023',
    '清算',
    {
      logo: 'https://static.okx.com/cdn/assets/imgs/221/C25FE324914596B9.png',
      symbol: 'BTC',
      name: 'btc'
    },
    305,
    3.7,
    89,
    85,
    '0x213',
    'tx2'
  ),
  createliquidationData(
    '2023',
    '清算',
    {
      logo: 'https://static.okx.com/cdn/assets/imgs/221/5F33E3F751873296.png',
      symbol: 'ETH',
      name: 'eth'
    },
    305,
    3.7,
    89,
    85,
    '0x213',
    'tx7'
  ),
  createliquidationData(
    '2023',
    '清算',
    {
      logo: 'https://static.okx.com/cdn/assets/imgs/221/5F74EB20302D7761.png',
      symbol: 'USDT',
      name: 'usdt'
    },
    305,
    3.7,
    89,
    85,
    '0x213',
    'tx7'
  ),
  createliquidationData(
    '2023',
    '清算',
    {
      logo: 'https://static.okx.com/cdn/announce/20220119/1642588815382f0fd4a29-ba95-4ba9-ab33-23c1258ce96a.png',
      symbol: 'OKB',
      name: 'okb'
    },
    305,
    3.7,
    89,
    85,
    '0x213',
    'tx9'
  ),
  createliquidationData(
    '2023',
    '清算',
    {
      logo: 'https://static.okx.com/cdn/assets/imgs/221/C25FE324914596B9.png',
      symbol: 'BTC',
      name: 'btc'
    },
    305,
    3.7,
    89,
    85,
    '0x213',
    'tx2'
  ),
  createliquidationData(
    '2023',
    '清算',
    {
      logo: 'https://static.okx.com/cdn/assets/imgs/221/5F33E3F751873296.png',
      symbol: 'ETH',
      name: 'eth'
    },
    305,
    3.7,
    89,
    85,
    '0x213',
    'tx7'
  ),
  createliquidationData(
    '2023',
    '清算',
    {
      logo: 'https://static.okx.com/cdn/assets/imgs/221/5F74EB20302D7761.png',
      symbol: 'USDT',
      name: 'usdt'
    },
    305,
    3.7,
    89,
    85,
    '0x213',
    'tx7'
  ),
  createliquidationData(
    '2023',
    '清算',
    {
      logo: 'https://static.okx.com/cdn/announce/20220119/1642588815382f0fd4a29-ba95-4ba9-ab33-23c1258ce96a.png',
      symbol: 'OKB',
      name: 'okb'
    },
    305,
    3.7,
    89,
    85,
    '0x213',
    'tx9'
  )
];
const pageSize = 5;
const Liquidation = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };
  const computedLiquidationRows = React.useMemo(() => {
    return liquidationRows.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [liquidationRows, page, rowsPerPage]);
  return (
    <div className={style.container}>
      <div className={style.title}>资产清算记录</div>
      <EnhancedTable<LiquidationData>
        headCells={liquidationHeadCells}
        rows={computedLiquidationRows}
        TableRows={liquidationTableRows}
      />
      <TablePagination
        style={{ marginTop: '40px', marginBottom: '64px' }}
        rowsPerPageOptions={[4, 8]}
        component="div"
        count={liquidationRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        labelRowsPerPage="" //hidden select
        SelectProps={{ sx: { display: 'none' } }} //hidden select
        onPageChange={handleChangePage}
        // onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Liquidation;
