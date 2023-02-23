import {
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  FormHelperText
} from '@mui/material';
import styles from './index.module.less';
import { CurrencyInfoProps } from '../hooks/useTradeDialog';

interface DialogInputType {
  currencyList: CurrencyInfoProps[];
  activeCurrency: string;
  onChangeActiveCurrency: (name: string) => void;
}

const DialogInput = ({
  currencyList,
  activeCurrency,
  onChangeActiveCurrency
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

  return (
    <FormControl>
      <div className={styles.input}>
        <div className={styles.top}>
          <input type="number" className={styles.number} placeholder="0.00" />
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
          <div className={styles.dolors}>$&nbsp;{0}</div>
          <div className={styles.info}>
            <div className={styles.balances}>余额&nbsp;{123.12345678}</div>
            <div className={styles.max}>Max</div>
          </div>
        </div>
      </div>
      <FormHelperText id="component-error-text" error={true}>
        {}
      </FormHelperText>
    </FormControl>
  );
};

export default DialogInput;
