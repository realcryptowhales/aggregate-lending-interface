export enum DialogTypeProps {
  withdraw,
  deposit,
  borrow,
  repay
}

export interface openDialogProps {
  type: DialogTypeProps;
  activeCurrency: string;
}
