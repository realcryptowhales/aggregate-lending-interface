import { Dialog, Snackbar, Alert } from '@mui/material';
import clsx from 'classnames';
import SmallDialog from '@/components/SmallDialog';
import Button from '@mui/material/Button';
import styles from './index.module.less';
import DialogInput from './DialogInput';
import InfoDetails from './InfoDetails';
import TradeTable from './TradeTable';
import Tabs from './Tabs';
import { TradeDialogProps } from '@/constant/type';
import useTradeDialog from './hooks/useTradeDialog';

function TradeDialog({
  type,
  open,
  onClose,
  onChangeTab,
  onChangeActiveCurrency,
  activeCurrency
}: TradeDialogProps) {
  const {
    tabs,
    infosTop,
    aprInfo,
    showMaxLTV,
    isOverLiquidation,
    maxLTVPercent,
    usedBorrowLimitPercent,
    liquidationPercent,
    willBecomeBorrowLimitPercent,
    formValue,
    handleFormChange,
    isHighRisk,
    balance,
    dolors,
    auth,
    onApprove,
    tipDialog,
    snackbar,
    onDeposit,
    onWithdraw,
    onRepay,
    onBorrow,
    currencyBaseInfoList,
    isAsCollateral,
    formStatus,
    setUsingAsCollateral
  } = useTradeDialog({
    type,
    activeCurrency
  });

  const onDialogClose = () => {
    handleFormChange({
      number: ''
    });
    onClose();
  };

  return (
    <Dialog onClose={onDialogClose} open={open} maxWidth="xl">
      <div className={styles.title}>
        <Tabs activeTab={type} tabs={tabs} onChangeTab={onChangeTab} />
      </div>
      <div className={styles.content}>
        <section className={styles.left}>
          <DialogInput
            type={type}
            balance={balance}
            formValue={formValue}
            handleInputChange={handleFormChange}
            currencyBaseInfoList={currencyBaseInfoList}
            activeCurrency={activeCurrency}
            dolors={dolors}
            formStatus={formStatus}
            onChangeActiveCurrency={onChangeActiveCurrency}
          />
          <InfoDetails
            balance={balance}
            type={type}
            activeCurrency={activeCurrency}
            isAsCollateral={isAsCollateral}
            maxLTVPercent={maxLTVPercent}
            isHighRisk={isHighRisk}
            isOverLiquidation={isOverLiquidation}
            formValue={formValue}
            willBecomeBorrowLimitPercent={willBecomeBorrowLimitPercent}
            auth={auth}
            onApprove={onApprove}
            onDeposit={onDeposit}
            onWithdraw={onWithdraw}
            onRepay={onRepay}
            onBorrow={onBorrow}
            onChangeTab={onChangeTab}
            formStatus={formStatus}
            setUsingAsCollateral={setUsingAsCollateral}
          />
        </section>
        <section className={styles.right}>
          <TradeTable
            type={type}
            infosTop={infosTop}
            aprInfo={aprInfo}
            formValue={formValue}
            showMaxLTV={showMaxLTV}
            isOverLiquidation={isOverLiquidation}
            maxLTVPercent={maxLTVPercent}
            usedBorrowLimitPercent={usedBorrowLimitPercent}
            liquidationPercent={liquidationPercent}
            willBecomeBorrowLimitPercent={willBecomeBorrowLimitPercent}
          />
        </section>
      </div>
      <SmallDialog
        open={tipDialog.open}
        handleClose={tipDialog?.onClose}
        title={tipDialog?.title}
        button={
          <div className={styles.dialogButtons}>
            {tipDialog?.cancelButtonText ? (
              <Button
                sx={{
                  color: '#000000'
                }}
                className={styles.dialogButton}
                onClick={tipDialog?.onCancel}
                variant="outlined"
              >
                {tipDialog?.cancelButtonText}
              </Button>
            ) : null}
            <Button
              sx={{
                background: '#000000',
                color: '#ffffff',
                '&:hover': { background: 'gray' }
              }}
              onClick={tipDialog?.onConfirm}
              className={clsx(
                tipDialog?.cancelButtonText
                  ? styles.dialogButton
                  : styles.longDialogButton
              )}
            >
              {tipDialog?.confirmButtonText}
            </Button>
          </div>
        }
        content={
          <div className={styles.tipDialogContent}>
            <div className={styles.tipDialogContentText}>
              {tipDialog?.content}
            </div>
            {tipDialog.viewDetailUrl ? (
              <a
                href={snackbar.viewDetailUrl}
                target="_blank"
                className={styles.viewUrl}
                rel="noreferrer"
              >
                查看详情
              </a>
            ) : null}
          </div>
        }
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={snackbar.onClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity={snackbar.type} sx={{ width: '100%' }}>
          <div className={styles.snackbarContent}>
            <div className={styles.snackbarText}>{snackbar.message}</div>
            {snackbar.viewDetailUrl ? (
              <a
                href={snackbar.viewDetailUrl}
                target="_blank"
                className={styles.viewUrl}
                rel="noreferrer"
              >
                查看详情
              </a>
            ) : null}
          </div>
        </Alert>
      </Snackbar>
    </Dialog>
  );
}

export default TradeDialog;
