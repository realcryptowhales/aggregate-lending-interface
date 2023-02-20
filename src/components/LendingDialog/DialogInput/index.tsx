import { Input, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import styles from './index.module.less';
import { currencyInfo } from '../hooks/useLendingDialog';

interface DialogInputType {
  currencyList: currencyInfo[];
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

  return (
    <div className={styles.input}>
      <div className={styles.top}>
        <Input disableUnderline={true} type="number" />
        <Select value={activeCurrency} onChange={onChange}>
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
    </div>
  );
};

export default DialogInput;
