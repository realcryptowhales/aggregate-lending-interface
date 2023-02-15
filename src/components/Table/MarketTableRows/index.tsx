import { styled, TableCell, TableRow } from '@mui/material';
import style from './index.module.less';
import cls from 'classnames';

import { PinkButton } from '@/containers/Porfolio/DepositTableRows';
import { PurpleButton } from '@/containers/Porfolio/BorrowTableRows';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { currencyList, TOKENSYMBOL } from '@/constant';
import { Data } from '..';
const StyledTableRow = styled(TableRow)(() => ({
  '& td,& th': {
    border: 0
  },
  '& th': {
    borderRadius: '8px 0px 0px 8px'
  },
  '& > :last-child': {
    borderRadius: '0px 8px 8px 0px'
  },
  '& div': {
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '20px'
  },
  '& span': {
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '16px',
    color: '#979797'
  }
}));

export const MarketTableRows = ({ row }: { row: Data }) => {
  const { asset } = row;
  console.log('row', row);
  const navigate = useNavigate();
  const [icon, symbol] = [currencyList[asset].icon, currencyList[asset].symbol];
  return (
    <StyledTableRow
      sx={{
        height: 85,
        background: '#F7F9FA'
      }}
      hover
      //   onClick={(event) => handleClick(event, row.name)}
      tabIndex={-1}
      key={row.asset}
      className={cls('cursor-pointer', style.row)}
      onClick={() => {
        navigate(`/markets/${asset}`);
      }}
    >
      <TableCell
        className={style.cell}
        padding="none"
        component="th"
        scope="row"
        sx={{ width: 138, paddingLeft: '16px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            style={{ width: 30, height: 30, marginRight: 8 }}
            src={icon}
          ></img>
          <div>
            <div className={style.name}> {symbol}</div>

            <span className={style.font12}> {symbol}</span>
          </div>
        </div>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 140 }}>
        <div className={style.cell}>{row.totalDeposit}</div>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 163 }}>
        <div className={style.cell}>{row.depositApr}</div>
        <span className={style.font12}>{'match'}</span>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 146 }}>
        <div className={style.cell}> {row.totalLoan}</div>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 182 }}>
        <div>{row.loanApr}</div>
        <span className={style.font12}>{'match'}</span>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 256 }}>
        <div>{row.matchAmount}</div>
      </TableCell>
      <TableCell
        padding="none"
        align="right"
        // style={{ paddingLeft: 100, boxSizing: 'border-box' }}
      >
        <div style={{ paddingRight: 16 }}>
          <PinkButton
            className={cls(style['button-l'])}
            variant="contained"
            sx={{ mr: '12px', background: '#F98A6B' }}
            onClick={(e: any) => {
              e.stopPropagation();
              //   todo
              //openDepositDialog
            }}
          >
            存款
          </PinkButton>
          <PurpleButton
            className={cls(style['button-r'])}
            sx={{ background: '#51459D' }}
            onClick={(e: any) => {
              e.stopPropagation();

              //   todo
              //openBorrowDialog
            }}
          >
            借款
          </PurpleButton>
        </div>
      </TableCell>
    </StyledTableRow>
  );
};
