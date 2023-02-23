import { useState } from 'react';
import { Button } from '@mui/material';
import TradeDialog from '@/components/TradeDialog';
import { DialogTypeProps } from '@/components/TradeDialog/hooks/useTradeDialog';

const Markets = () => {
  const [optimization, setOptimization] = useState<number>();
  const [aave, setAave] = useState<number>();
  const [compound, setCompound] = useState<number>();
  const [open, setOpen] = useState(false);
  const currencyList = [
    {
      icon: 'https://static.okx.com/cdn/assets/imgs/221/C25FE324914596B9.png',
      symbol: 'BTC'
    },
    {
      icon: 'https://static.okx.com/cdn/assets/imgs/221/5F33E3F751873296.png',
      symbol: 'ETH'
    },
    {
      icon: 'https://static.okx.com/cdn/announce/20220119/1642588815382f0fd4a29-ba95-4ba9-ab33-23c1258ce96a.png',
      symbol: 'OKB'
    },
    {
      icon: 'https://static.okx.com/cdn/assets/imgs/221/8EC634AF717771B6.png',
      symbol: 'LTC'
    },
    {
      icon: 'https://static.okx.com/cdn/assets/imgs/221/5F74EB20302D7761.png',
      symbol: 'USDT'
    }
  ];
  const [type, setType] = useState<DialogTypeProps>(DialogTypeProps.withdraw);
  const [depositAPRPercent, setDepositAPRPercent] = useState<string>();
  const [depositAmount, setDepositAmount] = useState<string | number>();
  const [borrowAPRPercent, setBorrowAPRPercent] = useState<string>();
  const [borrowAmount, setBorrowAmount] = useState<string | number>();
  const [outstandingLoan, setOutstandingLoan] = useState<string | number>();
  const [usedBorrowLimit, setUsedBorrowLimit] = useState<number>();
  const [liquidation, setLiquidation] = useState<number>();
  const [maxLTV, setMaxLTV] = useState<number>();
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
    setOptimization(0.06);
    setAave(0.05);
    setCompound(0.045);
    setDepositAPRPercent('10%');
    setDepositAmount(11.233656);
    setUsedBorrowLimit(0);
    setLiquidation(0.845);
  };

  const onClickRepay = () => {
    setOpen(true);
    setType(DialogTypeProps.repay);
    setOptimization(0.03);
    setAave(0.01);
    setCompound(0.045);
    setOutstandingLoan('121.12456');
    setUsedBorrowLimit(0.6);
    setLiquidation(0.845);
  };

  const onClickWithdraw = () => {
    setOpen(true);
    setType(DialogTypeProps.withdraw);
    setOptimization(0.06);
    setAave(0.15);
    setCompound(0.045);
    setDepositAPRPercent('10%');
    setDepositAmount(1.233656);
    setUsedBorrowLimit(0.6);
    setLiquidation(0.845);
  };

  const onClickBorrow = () => {
    setOpen(true);
    setType(DialogTypeProps.borrow);
    setOptimization(0.16);
    setAave(0.05);
    setCompound(0.015);
    setBorrowAPRPercent('7%');
    setBorrowAmount('121,212.122121');
    setUsedBorrowLimit(0.2);
    setLiquidation(0.845);
    setMaxLTV(0.8);
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
        optimization={optimization!}
        aave={aave!}
        compound={compound!}
        currencyList={currencyList}
        onChangeTab={onChangeTab}
        depositAPRPercent={depositAPRPercent}
        depositAmount={depositAmount}
        borrowAPRPercent={borrowAPRPercent}
        borrowAmount={borrowAmount}
        outstandingLoan={outstandingLoan}
        usedBorrowLimit={usedBorrowLimit}
        liquidation={liquidation}
        maxLTV={maxLTV}
        onChangeActiveCurrency={onChangeActiveCurrency}
        activeCurrency={activeCurrency}
      />
    </div>
  );
};

export default Markets;
