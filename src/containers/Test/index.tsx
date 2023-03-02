import { useState } from 'react';
import { Button } from '@mui/material';
import TradeDialog from '@/components/TradeDialog';
import { DialogTypeProps } from '@/components/TradeDialog/hooks/useTradeDialog';

const Markets = () => {
  const [open, setOpen] = useState(false);
  const currencyList = [
    {
      icon: 'https://static.okx.com/cdn/assets/imgs/221/C25FE324914596B9.png',
      symbol: 'BTC',
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
      symbol: 'ETH',
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
      icon: 'https://static.okx.com/cdn/announce/20220119/1642588815382f0fd4a29-ba95-4ba9-ab33-23c1258ce96a.png',
      symbol: 'OKB',
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
      symbol: 'LTC',
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
      depositAPRPercent: '7%', // string | undefined; // 存款APR百分数
      depositAmount: 34, // number | string | undefined; // 存款余额
      maxLTV: 0.82, // number | undefined; // 最高抵押率
      liquidation: 0.85, // number | undefined; // 清算域值
      usedBorrowLimit: 0.6 // number | undefined; // 已用借款限额
    }
  ];
  const [type, setType] = useState<DialogTypeProps>(DialogTypeProps.withdraw);
  const [depositAPRPercent, setDepositAPRPercent] = useState<string>();
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
    setOpen(true);
    setType(DialogTypeProps.deposit);
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
        currencyList={currencyList}
        onChangeActiveCurrency={onChangeActiveCurrency}
        activeCurrency={activeCurrency}
        onChangeTab={onChangeTab}
      />
    </div>
  );
};

export default Markets;
