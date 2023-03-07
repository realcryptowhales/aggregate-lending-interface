import { ReactNode } from 'react';
import { BigNumber } from 'ethers';

export enum DialogTypeProps {
  withdraw,
  deposit,
  borrow,
  repay
}

export interface OpenDialogProps {
  type: DialogTypeProps;
  activeCurrency: string;
}

export interface ContractsArgsProps {
  address: string;
  abi: any[];
  functionName: string;
  args?: any[];
}
export interface CurrencyBaseInfoProps {
  address: string;
  configId: number;
  decimal: number;
  gmtCreate: string;
  gmtModified: string;
  icon: string;
  name: string;
  symbol: string;
  index: number;
  collateralable: boolean;
  paused: boolean;
  sToken: string;
  dToken: string;
}

export interface CurrencyInfoProps {
  optimization?: string; // 内部撮合
  aave?: string; // AAVE
  compound?: string; // Compound
  borrowAPRPercent?: string; // 借款APR百分数
  borrowAmount?: string; // 借款数量
  depositAPRPercent?: string; // 存款APR百分数
  depositAmount?: string; // 存款余额
  maxLTV?: string; // 最高抵押率
  liquidation?: string; // 清算域值
  usedBorrowLimit?: string; // 已用借款限额
  assetPrice?: string;
  usingAsCollateral?: boolean;
}

export interface UseTradeDialogProps {
  type: DialogTypeProps;
  activeCurrency: string;
  // currencyDetailList: CurrencyInfoProps[];
}

export interface InfosTopItemProps {
  title: string;
  value: string | number;
}

export interface tabsItemProps {
  text: string;
  key: DialogTypeProps;
}

export interface AprItemProps {
  title: string;
  value: string;
  isBest?: boolean;
}

export interface AprInfoProps {
  aprTitle: string;
  list: AprItemProps[];
}

export interface FormValuesProps {
  number?: string;
  asCollateral: boolean;
}

export interface TipDialogProps {
  content?: ReactNode;
  title?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  buttonText?: string;
  open: boolean;
  viewDetailUrl?: string;
}

export interface SnackbarProps {
  open: boolean;
  onClose?: () => void;
  message?: string;
  viewDetailUrl?: string;
  type?: 'error' | 'info' | 'success' | 'warning';
}

export interface TabItemProps {
  key: number;
  text: string;
}

export interface TradeDialogProps extends UseTradeDialogProps {
  open: boolean;
  onClose: () => void;
  onChangeTab: (dialogType: DialogTypeProps) => void;
  onChangeActiveCurrency: (name: string) => void;
}

export interface ButtonProps {
  activeCurrency: string;
  auth: boolean;
  formValue: FormValuesProps;
  isHighRisk?: boolean;
  isOverLiquidation?: boolean;
  type?: DialogTypeProps;
  balance?: string;
  onApprove?: UseContractWriteProps;
  onDeposit?: UseContractWriteProps;
  onWithdraw?: UseContractWriteProps;
  onRepay?: UseContractWriteProps;
  onBorrow?: UseContractWriteProps;
  onChangeTab?: (dialogType: DialogTypeProps) => void;
}

export interface DialogInputType {
  currencyBaseInfoList?: CurrencyBaseInfoProps[];
  activeCurrency: string;
  onChangeActiveCurrency: (name: string) => void;
  formValue: FormValuesProps;
  handleInputChange: (obj: { [key: string]: any }) => void;
  balance?: string;
  dolors?: string;
  type: DialogTypeProps;
}

export interface UseContractWriteProps {
  data?: any;
  error?: Error | null;
  isError: boolean;
  isIdle: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  write: ((args?: any) => void) | undefined;
  writeAsync: ((args?: any) => Promise<any>) | undefined;
  reset: () => void;
  status: 'idle' | 'error' | 'loading' | 'success';
}

export interface InfoDetailsProps {
  type: DialogTypeProps;
  activeCurrency: string;
  balance?: string;
  auth: boolean;
  maxLTVPercent: string;
  formValue: FormValuesProps;
  handleFormChange: (obj: { [key: string]: any }) => void;
  isHighRisk: boolean;
  isOverLiquidation: boolean;
  willBecomeBorrowLimitPercent: string;
  onApprove?: UseContractWriteProps;
  onDeposit?: UseContractWriteProps;
  onWithdraw?: UseContractWriteProps;
  onRepay?: UseContractWriteProps;
  onBorrow?: UseContractWriteProps;
  onChangeTab?: (dialogType: DialogTypeProps) => void;
}

export interface OperationProps {
  maxLTVPercent?: string;
  formValue?: FormValuesProps;
  handleFormChange?: (obj: { [key: string]: any }) => void;
  isOverLiquidation?: boolean;
  type?: DialogTypeProps;
  isHighRisk?: boolean;
  willBecomeBorrowLimitPercent?: string;
  balance?: number | string;
}

export interface UnAuthProps {
  type: DialogTypeProps;
}

export interface TipProps {
  tabs?: TabItemProps[];
  activeTab?: DialogTypeProps;
  onChangeTab: (num: number) => void;
}

export interface TipsProps {
  type: DialogTypeProps;
}

export interface InfosProps {
  infosTop?: InfosTopItemProps[];
  aprInfo?: AprInfoProps;
  showMaxLTV: boolean;
  isOverLiquidation: boolean;
  maxLTVPercent: string;
  usedBorrowLimitPercent: string;
  liquidationPercent: string;
  willBecomeBorrowLimitPercent: string;
  type: DialogTypeProps;
  formValue: FormValuesProps;
}

export interface AssetProps {
  index: number;
  collateralable: boolean;
  paused: boolean;
  sToken: string;
  dToken: string;
  address: string;
}

export interface FormatCurrencyNumberProps {
  big?: BigNumber;
  decimal?: number;
}

export interface ParseUnitsProps {
  num?: string;
  decimal?: number;
}

export interface UseTradeContractProps {
  activeCurrencyBaseInfo?: CurrencyBaseInfoProps;
  formValue: FormValuesProps;
}
