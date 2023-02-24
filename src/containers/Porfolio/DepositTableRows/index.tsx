import {
  Button,
  styled,
  Switch,
  TableCell,
  TableRow,
  Tooltip
} from '@mui/material';
import style from './index.module.less';
import cls from 'classnames';
import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { border } from '@mui/system';
import { DepositData } from '..';
import { BorderButton } from '../BorrowTableRows';
import { useNavigate } from 'react-router-dom';
import { currencyList } from '@/constant';
import SmallDialog from '@/components/SmallDialog';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { readContracts } from 'wagmi';
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
  const { depositToken } = row;
  const [icon, symbol] = [
    currencyList[depositToken].icon,
    currencyList[depositToken].symbol
  ];
  const [collateralStatus, setCollateralStatus] = useState(row.collateral);
  const [openCollateralModalVisible, setOpenCollateralModalVisible] =
    useState(false);
  const [closeCollateralModalVisible, setCloseCollateralModalVisible] =
    useState(false);
  const collateralBtnAction = useCallback(() => {
    !collateralStatus && setOpenCollateralModalVisible(true);
    collateralStatus && setCloseCollateralModalVisible(true);
  }, [collateralStatus]);

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
          navigate(`/porfolio/${symbol}`);
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
            ></img>
            <div>
              <div className={style.name}> {symbol}</div>

              <span className={style.font12}> {symbol}</span>
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
            checked={collateralStatus}
            onClick={(e: any) => {
              e.stopPropagation();

              collateralBtnAction();
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
      <SmallDialog
        open={openCollateralModalVisible}
        handleClose={() => {
          setOpenCollateralModalVisible(false);
        }}
        title="开启抵押"
        button={
          <Button
            style={{
              width: '130px',
              height: '40px'
            }}
            sx={{
              background: '#000000',
              color: '#ffffff',
              '&:hover': { background: '#000000' }
            }}
            onClick={() => {
              //todo 上链 -> 切换按钮状态 成功后关闭
              setCollateralStatus(true);
              setOpenCollateralModalVisible(false);
            }}
          >
            Confirm
          </Button>
        }
        content={
          <div className="flex flex-col items-center justify-center min-w-85.75 min-h-47 text-3.5 leading-4">
            {`请确定以${symbol}作为抵押品 作为抵押品的资产可以用于借贷`}
          </div>
        }
      />
      <SmallDialog
        open={closeCollateralModalVisible}
        handleClose={() => {
          setCloseCollateralModalVisible(false);
        }}
        title="关闭抵押"
        button={
          <div className={cls('grow flex justify-center')}>
            <Button
              style={{
                width: '130px',
                height: '40px',
                marginRight: '20px'
              }}
              sx={{
                border: '1px solid #000000',
                background: '#ffffff',
                color: '#000000',
                '&:hover': { background: '#ffffff' }
              }}
              onClick={() => {
                //todo 上链 -> 切换按钮状态 成功后关闭
                setCollateralStatus(false);
                setCloseCollateralModalVisible(false);
              }}
            >
              关闭抵押
            </Button>
            <Button
              style={{
                width: '130px',
                height: '40px'
              }}
              sx={{
                background: '#000000',
                color: '#ffffff',
                '&:hover': { background: '#000000' }
              }}
              onClick={() => {
                setCloseCollateralModalVisible(false);
              }}
            >
              取 消
            </Button>
          </div>
        }
        content={
          <div className="flex flex-col items-center justify-center min-w-85.75 min-h-47 text-3.5 leading-4">
            <span>关闭按钮会增加您的资产清算风险，</span>
            <div>若需关闭，建议存入更多资产或归还部分借款</div>
          </div>
        }
      />
    </>
  );
};
