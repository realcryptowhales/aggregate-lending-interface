import { Fragment } from 'react';
import UnAuth from './UnAuth';
import InfosOperation from './InfosOperation';
import Buttons from '../Buttons';
import Tips from '../Tips';
import { DialogTypeProps, FormValuesProps } from '../hooks/useTradeDialog';

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
  balance
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
      />
    </Fragment>
  );
}

export default InfoDetails;
