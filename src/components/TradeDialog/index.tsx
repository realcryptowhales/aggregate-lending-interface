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
  InfosTopItemProps,
  AprInfoProps,
  DialogTypeProps
} from './hooks/useTradeDialog';

export interface TabItemProps {
  key: number;
  text: string;
}

export interface UseLendingDialogProps {
  currencyList: CurrencyInfoProps[];
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
}

export interface LendingDialogProps extends UseLendingDialogProps {
  open: boolean;
  onClose: () => void;
  onChangeTab: (dialogType: DialogTypeProps) => void;
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
  usedBorrowLimit
}: LendingDialogProps) {
  const {
    tabs,
    activeCurrency,
    onChangeActiveCurrency,
    infosTop,
    aprInfo,
    showMaxLTV,
    isOverLiquidation,
    maxLTVPercent,
    usedBorrowLimitPercent,
    liquidationPercent,
    willBecomeBorrowLimitPercent
  } = useTradeDialog({
    type,
    optimization,
    aave,
    compound,
    currencyList,
    outstandingLoan,
    borrowAPRPercent,
    borrowAmount,
    depositAPRPercent,
    depositAmount,
    maxLTV,
    liquidation,
    usedBorrowLimit
  });

  return (
    <Dialog onClose={onClose} open={open} maxWidth="xl">
      <div className={styles.title}>
        <Tabs activeTab={type} tabs={tabs} onChangeTab={onChangeTab} />
      </div>
      <div className={styles.content}>
        <section className={styles.left}>
          <DialogInput
            currencyList={currencyList}
            activeCurrency={activeCurrency}
            onChangeActiveCurrency={onChangeActiveCurrency}
          />
          <Tips />
          <UnAuth />
          <Buttons />
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
