import { Button, styled, Switch, TableCell, TableRow } from '@mui/material';
import style from './index.module.less';
import cls from 'classnames';
import { useCallback, useState } from 'react';
import { DepositData } from '..';
import { useNavigate } from 'react-router-dom';
import SmallDialog from '@/components/SmallDialog';
import { observer } from 'mobx-react-lite';
import { formatUnits } from 'ethers/lib/utils.js';
import {
  formatPercent,
  rawToPercent,
  rawToThousandCurrency,
  rawToThousandNumber,
  thousandCurrency,
  thousandNumber
} from '@/utils/format';
import { useStore } from '@/stores';
import { BorderButton } from '../BorrowTableRows';
import { DialogTypeProps } from '@/constant/type';
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

export const DepositTableRows = observer(
  ({
    row,
    openCollateralModal
  }: {
    row: DepositData;
    openCollateralModal: (
      symbol: string,
      address: string,
      action: string
    ) => void;
  }) => {
    const {
      underlying,
      depositValue,
      depositApr,
      availableBalance,
      dailyEstProfit,
      collateral,
      depositAmount,
      matchedSupplyPercentage,
      protocolSupplyPercentage
    } = row;
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
    if (symbol === 'WETH') {
      console.log('collateral', collateral);
    }
    const navigate = useNavigate();

    return (
      <>
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
            <div>{thousandNumber(depositAmount, 4)}</div>
            <span className={style.font12}>
              {thousandCurrency(depositValue)}
            </span>
          </TableCell>
          <TableCell padding="none" align="left" sx={{ width: 185 }}>
            <div>{formatPercent(depositApr)}</div>
            <span className={style.font12}>
              {`(${formatPercent(matchedSupplyPercentage)}撮合+${formatPercent(
                protocolSupplyPercentage
              )}底层协议)`}
            </span>
          </TableCell>
          <TableCell padding="none" align="left" sx={{ width: 146 }}>
            <div>{thousandNumber(availableBalance, 4)}</div>
          </TableCell>
          <TableCell padding="none" align="left" sx={{ width: 182 }}>
            <div>{thousandCurrency(dailyEstProfit)}</div>
          </TableCell>
          <TableCell padding="none" align="left" sx={{ width: 232 }}>
            <BlueSwitch
              color="secondary"
              checked={collateral}
              onClick={(e: any) => {
                e.stopPropagation();
                openCollateralModal(
                  symbol,
                  underlying,
                  collateral ? 'closeCollateral' : 'openCollateral'
                );
                // collateralBtnAction();
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
                  window.aggregate.openDialog({
                    type: DialogTypeProps.deposit,
                    activeCurrency: symbol
                  });
                }}
              >
                存款
              </PinkButton>
              <BorderButton
                sx={{ border: '1px solid #000000', color: '#3D3E3E' }}
                onClick={(e: any) => {
                  e.stopPropagation();

                  window.aggregate.openDialog({
                    type: DialogTypeProps.withdraw,
                    activeCurrency: symbol
                  });
                }}
              >
                取款
              </BorderButton>
            </div>
          </TableCell>
        </StyledTableRow>
      </>
    );
  }
);
