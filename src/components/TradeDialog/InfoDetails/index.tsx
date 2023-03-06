import { Fragment } from 'react';
import UnAuth from './UnAuth';
import InfosOperation from './InfosOperation';
import Buttons from '../Buttons';
import Tips from '../Tips';
import { InfoDetailsProps } from '@/constant/type';

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
  onBorrow,
  onChangeTab
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
        onChangeTab={onChangeTab}
      />
    </Fragment>
  );
}

export default InfoDetails;
