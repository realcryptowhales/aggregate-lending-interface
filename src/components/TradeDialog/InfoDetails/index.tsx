import { Fragment } from 'react';
import UnAuth from './UnAuth';
import InfosOperation from './InfosOperation';
import Buttons from '../Buttons';
import Tips from '../Tips';
import { DialogTypeProps } from '@/constant/type';
import { FormValuesProps } from '../hooks/useTradeDialog';

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
  balance?: number | string;
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
}

function InfoDetails({
  type,
  auth,
  maxLTVPercent,
  activeCurrency,
  formValue,
  handleFormChange,
  isHighRisk,
  isOverLiquidation,
  willBecomeBorrowLimitPercent,
  balance,
  onApprove,
  onDeposit,
  onWithdraw,
  onRepay,
  onBorrow
}: InfoDetailsProps) {
  return (
    <Fragment>
      <Tips type={type} />
      {!auth ? (
        <UnAuth type={type} />
      ) : (
        <InfosOperation
          type={type}
          maxLTVPercent={maxLTVPercent}
          formValue={formValue}
          handleFormChange={handleFormChange}
          isOverLiquidation={isOverLiquidation}
          isHighRisk={isHighRisk}
          willBecomeBorrowLimitPercent={willBecomeBorrowLimitPercent}
          balance={balance}
        />
      )}
      <Buttons
        activeCurrency={activeCurrency}
        type={type}
        auth={auth}
        formValue={formValue}
        isHighRisk={isHighRisk}
        isOverLiquidation={isOverLiquidation}
        balance={balance}
        onApprove={onApprove}
        onDeposit={onDeposit}
        onWithdraw={onWithdraw}
        onRepay={onRepay}
        onBorrow={onBorrow}
      />
    </Fragment>
  );
}

export default InfoDetails;
