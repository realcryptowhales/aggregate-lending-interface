import { Dialog } from '@mui/material';
import styles from './index.module.less';
import DialogInput from './DialogInput';
import UnAuth from './UnAuth';
import Buttons from './Buttons';
import Infos from './Infos';
import Tips from './Tips';
import Tabs from './Tabs';
import useTradeDialog, {
  CurrencyInfoProps,
  // InfosTopItemProps,
  // AprInfoProps,
  DialogTypeProps
} from './hooks/useTradeDialog';

export interface TabItemProps {
  key: number;
  text: string;
}

export interface UseLendingDialogProps {
  type: DialogTypeProps;
  optimization: number;
  aave: number;
  compound: number;
  outstandingLoan?: number | string; // 贷款余额
  borrowAPRPercent?: string; // 借款APR百分数
  borrowAmount?: number | string; // 借款数量
  depositAPRPercent?: string; // 存款APR百分数
  depositAmount?: number | string; // 存款余额
  maxLTV?: number; // 最高抵押率
  liquidation?: number; // 清算域值
  usedBorrowLimit?: number; // 已用借款限额
  activeCurrency: string;
}

export interface LendingDialogProps extends UseLendingDialogProps {
  open: boolean;
  currencyList: CurrencyInfoProps[];
  onClose: () => void;
  onChangeTab: (dialogType: DialogTypeProps) => void;
  onChangeActiveCurrency: (name: string) => void;
}

function LendingDialog({
  type,
  open,
  currencyList,
  optimization,
  aave,
  compound,
  onClose,
  onChangeTab,
  outstandingLoan,
  borrowAPRPercent,
  borrowAmount,
  depositAPRPercent,
  depositAmount,
  maxLTV,
  liquidation,
  usedBorrowLimit,
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
    formValues,
    handleInputChange,
    balance,
    dolors
  } = useTradeDialog({
    type,
    optimization,
    aave,
    compound,
    outstandingLoan,
    borrowAPRPercent,
    borrowAmount,
    depositAPRPercent,
    depositAmount,
    maxLTV,
    liquidation,
    usedBorrowLimit,
    activeCurrency
  });

  const onDialogClose = () => {
    handleInputChange('');
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
            balance={balance}
            formValue={formValues}
            handleInputChange={handleInputChange}
            currencyList={currencyList}
            activeCurrency={activeCurrency}
            dolors={dolors}
            onChangeActiveCurrency={onChangeActiveCurrency}
          />
          <Tips />
          <UnAuth />
          <Buttons activeCurrency={activeCurrency} type={type} />
        </section>
        <section className={styles.right}>
          <Infos
            infosTop={infosTop}
            aprInfo={aprInfo}
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

export default LendingDialog;
