import Button from '@mui/material/Button';
import clsx from 'classnames';
import { DialogTypeProps } from '../hooks/useTradeDialog';
import styles from './index.module.less';

interface ButtonProps {
  activeCurrency: string;
}

interface ButtonsProps extends ButtonProps {
  type: DialogTypeProps;
}

function DepositButtons({ activeCurrency }: ButtonProps) {
  return (
    <div className={styles.buttons}>
      <Button
        color="orange"
        variant="contained"
        className={styles.button}
        sx={{ marginRight: '16px' }}
      >
        授权 {activeCurrency}
      </Button>
      <Button variant="contained" className={styles.button} color="gray">
        存款
      </Button>
    </div>
  );
}

function WithdrawButtons({ activeCurrency }: ButtonProps) {
  return (
    <div className={styles.buttons}>
      <Button
        color="orange"
        variant="contained"
        className={clsx(styles.button, styles.lineButton)}
      >
        取款
      </Button>
    </div>
  );
}

function BorrowButtons({ activeCurrency }: ButtonProps) {
  return (
    <div className={styles.buttons}>
      <Button
        variant="contained"
        className={clsx(styles.button, styles.lineButton)}
        color="blue"
      >
        借款
      </Button>
    </div>
  );
}

function RepayButtons({ activeCurrency }: ButtonProps) {
  return (
    <div className={styles.buttons}>
      <Button
        variant="contained"
        color="blue"
        className={styles.button}
        sx={{ marginRight: '16px' }}
      >
        授权 {activeCurrency}
      </Button>
      <Button variant="contained" className={styles.button} color="gray">
        还款
      </Button>
    </div>
  );
}

export default function Buttons({ type, activeCurrency }: ButtonsProps) {
  switch (type) {
    case DialogTypeProps.deposit:
      return <DepositButtons activeCurrency={activeCurrency} />;
      break;
    case DialogTypeProps.withdraw:
      return <WithdrawButtons activeCurrency={activeCurrency} />;
      break;
    case DialogTypeProps.borrow:
      return <BorrowButtons activeCurrency={activeCurrency} />;
      break;
    default:
      return <RepayButtons activeCurrency={activeCurrency} />;
  }
}

export { DepositButtons, WithdrawButtons, BorrowButtons, RepayButtons };
