import { Button, styled, Switch, TableCell, TableRow } from '@mui/material';
import style from './index.module.less';
import cls from 'classnames';
import classNames from 'classnames';
import { useState } from 'react';
import { border } from '@mui/system';
import { DepositData } from '..';
import { BorderButton } from '../BorrowTableRows';
import { useNavigate } from 'react-router-dom';
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
const BlueSwitch = styled(Switch)(({ theme }: any) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#51459D'
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#51459D'
  }
}));

export const PinkButton = styled(Button)({
  color: '#fff',
  lineHeight: '16px',
  textAlign: 'center',
  fontWeight: '400',
  fontSize: '14px',
  padding: '8px 24px',
  '&:hover': {
    backgroundColor: '#f98a6b',
    boxShadow: 'none'
  }
});

export const DepositTableRows = ({ row }: { row: DepositData }) => {
  const [ifChecked, setChecked] = useState(row.collateral);
  const {
    depositToken: { symbol }
  } = row;
  const navigate = useNavigate();
  return (
    <StyledTableRow
      sx={{
        height: 85,
        background: '#F7F9FA'
      }}
      hover
      onClick={() => {
        navigate(`/porfolio/${symbol}`);
      }}
      tabIndex={-1}
      key={row.depositToken.symbol}
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
            src={row.depositToken.logo}
          ></img>
          <div>
            <div className={style.name}> {row.depositToken.name}</div>

            <span className={style.font12}> {row.depositToken.symbol}</span>
          </div>
        </div>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 140 }}>
        <div>{row.depositAmount}</div>
        <span className={style.font12}>美元估值</span>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 163 }}>
        <div>{row.supplyApr}</div>
        <span className={style.font12}>APR组成</span>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 146 }}>
        <div>{row.availableBalance}</div>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 182 }}>
        <div>{row.dailyEstProfit}</div>
      </TableCell>
      <TableCell padding="none" align="left" sx={{ width: 254 }}>
        <BlueSwitch
          color="secondary"
          checked={ifChecked}
          onClick={() => {
            setChecked(!ifChecked);
          }}
        ></BlueSwitch>
      </TableCell>
      <TableCell padding="none" align="right">
        <div style={{ paddingRight: 16 }}>
          <PinkButton
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
          <BorderButton
            sx={{ border: '1px solid #000000', color: '#3D3E3E' }}
            onClick={(e: any) => {
              e.stopPropagation();

              //   todo
              //openBorrowDialog
            }}
          >
            取款
          </BorderButton>
        </div>
      </TableCell>
    </StyledTableRow>
  );
};
