import { Dialog } from '@mui/material';
import styles from './index.module.less';
import DialogInput from './DialogInput';
import InfoDetails from './InfoDetails';
import TradeTable from './TradeTable';
import Tabs from './Tabs';
import useTradeDialog, {
  UseTradeDialogProps,
  DialogTypeProps
} from './hooks/useTradeDialog';

export interface TabItemProps {
  key: number;
  text: string;
}

export interface LendingDialogProps extends UseTradeDialogProps {
  open: boolean;
  onClose: () => void;
  onChangeTab: (dialogType: DialogTypeProps) => void;
  onChangeActiveCurrency: (name: string) => void;
}

function TradeDialog({
  type,
  open,
  currencyList,
  onClose,
  onChangeTab,
  onChangeActiveCurrency,
  activeCurrency
}: LendingDialogProps) {
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
    auth
  } = useTradeDialog({
    type,
    activeCurrency,
    currencyList
  });

  const onDialogClose = () => {
    handleFormChange({
      number: '',
      asCollateral: true
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
            currencyList={currencyList}
            activeCurrency={activeCurrency}
            dolors={dolors}
            onChangeActiveCurrency={onChangeActiveCurrency}
          />
          <InfoDetails
            balance={balance}
            type={type}
            activeCurrency={activeCurrency}
            maxLTVPercent={maxLTVPercent}
            isHighRisk={isHighRisk}
            isOverLiquidation={isOverLiquidation}
            formValue={formValue}
            willBecomeBorrowLimitPercent={willBecomeBorrowLimitPercent}
            handleFormChange={handleFormChange}
            auth={auth}
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
    </Dialog>
  );
}

export default TradeDialog;
