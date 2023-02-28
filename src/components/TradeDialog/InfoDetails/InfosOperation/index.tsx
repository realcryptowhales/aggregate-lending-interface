import React from 'react';
import { Switch, Tooltip } from '@mui/material';
import clsx from 'classnames';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { DialogTypeProps, FormValuesProps } from '../../hooks/useTradeDialog';
import styles from './index.module.less';

interface OperationProps {
  maxLTVPercent?: string;
  formValue?: FormValuesProps;
  handleFormChange?: (obj: { [key: string]: any }) => void;
  isOverLiquidation?: boolean;
  type?: DialogTypeProps;
  isHighRisk?: boolean;
  willBecomeBorrowLimitPercent?: string;
  balance?: number | string;
}

// interface InfosDepositOperation {
//   maxLTVPercent?: string;
//   formValue: FormValuesProps;
//   handleFormChange: (obj: { [key: string]: any }) => void;
// }

const InfosDepositOperation = ({
  maxLTVPercent,
  formValue,
  handleFormChange
}: OperationProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFormChange &&
      handleFormChange({ asCollateral: event.target.checked });
  };

  return (
    <div className={styles.infosOperation}>
      <div className={styles.operationItem}>
        <div className={clsx(styles.itemText, styles.blackTitle)}>
          作为抵押物
          <Tooltip
            title="用作抵押品的每项资产都会增加你的借款限额。"
            arrow
            placement="top"
          >
            <ErrorOutlineRoundedIcon
              sx={{
                fontSize: 19,
                marginLeft: '6px',
                color: '#000000'
              }}
            />
          </Tooltip>
        </div>
        <Switch checked={formValue?.asCollateral} onChange={handleChange} />
      </div>
      <div className={styles.operationItem}>
        <div className={styles.itemText}>最高抵押率</div>
        <div className={styles.itemText}>{maxLTVPercent}</div>
      </div>
    </div>
  );
};

const InfosWithdrawOperation = ({
  isOverLiquidation,
  isHighRisk,
  formValue,
  willBecomeBorrowLimitPercent
}: OperationProps) => {
  console.log(formValue?.number, isOverLiquidation, isHighRisk);
  if (formValue?.number && isOverLiquidation) {
    return (
      <div className={styles.commonTip}>
        <ErrorOutlineRoundedIcon
          sx={{
            fontSize: 16,
            marginRight: '8px',
            color: '#51459D'
          }}
        />
        无法提取此金额，因为你将会触碰清算阀值，导致你的持仓被清算。
      </div>
    );
  }
  if (formValue?.number && isHighRisk) {
    return (
      <div className={styles.commonTip}>
        <ErrorOutlineRoundedIcon
          sx={{
            fontSize: 16,
            marginRight: '8px',
            color: '#51459D'
          }}
        />
        取款后已用借款限额为{willBecomeBorrowLimitPercent}
        ，清算风险较高，请合理规划取款额或增加抵押物。
      </div>
    );
  }
  return null;
};

const InfosBorrowOperation = ({
  isOverLiquidation,
  isHighRisk,
  formValue,
  willBecomeBorrowLimitPercent,
  balance
}: OperationProps) => {
  if (Number(balance) === 0) {
    return (
      <div className={styles.borrowTip}>
        <div>借款限额不足</div>
        <div className={styles.borrowBottomTip}>
          存入并开启抵押资产，可增加借款限额
          <ErrorOutlineRoundedIcon
            sx={{
              fontSize: 20,
              marginLeft: '4px',
              color: '#000000'
            }}
          />
        </div>
      </div>
    );
  }
  if (formValue?.number && isOverLiquidation) {
    return (
      <div className={styles.commonTip}>
        <ErrorOutlineRoundedIcon
          sx={{
            fontSize: 16,
            marginRight: '8px',
            color: '#51459D'
          }}
        />
        借款后已用借款限额为&nbsp;{willBecomeBorrowLimitPercent}
        ，抵物不足，请降低借款额或者抵押更多资产。
      </div>
    );
  }
  if (formValue?.number && isHighRisk) {
    return (
      <div className={styles.commonTip}>
        <ErrorOutlineRoundedIcon
          sx={{
            fontSize: 16,
            marginRight: '8px',
            color: '#51459D'
          }}
        />
        借款后已用借款限额为{willBecomeBorrowLimitPercent}
        ，清算风险较高，请合理规划借款额或增加抵押物。
      </div>
    );
  }
  return null;
};

function InfosOperation({
  type,
  maxLTVPercent,
  formValue,
  handleFormChange,
  isOverLiquidation,
  isHighRisk,
  willBecomeBorrowLimitPercent,
  balance
}: OperationProps) {
  switch (type) {
    case DialogTypeProps.deposit:
      return (
        <InfosDepositOperation
          maxLTVPercent={maxLTVPercent}
          formValue={formValue}
          handleFormChange={handleFormChange}
        />
      );
      break;
    case DialogTypeProps.withdraw:
      return (
        <InfosWithdrawOperation
          isOverLiquidation={isOverLiquidation}
          isHighRisk={isHighRisk}
          formValue={formValue}
          willBecomeBorrowLimitPercent={willBecomeBorrowLimitPercent}
        />
      );
      break;
    case DialogTypeProps.borrow:
      return (
        <InfosBorrowOperation
          isOverLiquidation={isOverLiquidation}
          isHighRisk={isHighRisk}
          formValue={formValue}
          willBecomeBorrowLimitPercent={willBecomeBorrowLimitPercent}
          balance={balance}
        />
      );
      break;
    default:
      return null;
  }
}

export default InfosOperation;
