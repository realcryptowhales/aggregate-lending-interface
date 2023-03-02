import { styled, TableCell, TableRow } from '@mui/material';
import style from './index.module.less';
import cls from 'classnames';

import { PinkButton } from '@/containers/Porfolio/DepositTableRows';
import { PurpleButton } from '@/containers/Porfolio/BorrowTableRows';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { currencyList, TOKENSYMBOL } from '@/constant';
import { MarketCurrencyInfo } from '@/stores/marketStore';
import { rawToPercent, rawToThousandCurrency } from '@/utils/format';
import { useStore } from '@/stores';
export type Data = MarketCurrencyInfo;
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
  const {
    underlying,
    totalBorrowed,
    totalSupplied,
    totalMatched,
    supplyRate,
    borrowRate
  } = row;
  const navigate = useNavigate();
  const {
    commonStore: { tokenMap }
  } = useStore();

  const [icon = '', symbol = '', decimal = 6] = [
    tokenMap[underlying]?.icon,
    tokenMap[underlying]?.symbol,
    tokenMap[underlying]?.deciaml
  ];
  return (
    <StyledTableRow
      sx={{
        height: 85,
        background: '#F7F9FA'
      }}
      hover
      //   onClick={(event) => handleClick(event, row.name)}
      tabIndex={-1}
      key={symbol}
      className={cls('cursor-pointer', style.row)}
      onClick={() => {
        navigate(`/markets/token?address=${underlying}`);
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
        <div className={style.cell}>{rawToThousandCurrency(totalSupplied)}</div>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 163 }}>
        <div className={style.cell}>{rawToPercent(supplyRate)}</div>
        <span className={style.font12}>{'match'}</span>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 146 }}>
        <div className={style.cell}>{rawToThousandCurrency(totalBorrowed)}</div>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 182 }}>
        <div>{rawToPercent(borrowRate)}</div>
        <span className={style.font12}>{'match'}</span>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 256 }}>
        <div>{rawToThousandCurrency(totalMatched)}</div>
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
