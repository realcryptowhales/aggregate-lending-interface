import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import TradeDialog from '@/components/TradeDialog';
import { DialogTypeProps, openDialogProps } from '@/constant/type';

const Markets = () => {
  const [open, setOpen] = useState(false);
  const currencyList = [
    {
      icon: 'https://static.okx.com/cdn/assets/imgs/221/C25FE324914596B9.png',
      symbol: 'WBTC',
      optimization: 0.15, // number; // 内部撮合
      aave: 0.23, // number; // AAVE
      compound: 0.245, // number; // Compound
      outstandingLoan: 1222, // number | string | undefined; // 贷款余额
      borrowAPRPercent: '6%', // string | undefined; // 借款APR百分数
      borrowAmount: 124, // number | string | undefined; // 借款数量
      depositAPRPercent: '7%', // string | undefined; // 存款APR百分数
      depositAmount: 34, // number | string | undefined; // 存款余额
      maxLTV: 0.82, // number | undefined; // 最高抵押率
      liquidation: 0.85, // number | undefined; // 清算域值
      usedBorrowLimit: 0.6 // number | undefined; // 已用借款限额
    },
    {
      icon: 'https://static.okx.com/cdn/assets/imgs/221/5F33E3F751873296.png',
      symbol: 'WETH',
      optimization: 0.15, // number; // 内部撮合
      aave: 0.23, // number; // AAVE
      compound: 0.245, // number; // Compound
      outstandingLoan: 1222, // number | string | undefined; // 贷款余额
      borrowAPRPercent: '6%', // string | undefined; // 借款APR百分数
      borrowAmount: 124, // number | string | undefined; // 借款数量
      depositAPRPercent: '7%', // string | undefined; // 存款APR百分数
      depositAmount: 34, // number | string | undefined; // 存款余额
      maxLTV: 0.82, // number | undefined; // 最高抵押率
      liquidation: 0.85, // number | undefined; // 清算域值
      usedBorrowLimit: 0.6 // number | undefined; // 已用借款限额
    },
    {
      icon: 'https://static.okx.com/cdn/assets/imgs/221/8EC634AF717771B6.png',
      symbol: 'USDC',
      optimization: 0.15, // number; // 内部撮合
      aave: 0.23, // number; // AAVE
      compound: 0.245, // number; // Compound
      outstandingLoan: 1222, // number | string | undefined; // 贷款余额
      borrowAPRPercent: '6%', // string | undefined; // 借款APR百分数
      borrowAmount: 124, // number | string | undefined; // 借款数量
      depositAPRPercent: '7%', // string | undefined; // 存款APR百分数
      depositAmount: 34, // number | string | undefined; // 存款余额
      maxLTV: 0.82, // number | undefined; // 最高抵押率
      liquidation: 0.85, // number | undefined; // 清算域值
      usedBorrowLimit: 0.6 // number | undefined; // 已用借款限额
    },
    {
      icon: 'https://static.okx.com/cdn/assets/imgs/221/5F74EB20302D7761.png',
      symbol: 'USDT',
      optimization: 0.15, // number; // 内部撮合
      aave: 0.23, // number; // AAVE
      compound: 0.245, // number; // Compound
      outstandingLoan: 1222, // number | string | undefined; // 贷款余额
      borrowAPRPercent: '6%', // string | undefined; // 借款APR百分数
      borrowAmount: 124, // number | string | undefined; // 借款数量
      depositAPRPercent: '7%', // string | undefined; // 存款APR百分数 *
      depositAmount: 34, // number | string | undefined; // 存款余额 ? 在哪取
      maxLTV: 0.82, // number | undefined; // 最高抵押率
      liquidation: 0.85, // number | undefined; // 清算域值
      usedBorrowLimit: 0.6 // number | undefined; // 已用借款限额 ？
    }
  ];
  const [type, setType] = useState<DialogTypeProps>(DialogTypeProps.withdraw);
  const [activeCurrency, setActiveCurrency] = useState(currencyList[0]?.symbol);

  const onClose = () => {
    setOpen(false);
  };

  const onChangeTab = (dialogType: DialogTypeProps) => {
    switch (dialogType) {
      case DialogTypeProps.deposit:
        onClickDeposit();
        break;
      case DialogTypeProps.repay:
        onClickRepay();
        break;
      case DialogTypeProps.withdraw:
        onClickWithdraw();
        break;
      case DialogTypeProps.borrow:
        onClickBorrow();
        break;
      default:
        break;
    }
  };

  const onClickDeposit = () => {
    openDialog({ type: DialogTypeProps.deposit, activeCurrency: 'USDT' });
  };

  const onClickRepay = () => {
    setOpen(true);
    setType(DialogTypeProps.repay);
  };

  const onClickWithdraw = () => {
    setOpen(true);
    setType(DialogTypeProps.withdraw);
  };

  const onClickBorrow = () => {
    setOpen(true);
    setType(DialogTypeProps.borrow);
  };

  const onChangeActiveCurrency = (symbol: string) => {
    setActiveCurrency(symbol);
  };

  const openDialog = ({ type, activeCurrency }: openDialogProps) => {
    setOpen(true);
    setType(type);
    setActiveCurrency(activeCurrency);
  };

  useEffect(() => {
    window.aggregate = {
      openDialog: openDialog
    };
  }, []);

  return (
    <div>
      <Button variant="outlined" onClick={onClickDeposit}>
        deposit
      </Button>
      <Button variant="outlined" onClick={onClickRepay}>
        repay
      </Button>
      <Button variant="outlined" onClick={onClickWithdraw}>
        withdraw
      </Button>
      <Button variant="outlined" onClick={onClickBorrow}>
        borrow
      </Button>
      <TradeDialog
        open={open}
        onClose={onClose}
        type={type!}
        currencyDetailList={currencyList}
        onChangeActiveCurrency={onChangeActiveCurrency}
        activeCurrency={activeCurrency}
        onChangeTab={onChangeTab}
      />
    </div>
  );
};

export default Markets;
