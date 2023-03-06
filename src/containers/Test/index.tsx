import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import TradeDialog from '@/components/TradeDialog';
import { DialogTypeProps, OpenDialogProps } from '@/constant/type';

const Markets = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<DialogTypeProps>(DialogTypeProps.withdraw);
  const [activeCurrency, setActiveCurrency] = useState('USDT');

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

  const openDialog = ({ type, activeCurrency }: OpenDialogProps) => {
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
        type={type}
        onChangeActiveCurrency={onChangeActiveCurrency}
        activeCurrency={activeCurrency}
        onChangeTab={onChangeTab}
      />
    </div>
  );
};

export default Markets;
