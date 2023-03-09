import * as React from 'react';
import style from './index.module.less';
import cls from 'classnames';
interface Props {
  lendingPlatform: string;
  AggregationPlatform: string;
  aave: string;
  compound: string;
  bestApr: string;
}
const AprDataDisplay: React.FC<Props> = ({
  lendingPlatform,
  AggregationPlatform,
  aave,
  compound,
  bestApr
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
          {bestApr === '聚合平台' && (
            <span className={cls(style.containerListBest)}>Best</span>
          )}
        </div>
        <div>{AggregationPlatform}</div>
      </div>
      <div className={cls(style.containerList)}>
        <div>
          AAVE
          {bestApr === 'AAVE' && (
            <span className={cls(style.containerListBest)}>Best</span>
          )}
        </div>
        <div>{aave}</div>
      </div>
      <div className={cls(style.containerList)}>
        <div>
          Compound
          {bestApr === 'Compound' && (
            <span className={cls(style.containerListBest)}>Best</span>
          )}
        </div>
        <div>{compound}</div>
      </div>
    </div>
  );
};

export default AprDataDisplay;
