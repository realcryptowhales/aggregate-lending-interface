import { Fragment } from 'react';
import UnAuth from './UnAuth';
import InfosOperation from './InfosOperation';
import Buttons from '../Buttons';
import Tips from '../Tips';
import { InfoDetailsProps } from '@/constant/type';

function InfoDetails({
  type,
  auth,
  activeCurrency,
  formValue,
  isHighRisk,
  isOverLiquidation,
  willTotalCurrentLTVPercent,
  balance,
  onApprove,
  onDeposit,
  onWithdraw,
  onRepay,
  onBorrow,
  onChangeTab,
  formStatus,
  handleFormChange,
  maxLTVPercent
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
          isOverLiquidation={isOverLiquidation}
          isHighRisk={isHighRisk}
          willTotalCurrentLTVPercent={willTotalCurrentLTVPercent}
          balance={balance}
          handleFormChange={handleFormChange}
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
        formStatus={formStatus}
      />
    </Fragment>
  );
}

export default InfoDetails;
