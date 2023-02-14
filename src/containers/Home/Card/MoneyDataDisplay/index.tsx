import * as React from 'react';
import useSWR from 'swr';
import { fetcher } from '@api/index';
import style from './index.module.less';
import cls from 'classnames';
import { styled, Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

const renderTips = ({ children }: any) => {
  return (
    <div
      style={{
        backgroundColor: '#424242',
        padding: '8px 12px',
        color: '#FFFFFF'
      }}
    >
      {children}
    </div>
  );
};
const MyTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }: any) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#424242',
    padding: '8px 12px',
    color: '#FFFFFF',
    maxWidth: 238
  }
}));
interface Props {
  totalMarket: string;
  matchTotalAmount: string;
  totalDepositAmount: string;
  totalLoanAmount: string;
}
const MoneyDataDisplay: React.FC<Props> = ({
  totalMarket,
  matchTotalAmount,
  totalDepositAmount,
  totalLoanAmount
}) => {
  return (
    <div className={cls(style.container)}>
      <div>
        <div className={cls(style['container-title'])}>市场总规模</div>
        <div>{totalMarket}</div>
      </div>
      <div>
        <div className={cls('flex items-center', style['container-title'])}>
          <span>内部撮合总金额</span>
          <MyTooltip
            style={{ marginLeft: 6 }}
            title={
              <div className={style['font-14']}>
                内部撮合金额为本平台的总存款金额 或总借款金额。本平台聚合多个借
                贷平台，将存款用户的存款存入到利息
                最高的平台，并为借款用户从利息最低
                的平台借款，为用户自动计算最优的 存款和借款策略。
              </div>
            }
            arrow
          >
            <ErrorOutlineOutlinedIcon
              sx={{
                width: '16px',
                height: '16px',
                color: '#929292',
                marginLeft: 7
              }}
            />
          </MyTooltip>
        </div>
        <div>{matchTotalAmount}</div>
      </div>
      <div>
        <div className={cls(style['container-title'])}>平台总存款金额</div>
        <div>{totalDepositAmount}</div>
      </div>
      <div>
        <div className={cls(style['container-title'])}>平台总借款金额</div>
        <div>{totalLoanAmount}</div>
      </div>
    </div>
  );
};

export default MoneyDataDisplay;
