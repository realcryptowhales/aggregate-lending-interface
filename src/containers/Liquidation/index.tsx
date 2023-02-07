import EnhancedTable, { Asset, HeadCell } from '@/components/Table';
import { Tooltip } from '@mui/material';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { liquidationTableRows } from './LiquidationTableRows';
import style from './index.module.less';
export interface LiquidationData {
  key: string;
  time: string;
  event: string;
  liquidationValue: number;
  repaidDebt: number;
  liquidationThreshold: React.ReactNode;
  liquidationPenalty: number;
  remainingCollateralValue: number;
  liquidatorAddr: string;
  viewDetails: string[];
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
    id: 'liquidationValue',
    label: '清算抵押品价值',
    needSort: false
  },
  {
    id: 'repaidDebt',

    label: '偿还的债务本息',
    needSort: false
  },
  {
    id: 'liquidationThreshold',

    label: '仓位抵押率/清算线',
    needSort: false
  },
  {
    id: 'liquidationPenalty',

    label: '清算惩罚',
    needSort: false
  },
  {
    id: 'remainingCollateralValue',

    label: '剩余抵押物价值',
    needSort: false
  },
  {
    id: 'liquidatorAddr',

    label: '清算人地址',
    needSort: false
  },
  {
    id: 'viewDetails',

    label: '查看详情',
    needSort: false
  }
];
function createliquidationData(
  time: string,
  event: string,
  liquidationValue: number,
  repaidDebt: number,
  liquidationThreshold: number,
  positionCollateralization: number,
  liquidationPenalty: number,
  remainingCollateralValue: number,
  liquidatorAddr: string,
  //todo
  viewDetails: string[]
): LiquidationData {
  return {
    key: liquidatorAddr,
    time,
    event,
    liquidationValue,
    repaidDebt,
    liquidationThreshold: (
      <div>
        <span>{`${positionCollateralization}%/`}</span>

        <span style={{ color: '#E3493F' }}>{`${liquidationThreshold}%`}</span>
      </div>
    ),
    liquidationPenalty,
    remainingCollateralValue,
    liquidatorAddr,
    viewDetails
  };
}

const liquidationRows = [
  createliquidationData(
    '2023',
    '清算',
    305,
    3.7,
    89,
    85,
    4.3,
    123123,
    '0x213',
    ['TX1', 'TX2', 'TX3']
  ),
  createliquidationData(
    '2023',
    '清算',
    305,
    3.7,
    89,
    85,
    4.3,
    123123,
    '0x213',
    ['TX1', 'TX2', 'TX3']
  ),
  createliquidationData(
    '2023',
    '清算',
    305,
    3.7,
    89,
    85,
    4.3,
    123123,
    '0x213',
    ['TX1', 'TX2', 'TX3']
  ),
  createliquidationData(
    '2023',
    '清算',
    305,
    3.7,
    89,
    85,
    4.3,
    123123,
    '0x213',
    ['TX1', 'TX2', 'TX3']
  )
];
const Liquidation = () => {
  return (
    <div className={style.container}>
      <div className={style.title}>资产清算记录</div>
      <EnhancedTable<LiquidationData>
        headCells={liquidationHeadCells}
        rows={liquidationRows}
        TableRows={liquidationTableRows}
      />
      <Link to="/porfolio">back to porfolio</Link>
    </div>
  );
};

export default Liquidation;
