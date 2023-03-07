import { styled, TableCell, TableRow } from '@mui/material';
import style from './index.module.less';
import cls from 'classnames';
import { LiquidationData } from '..';
import { formatAddr } from '@/utils';
import { formatDate, thousandNumber } from '@/utils/format';
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
    gmtCreate,
    redeemTokenSymbol,
    redeemTokenIcon,
    redeemTokenName,
    redeemAmount,
    repayedTokenIcon,
    repayedTokenName,
    repayedTokenSymbol,
    repayedAmount,

    liquidateRewardRatio,
    liquidator,
    transactionHash
  } = row;
  // console.log('row', row);
  return (
    <StyledTableRow
      sx={{
        height: 85,
        background: '#F7F9FA'
      }}
      hover
      tabIndex={-1}
      key={gmtCreate}
      className={cls('cursor-pointer', style.row)}
    >
      <TableCell
        padding="normal"
        align="left"
        sx={{ width: 142 }}
        component="th"
      >
        <div>{formatDate(gmtCreate)}</div>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 118 }}>
        清算
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 152 }}>
        <div className={cls('flex items-center')}>
          <img
            style={{ width: 31, height: 30, marginRight: 10 }}
            src={redeemTokenIcon}
            alt={redeemTokenSymbol}
          />
          <div>
            <div>{redeemTokenSymbol}</div>
            <div className={style.font12}>{redeemTokenName}</div>
          </div>
        </div>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 152 }}>
        {thousandNumber(redeemAmount, 4)}
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 152 }}>
        <div className={cls('flex items-center')}>
          <img
            style={{ width: 31, height: 30, marginRight: 10 }}
            src={repayedTokenIcon}
            alt={repayedTokenSymbol}
          />
          <div>
            <div>{repayedTokenSymbol}</div>
            <div className={style.font12}>{repayedTokenName}</div>
          </div>
        </div>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 152 }}>
        <div>{thousandNumber(repayedAmount, 4)}</div>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 86 }}>
        <div>{`${liquidateRewardRatio}%`}</div>
      </TableCell>

      <TableCell padding="none" align="left" sx={{ width: 151 }}>
        <div style={{ color: '#0032D3' }}>{formatAddr(liquidator)}</div>
      </TableCell>
      <TableCell padding="none" align="left">
        <div
          style={{ paddingRight: 16, color: '#0032D3' }}
          onClick={() => {
            window.open(`https://www.oklink.com/okc/tx/${transactionHash}`);
          }}
        >
          查看详情
        </div>
      </TableCell>
    </StyledTableRow>
  );
};
