import { Fragment } from 'react';
import { Tooltip } from '@mui/material';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import clsx from 'classnames';
import {
  InfosTopItemProps,
  AprInfoProps,
  DialogTypeProps,
  FormValuesProps
} from '../hooks/useTradeDialog';
import styles from './index.module.less';

interface InfosProps {
  infosTop?: InfosTopItemProps[];
  aprInfo?: AprInfoProps;
  showMaxLTV: boolean;
  isOverLiquidation: boolean;
  maxLTVPercent: string;
  usedBorrowLimitPercent: string;
  liquidationPercent: string;
  willBecomeBorrowLimitPercent: string;
  type: DialogTypeProps;
  formValue: FormValuesProps;
}

function Infos({
  infosTop,
  aprInfo,
  liquidationPercent,
  usedBorrowLimitPercent,
  maxLTVPercent,
  showMaxLTV,
  isOverLiquidation,
  willBecomeBorrowLimitPercent,
  type,
  formValue
}: InfosProps) {
  // const limit = '40%';
  // const max = "87.5%";
  console.log('isOverLiquidation', isOverLiquidation);
  const { aprTitle, list } = aprInfo || {};
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
            <div className={styles.tip}>已用借款限额</div>
            <Tooltip
              title="已用借款限额代表你已用的最大借款 金额占你存入的质押品的价值占比。 如你的已用借款限额超过整体清算 阀值，你的资产可能会被清算。"
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
            {usedBorrowLimitPercent}
            {type !== DialogTypeProps.deposit && formValue?.number ? (
              <div className={styles.willBecome}>
                &nbsp;
                <TrendingFlatIcon
                  sx={{
                    fontSize: 16,
                    color: '#000000'
                  }}
                />
                &nbsp;{willBecomeBorrowLimitPercent}
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
              width:
                type !== DialogTypeProps.deposit && formValue?.number
                  ? willBecomeBorrowLimitPercent
                  : usedBorrowLimitPercent
            }}
          />
          {showMaxLTV ? (
            <Fragment>
              <div className={styles.sliderMaxLTVText}>MAX LTV</div>
              <div
                className={styles.sliderMaxLVTMark}
                style={{ left: maxLTVPercent }}
              />
              <div
                className={styles.sliderMaxLTVValue}
                style={{ left: maxLTVPercent }}
              >
                {maxLTVPercent}
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
            style={{ left: liquidationPercent }}
          />
          <div
            className={clsx(
              styles.sliderLiquidationValue,
              showMaxLTV ? styles.showMaxLTVSliderLiquidation : ''
            )}
            style={{ left: liquidationPercent }}
          >
            {liquidationPercent}
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

export default Infos;
