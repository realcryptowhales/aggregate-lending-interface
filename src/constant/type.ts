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
