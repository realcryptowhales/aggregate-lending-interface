import { Button, styled, TableCell, TableRow } from '@mui/material';
import style from './index.module.less';
import cls from 'classnames';
import { BorrowData } from '..';
import { useNavigate } from 'react-router-dom';
import {
  formatPercent,
  thousandCurrency,
  thousandNumber
} from '@/utils/format';
import { useStore } from '@/stores';
import { DialogTypeProps } from '@/constant';
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
  }
}));

export const BorderButton = styled(Button)({
  color: '#fff',
  lineHeight: '16px',
  textAlign: 'center',
  fontWeight: '400',
  fontSize: '14px',
  padding: '8px 24px',
  '&:hover': {
    backgroundColor: 'none',
    boxShadow: 'none'
  }
});
export const PurpleButton = styled(Button)({
  color: '#fff',
  lineHeight: '16px',
  textAlign: 'center',
  fontWeight: '400',
  fontSize: '14px',
  padding: '8px 24px',
  '&:hover': {
    backgroundColor: '#51459D',
    boxShadow: 'none'
  }
});
export const BorrowTableRows = ({ row }: { row: BorrowData }) => {
  const {
    commonStore: { tokenMap }
  } = useStore();
  const {
    underlying,
    borrowValue,
    borrowApr,
    borrowLimit,
    dailyEstInterest,
    borrowAmount,
    matchedBorrowPercentage,
    protocolBorrowPercentage
  } = row;
  const navigate = useNavigate();
  const currentToken = tokenMap?.[underlying.toLocaleLowerCase()];
  const [icon = '', symbol = '', decimal = 6, name] = [
    currentToken?.icon,
    currentToken?.symbol,
    currentToken?.decimal,
    currentToken?.name
  ];

  return (
    <StyledTableRow
      sx={{
        height: 85,
        background: '#F7F9FA'
      }}
      hover
      onClick={() => {
        navigate(`/porfolio/token?address=${underlying}`);
      }}
      tabIndex={-1}
      key={symbol}
      className={cls('cursor-pointer', style.row)}
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
        <div>{thousandNumber(borrowAmount)}</div>
        <span className={style.font12}>{thousandCurrency(borrowValue)}</span>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 163 }}>
        <div>{formatPercent(borrowApr)}</div>
        <span className={style.font12}>
          {`(${formatPercent(matchedBorrowPercentage, 0)}撮合+${formatPercent(
            protocolBorrowPercentage,
            0
          )}底层协议)`}
        </span>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 146 }}>
        <div>{thousandNumber(borrowLimit)}</div>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 436 }}>
        <div>{thousandCurrency(dailyEstInterest)}</div>
      </TableCell>

      <TableCell
        padding="none"
        align="right"
        // style={{ paddingLeft: 100, boxSizing: 'border-box' }}
      >
        <div style={{ paddingRight: 16 }} className={cls('flex')}>
          <PurpleButton
            variant="contained"
            sx={{ mr: '12px', background: '#51459D' }}
            onClick={(e: any) => {
              e.stopPropagation();

              window.aggregate.openDialog({
                type: DialogTypeProps.borrow,
                activeCurrency: symbol
              });
            }}
          >
            借款
          </PurpleButton>
          <BorderButton
            sx={{ border: '1px solid #000000', color: '#3D3E3E' }}
            onClick={(e: any) => {
              e.stopPropagation();
              window.aggregate.openDialog({
                type: DialogTypeProps.repay,
                activeCurrency: symbol
              });
            }}
          >
            还款
          </BorderButton>
        </div>
      </TableCell>
    </StyledTableRow>
  );
};
