import Button from '@mui/material/Button';
import { LoadingButton } from '@mui/lab';
import clsx from 'classnames';
import BN from 'bignumber.js';
import { DialogTypeProps, ButtonProps } from '@/constant/type';
import styles from './index.module.less';

function DepositButtons({
  activeCurrency,
  auth,
  formValue,
  onApprove,
  onDeposit
}: ButtonProps) {
  return (
    <div className={styles.buttons}>
      {!auth ? (
        <LoadingButton
          color="orange"
          variant="contained"
          loading={onApprove?.isLoading}
          className={styles.button}
          sx={{ marginRight: '16px' }}
          onClick={() => {
            onApprove?.write?.();
          }}
        >
          授权 {activeCurrency}
        </LoadingButton>
      ) : null}
      <LoadingButton
        variant="contained"
        className={clsx(styles.button, auth ? styles.lineButton : '')}
        color={auth ? 'orange' : 'gray'}
        disabled={!auth || !formValue.number}
        loading={onDeposit?.isLoading}
        onClick={() => {
          onDeposit?.write?.();
        }}
      >
        存款
      </LoadingButton>
    </div>
  );
}

function WithdrawButtons({
  isOverLiquidation,
  formValue,
  isHighRisk,
  onWithdraw
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
        onClick={() => {
          onWithdraw?.write?.();
        }}
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
  formValue,
  onChangeTab,
  onBorrow
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
        balance === '0' ? styles.shortBorrowButtonsMargin : '',
        BN(balance || '0').comparedTo(0) === 1 && isHighRisk
          ? styles.shortButtonsMargin
          : styles.buttonsMargin
      )}
    >
      <Button
        variant="contained"
        className={clsx(styles.button, styles.lineButton)}
        color="blue"
        disabled={!formValue.number && BN(balance || '0').comparedTo(0) === 1}
        onClick={() => {
          balance === '0'
            ? onChangeTab?.(DialogTypeProps.deposit)
            : onBorrow?.write?.();
        }}
      >
        {balance === '0' ? '去存款' : '借款'}
      </Button>
    </div>
  );
}

function RepayButtons({
  activeCurrency,
  auth,
  formValue,
  onRepay,
  onApprove
}: ButtonProps) {
  return (
    <div
      className={clsx(
        styles.buttons,
        auth ? styles.repayButtonsMargin : styles.shortButtonsMargin
      )}
    >
      {!auth ? (
        <LoadingButton
          color="blue"
          variant="contained"
          className={styles.button}
          sx={{ marginRight: '16px' }}
          loading={onApprove?.isLoading}
          onClick={() => {
            onApprove?.write?.();
          }}
        >
          授权 {activeCurrency}
        </LoadingButton>
      ) : null}
      <Button
        variant="contained"
        className={clsx(styles.button, auth ? styles.lineButton : '')}
        color={auth ? 'blue' : 'gray'}
        disabled={!auth || !formValue.number}
        onClick={() => {
          onRepay?.write?.();
        }}
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
  balance,
  onApprove,
  onDeposit,
  onWithdraw,
  onRepay,
  onBorrow,
  onChangeTab
}: ButtonProps) {
  switch (type) {
    case DialogTypeProps.deposit:
      return (
        <DepositButtons
          activeCurrency={activeCurrency}
          auth={auth}
          formValue={formValue}
          onApprove={onApprove}
          onDeposit={onDeposit}
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
          onWithdraw={onWithdraw}
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
          onBorrow={onBorrow}
          onChangeTab={onChangeTab}
        />
      );
      break;
    default:
      return (
        <RepayButtons
          activeCurrency={activeCurrency}
          auth={auth}
          formValue={formValue}
          onRepay={onRepay}
          onApprove={onApprove}
        />
      );
  }
}

export { DepositButtons, WithdrawButtons, BorrowButtons, RepayButtons };
