import Button from '@mui/material/Button';
import clsx from 'classnames';
import { DialogTypeProps, FormValuesProps } from '../hooks/useTradeDialog';
import styles from './index.module.less';

interface ButtonProps {
  activeCurrency: string;
  auth: boolean;
  formValue: FormValuesProps;
  isHighRisk?: boolean;
  isOverLiquidation?: boolean;
  type?: DialogTypeProps;
  balance?: number | string;
}

function DepositButtons({ activeCurrency, auth, formValue }: ButtonProps) {
  return (
    <div className={styles.buttons}>
      {!auth ? (
        <Button
          color="orange"
          variant="contained"
          className={styles.button}
          sx={{ marginRight: '16px' }}
        >
          授权 {activeCurrency}
        </Button>
      ) : null}
      <Button
        variant="contained"
        className={clsx(styles.button, auth ? styles.lineButton : '')}
        color={auth ? 'orange' : 'gray'}
        disabled={!auth || !formValue.number}
      >
        存款
      </Button>
    </div>
  );
}

function WithdrawButtons({
  isOverLiquidation,
  formValue,
  isHighRisk
}: ButtonProps) {
  return (
    <div
      className={clsx(
        styles.buttons,
        isHighRisk ? styles.shortButtonsMargin : styles.buttonsMargin
      )}
    >
      <Button
        color="orange"
        variant="contained"
        className={clsx(styles.button, styles.lineButton)}
        disabled={!formValue.number || isOverLiquidation}
      >
        取款
      </Button>
    </div>
  );
}

function BorrowButtons({
  activeCurrency,
  balance,
  isHighRisk,
  isOverLiquidation,
  formValue
}: ButtonProps) {
  if (isOverLiquidation) {
    return (
      <div className={styles.shortButtonsMargin}>
        <Button
          variant="contained"
          className={clsx(styles.button, styles.lineButton)}
          disabled={true}
          color="gray"
        >
          抵押物不足
        </Button>
      </div>
    );
  }
  return (
    <div
      className={clsx(
        styles.buttons,
        Number(balance) === 0 ? styles.shortBorrowButtonsMargin : '',
        Number(balance) > 0 && isHighRisk
          ? styles.shortButtonsMargin
          : styles.buttonsMargin
      )}
    >
      <Button
        variant="contained"
        className={clsx(styles.button, styles.lineButton)}
        color="blue"
        disabled={!formValue.number && Number(balance) > 0}
      >
        {Number(balance) === 0 ? '去存款' : '借款'}
      </Button>
    </div>
  );
}

function RepayButtons({ activeCurrency, auth, formValue }: ButtonProps) {
  return (
    <div
      className={clsx(
        styles.buttons,
        auth ? styles.repayButtonsMargin : styles.shortButtonsMargin
      )}
    >
      {!auth ? (
        <Button
          color="blue"
          variant="contained"
          className={styles.button}
          sx={{ marginRight: '16px' }}
        >
          授权 {activeCurrency}
        </Button>
      ) : null}
      <Button
        variant="contained"
        className={clsx(styles.button, auth ? styles.lineButton : '')}
        color={auth ? 'blue' : 'gray'}
        disabled={!auth || !formValue.number}
      >
        还款
      </Button>
    </div>
  );
}

export default function Buttons({
  type,
  activeCurrency,
  auth,
  formValue,
  isHighRisk,
  isOverLiquidation,
  balance
}: ButtonProps) {
  switch (type) {
    case DialogTypeProps.deposit:
      return (
        <DepositButtons
          activeCurrency={activeCurrency}
          auth={auth}
          formValue={formValue}
        />
      );
      break;
    case DialogTypeProps.withdraw:
      return (
        <WithdrawButtons
          activeCurrency={activeCurrency}
          auth={auth}
          formValue={formValue}
          isHighRisk={isHighRisk}
          isOverLiquidation={isOverLiquidation}
        />
      );
      break;
    case DialogTypeProps.borrow:
      return (
        <BorrowButtons
          activeCurrency={activeCurrency}
          auth={auth}
          formValue={formValue}
          balance={balance}
          isHighRisk={isHighRisk}
          isOverLiquidation={isOverLiquidation}
        />
      );
      break;
    default:
      return (
        <RepayButtons
          activeCurrency={activeCurrency}
          auth={auth}
          formValue={formValue}
        />
      );
  }
}

export { DepositButtons, WithdrawButtons, BorrowButtons, RepayButtons };
