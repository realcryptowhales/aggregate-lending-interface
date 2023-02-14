import { Button, styled, Switch, TableCell, TableRow } from '@mui/material';
import style from './index.module.less';
import cls from 'classnames';
import classNames from 'classnames';
import { useState } from 'react';
import { border } from '@mui/system';
import { LiquidationData } from '..';
const StyledTableRow = styled(TableRow)(() => ({
  '& td,& th': {
    border: 0
  },
  '& th': {
    borderRadius: '8px 0px 0px 8px'
  },
  '& > :last-child': {
    borderRadius: '0px 8px 8px 0px'
  }
}));

export const liquidationTableRows = ({ row }: { row: LiquidationData }) => {
  const {
    time,
    event,
    liquidationAsset: { logo, symbol, name },
    liquidationAmount,
    repaidDebt,
    liquidationThreshold,
    liquidationPenalty,
    liquidatorAddr,
    hash
  } = row;
  return (
    <StyledTableRow
      sx={{
        height: 85,
        background: '#F7F9FA'
      }}
      hover
      tabIndex={-1}
      key={liquidatorAddr}
      className={cls('cursor-pointer', style.row)}
    >
      <TableCell
        padding="normal"
        align="left"
        sx={{ width: 147 }}
        component="th"
      >
        <div>{time}</div>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 133 }}>
        {event}
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 133 }}>
        <div className={cls('flex items-center')}>
          <img
            style={{ width: 31, height: 30, marginRight: 10 }}
            src={logo}
            alt={symbol}
          />
          <div>
            <div>{name}</div>
            <div className={style.font12}>{symbol}</div>
          </div>
        </div>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 133 }}>
        {liquidationAmount}
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 134 }}>
        <div>{repaidDebt}</div>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 121 }}>
        <div>{`${liquidationThreshold}%`}</div>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 133 }}>
        <div>{`${liquidationPenalty}%`}</div>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 151 }}>
        <div style={{ color: '#0032D3' }}>{liquidatorAddr}</div>
      </TableCell>
      <TableCell padding="none" align="left">
        <div style={{ paddingRight: 16, color: '#0032D3' }}>查看详情</div>
      </TableCell>
    </StyledTableRow>
  );
};
