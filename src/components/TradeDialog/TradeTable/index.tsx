import { Fragment } from 'react';
import { Tooltip } from '@mui/material';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import clsx from 'classnames';
import BN from 'bignumber.js';
import { DialogTypeProps, InfosProps } from '@/constant/type';
import styles from './index.module.less';

function TradeTable({
  infosTop,
  aprInfo,
  totalLiquidationPercent,
  totalCurrentLTVPercent,
  willTotalCurrentLTVPercent,
  totalMaxLTVPercent,
  showMaxLTV,
  isOverLiquidation,
  type,
  formValue
}: InfosProps) {
  const { aprTitle, list } = aprInfo || {};
  const getPosition = (percent: string) => {
    return BN(percent.replace('%', '')).isLessThan(100) ? percent : '100%';
  };
  const maxLTVPercentPosition = getPosition(totalMaxLTVPercent);
  const liquidationPercentPosition = getPosition(totalLiquidationPercent);
  const willBecomeBorrowLimitPercentPosition = getPosition(
    willTotalCurrentLTVPercent
  );
  const usedBorrowLimitPercentPosition = getPosition(totalCurrentLTVPercent);
  return (
    <div className={styles.Infos}>
      <div className={styles.top}>
        {infosTop &&
          infosTop.map((item) => {
            const { title, value } = item;
            return (
              <div className={styles.item} key={title}>
                <div className={styles.title}>{title}</div>
                <div className={styles.value}>{value}</div>
              </div>
            );
          })}
      </div>
      <div className={styles.middle}>
        <div className={styles.limit}>
          <div className={styles.left}>
            <div className={styles.tip}>当前仓位抵押率</div>
            <Tooltip
              title={
                '如果您的贷款价值超过清算阈值，您提供的抵押品可能会被清算。'
              }
              arrow
              placement="top"
            >
              <ErrorOutlineRoundedIcon
                sx={{
                  fontSize: 16,
                  color: '#929292'
                }}
              />
            </Tooltip>
          </div>
          <div className={styles.num}>
            {totalCurrentLTVPercent}
            {formValue?.number ? (
              <div className={styles.willBecome}>
                &nbsp;
                <TrendingFlatIcon
                  sx={{
                    fontSize: 16,
                    color: '#000000'
                  }}
                />
                &nbsp;{willTotalCurrentLTVPercent}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <div
          className={clsx(
            styles.sliderContainer,
            showMaxLTV ? styles.showMaxLTVSliderContainer : ''
          )}
        >
          <div
            className={clsx(
              styles.sliderCurrent,
              styles.sliderBase,
              isOverLiquidation ? styles.redSlider : '',
              showMaxLTV ? styles.showMaxLTVSlider : ''
            )}
            style={{
              width: formValue?.number
                ? willBecomeBorrowLimitPercentPosition
                : usedBorrowLimitPercentPosition
            }}
          />
          {showMaxLTV ? (
            <Fragment>
              <div className={styles.sliderMaxLTVText}>MAX LTV</div>
              <div
                className={styles.sliderMaxLVTMark}
                style={{ left: maxLTVPercentPosition }}
              />
              <div
                className={styles.sliderMaxLTVValue}
                style={{ left: maxLTVPercentPosition }}
              >
                {totalMaxLTVPercent}
              </div>
            </Fragment>
          ) : null}
          <div
            className={clsx(
              styles.sliderLiquidationText,
              showMaxLTV ? styles.showMaxLTVSliderLiquidation : ''
            )}
          >
            Liquidation
          </div>
          <div
            className={clsx(
              styles.sliderLiquidationMark,
              showMaxLTV ? styles.showMaxLTVSlider : ''
            )}
            style={{ left: liquidationPercentPosition }}
          />
          <div
            className={clsx(
              styles.sliderLiquidationValue,
              showMaxLTV ? styles.showMaxLTVSliderLiquidation : ''
            )}
            style={{ left: liquidationPercentPosition }}
          >
            {totalLiquidationPercent}
          </div>
          <div
            className={clsx(
              styles.sliderBackground,
              styles.sliderBase,
              showMaxLTV ? styles.showMaxLTVSlider : ''
            )}
          />
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.apr}>{aprTitle}</div>
        <div className={styles.list}>
          {list &&
            list.map((item) => {
              const { title, value, isBest } = item;
              return (
                <div className={styles.listItem} key={title}>
                  <div className={styles.itemTitle}>
                    {title}
                    {isBest && <div className={styles.best}>Best</div>}
                  </div>
                  <div className={styles.itemValue}>{value}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default TradeTable;
