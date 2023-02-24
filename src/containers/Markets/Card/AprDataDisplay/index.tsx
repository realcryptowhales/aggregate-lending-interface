import * as React from 'react';
import style from './index.module.less';
import cls from 'classnames';
interface Props {
  lendingPlatform: string;
  AggregationPlatform: string;
  aave: string;
  compound: string;
}
const AprDataDisplay: React.FC<Props> = ({
  lendingPlatform,
  AggregationPlatform,
  aave,
  compound
}) => {
  return (
    <div className={cls(style.container)}>
      <div className={cls(style.containerList)}>
        <div>借贷平台</div>
        <div style={{ color: '#929292' }}>{lendingPlatform}</div>
      </div>
      <div className={cls(style.containerList)}>
        <div>
          聚合平台
          <span className={cls(style.containerListBest)}>Best</span>
        </div>
        <div>{AggregationPlatform}</div>
      </div>
      <div className={cls(style.containerList)}>
        <div>AAVE</div>
        <div>{aave}</div>
      </div>
      <div className={cls(style.containerList)}>
        <div>Compound</div>
        <div>{compound}</div>
      </div>
    </div>
  );
};

export default AprDataDisplay;
