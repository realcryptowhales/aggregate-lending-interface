import { Button, styled, Switch, TableCell, TableRow } from '@mui/material';
import style from './index.module.less';
import cls from 'classnames';
import { BorrowData } from '..';
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
  return (
    <StyledTableRow
      sx={{
        height: 85,
        background: '#F7F9FA'
      }}
      hover
      //   onClick={(event) => handleClick(event, row.name)}
      tabIndex={-1}
      key={row.borrowToken.symbol}
      className={style.row}
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
            src={row.borrowToken.logo}
          ></img>
          <div>
            <div className={style.name}> {row.borrowToken.name}</div>

            <span className={style.font12}> {row.borrowToken.symbol}</span>
          </div>
        </div>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 140 }}>
        <div>{row.borrowAmount}</div>
        <span className={style.font12}>美元估值</span>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 163 }}>
        <div>{row.borrowApr}</div>
        <span className={style.font12}>APR组成</span>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 146 }}>
        <div>{row.borrowLimit}</div>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 436 }}>
        <div>{row.dailyEstInterest}</div>
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
            onClick={() => {
              //   todo
              //openDepositDialog
            }}
          >
            借款
          </PurpleButton>
          <BorderButton
            sx={{ border: '1px solid #000000', color: '#3D3E3E' }}
            onClick={() => {
              //   todo
              //openBorrowDialog
            }}
          >
            换款
          </BorderButton>
        </div>
      </TableCell>
    </StyledTableRow>
  );
};
