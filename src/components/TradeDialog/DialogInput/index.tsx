import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import clsx from 'classnames';
import styles from './index.module.less';
import { DialogTypeProps, DialogInputType } from '@/constant/type';

const DialogInput = ({
  currencyBaseInfoList,
  activeCurrency,
  onChangeActiveCurrency,
  formValue,
  handleInputChange,
  balance,
  dolors,
  type,
  formStatus
}: DialogInputType) => {
  const { isError, errorMsg, isTip } = formStatus;

  const onChange = (e: SelectChangeEvent) => {
    onChangeActiveCurrency(e.target.value);
  };

  const getRenderValue = (value: any) => {
    const item =
      currencyBaseInfoList &&
      currencyBaseInfoList.find((currency) => {
        return currency?.symbol?.toLowerCase() === value.toLowerCase();
      });
    const { symbol, icon } = item || {};
    return (
      <div className={styles.render}>
        <img src={icon} alt={symbol} className={styles.img} />
        <span className={styles.symbol}>{symbol}</span>
      </div>
    );
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange({
      number: e.target.value
        .replaceAll(/[^\d.-]/g, '')
        .replace(/^(-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3')
    });
  };

  const onClickMax = () => {
    handleInputChange({ number: balance || '0' });
  };

  const OperationText = () => {
    switch (type) {
      case DialogTypeProps.withdraw:
        return (
          <div className={styles.info}>
            <div className={styles.balances}>
              可取数量&nbsp;{balance !== '' ? balance : '--'}
            </div>
            <div className={styles.max} onClick={onClickMax}>
              Max
            </div>
          </div>
        );
      case DialogTypeProps.borrow:
        return (
          <div className={styles.info}>
            <div className={styles.balances}>
              可借数量&nbsp;{balance !== '' ? balance : '--'}
            </div>
            <div className={styles.max} onClick={onClickMax}>
              Max
            </div>
          </div>
        );
      default:
        return (
          <div className={styles.info}>
            <div className={styles.balances}>
              余额&nbsp;{balance !== '' ? balance : '--'}
            </div>
            <div className={styles.max} onClick={onClickMax}>
              Max
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      <div className={clsx(styles.input, isError ? styles.errorInput : '')}>
        <div className={styles.top}>
          <input
            type="number"
            name="number"
            className={styles.number}
            placeholder="0.00"
            value={formValue?.number}
            onChange={onInputChange}
          />
          <Select
            value={activeCurrency}
            onChange={onChange}
            className={styles.select}
            renderValue={getRenderValue}
          >
            {currencyBaseInfoList &&
              currencyBaseInfoList.map((item) => {
                const { symbol, icon } = item;
                return (
                  <MenuItem value={symbol} key={symbol}>
                    <img src={icon} alt={symbol} className={styles.img} />
                    <span className={styles.symbol}>{symbol}</span>
                  </MenuItem>
                );
              })}
          </Select>
        </div>
        <div className={styles.bottom}>
          <div className={styles.dolors}>$&nbsp;{dolors}</div>
          <div className={styles.info}>
            <OperationText />
          </div>
        </div>
      </div>
      {isError || isTip ? (
        <div className={isTip ? styles.tipMsg : styles.errorMsg}>
          {errorMsg}
        </div>
      ) : null}
    </div>
  );
};

export default DialogInput;
