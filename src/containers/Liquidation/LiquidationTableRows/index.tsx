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
  return (
    <StyledTableRow
      sx={{
        height: 85,
        background: '#F7F9FA'
      }}
      hover
      tabIndex={-1}
      key={row.liquidatorAddr}
      className={style.row}
    >
      <TableCell
        padding="normal"
        align="left"
        sx={{ width: 147 }}
        component="th"
      >
        <div>{row.time}</div>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 133 }}>
        {row.event}
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 133 }}>
        <div>{row.liquidationValue}</div>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 133 }}>
        {row.repaidDebt}
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 134 }}>
        <div>{row.liquidationThreshold}</div>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 121 }}>
        <div>{`${row.liquidationPenalty}%`}</div>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 133 }}>
        <div>{row.remainingCollateralValue}</div>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 151 }}>
        <div style={{ color: '#0032D3' }}>{row.liquidatorAddr}</div>
      </TableCell>
      <TableCell padding="none" align="right">
        <div
          style={{ paddingRight: 16, color: '#0032D3' }}
          className={cls('flex justify-between')}
        >
          {row.viewDetails.map((tx) => {
            return <span key={tx}>{tx}</span>;
          })}
        </div>
      </TableCell>
    </StyledTableRow>
  );
};
