import { styled, TableCell, TableRow } from '@mui/material';
import style from './index.module.less';
import cls from 'classnames';

import { PinkButton } from '@/containers/Porfolio/DepositTableRows';
import { PurpleButton } from '@/containers/Porfolio/BorrowTableRows';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { currencyList, TOKENSYMBOL } from '@/constant';

import {
  formatPercent,
  rawToPercent,
  rawToThousandCurrency,
  thousandCurrency
} from '@/utils/format';
import { useStore } from '@/stores';
export type Data = {
  underlying: string;
  borrowRate: string;
  supplyRate: string;
  totalBorrowed: string;
  totalMatched: string;
  totalSupplied: string;
  symbol: string;
  matchedSupplyPercentage: string;
  aaveSupplyPercentage: string;
  compoundSupplyPercentage: string;
  matchedBorrowPercentage: string;
  aaveBorrowPercentage: string;
  compoundBorrowPercentage: string;
  protocolSupplyPercentage: string;
  protocolBorrowPercentage: string;
};
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
    borrowRate,
    matchedSupplyPercentage,
    // aaveSupplyPercentage,
    // compoundSupplyPercentage,
    matchedBorrowPercentage,

    // aaveBorrowPercentage,
    // compoundBorrowPercentage,
    protocolSupplyPercentage,
    protocolBorrowPercentage
  } = row;
  const navigate = useNavigate();
  const {
    commonStore: { tokenMap }
  } = useStore();

  const currentToken = tokenMap?.[underlying.toLocaleLowerCase()];
  const [icon = '', symbol = '', decimal = 6, name] = [
    currentToken?.icon,
    currentToken?.symbol,
    currentToken?.decimal,
    currentToken?.name
  ];
  console.log('matchedSupplyPercentage', matchedSupplyPercentage);
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
        navigate(`/markets/token?address=${underlying.toLocaleLowerCase()}`);
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
            alt={symbol}
          ></img>
          <div>
            <div className={style.name}> {symbol}</div>

            <span className={style.font12}> {name}</span>
          </div>
        </div>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 140 }}>
        <div className={style.cell}>{thousandCurrency(totalSupplied)}</div>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 163 }}>
        <div className={style.cell}>{formatPercent(supplyRate)}</div>
        <span className={style.font12}>
          {`(${formatPercent(matchedSupplyPercentage, 0)}撮合+${formatPercent(
            protocolSupplyPercentage,
            0
          )}底层协议)`}
        </span>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 146 }}>
        <div className={style.cell}>{thousandCurrency(totalBorrowed)}</div>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 182 }}>
        <div>{formatPercent(borrowRate)}</div>
        <span className={style.font12}>
          {`(${formatPercent(matchedBorrowPercentage, 0)}撮合+${formatPercent(
            protocolBorrowPercentage,
            0
          )}底层协议)`}
        </span>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 256 }}>
        <div>{thousandCurrency(totalMatched)}</div>
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
