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
