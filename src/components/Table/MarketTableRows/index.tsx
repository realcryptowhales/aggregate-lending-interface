import { Button, TableCell, TableRow } from '@mui/material';
import style from './index.module.less';
import cls from 'classnames';
export const MarketTableRows: React.FC = ({ row }: any) => {
  return (
    <TableRow
      className={style.row}
      sx={{
        height: 85,
        background: '#F7F9FA'
      }}
      hover
      //   onClick={(event) => handleClick(event, row.name)}
      tabIndex={-1}
      key={row.asset}
    >
      <TableCell className={style.cell} component="th" scope="row">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            style={{ width: 30, height: 30, marginRight: 8 }}
            src="https://static.okx.com/cdn/wallet/logo/okt.png"
          ></img>
          <span> {row.asset}</span>
        </div>
      </TableCell>
      <TableCell align="left">{row.totalDeposit}</TableCell>
      <TableCell align="left">{row.depositApr}</TableCell>
      <TableCell align="left">{row.totalLoan}</TableCell>
      <TableCell align="left">{row.loanApr}</TableCell>
      <TableCell align="left">{row.matchAmount}</TableCell>
      <TableCell className={style['last-cell']} align="left">
        <Button
          className={cls(style['button-l'], style.btn)}
          sx={{ mr: '12px', background: '#F98A6B' }}
          onClick={() => {
            //   todo
            //openDepositDialog
          }}
        >
          存款
        </Button>
        <Button
          className={cls(style['button-r'], style.btn)}
          sx={{ background: '#51459D' }}
          onClick={() => {
            //   todo
            //openBorrowDialog
          }}
        >
          借款
        </Button>
      </TableCell>
    </TableRow>
  );
};
