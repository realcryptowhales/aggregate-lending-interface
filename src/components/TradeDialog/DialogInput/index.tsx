// import { useEffect } from 'react';
import {
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  FormHelperText
} from '@mui/material';
// import { useFormContext } from '@mui/material/FormControl';
import styles from './index.module.less';
import { CurrencyInfoProps } from '../hooks/useTradeDialog';

interface DialogInputType {
  currencyList: CurrencyInfoProps[];
  activeCurrency: string;
  onChangeActiveCurrency: (name: string) => void;
  formValue: {
    number: number | string;
  };
  handleInputChange: (value: number | string) => void;
  balance?: number | string;
  dolors?: number | string;
}

const DialogInput = ({
  currencyList,
  activeCurrency,
  onChangeActiveCurrency,
  formValue,
  handleInputChange,
  balance,
  dolors
}: DialogInputType) => {
  const onChange = (e: SelectChangeEvent) => {
    onChangeActiveCurrency(e.target.value);
  };

  const getRenderValue = (value: any) => {
    const item = currencyList.find((currency) => {
      return currency.symbol === value;
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
    handleInputChange(e.target.value);
  };

  const onClickMax = () => {
    handleInputChange(balance || 0);
  };

  return (
    <form>
      <FormControl>
        <div className={styles.input}>
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
              {currencyList &&
                currencyList.map((item) => {
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
              <div className={styles.balances}>余额&nbsp;{balance}</div>
              <div className={styles.max} onClick={onClickMax}>
                Max
              </div>
            </div>
          </div>
        </div>
        <FormHelperText id="component-error-text" error={true}>
          {}
        </FormHelperText>
      </FormControl>
    </form>
  );
};

export default DialogInput;
