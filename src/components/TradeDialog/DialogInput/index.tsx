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
import { DialogTypeProps } from '@/constant/type';
import { CurrencyInfoProps, FormValuesProps } from '../hooks/useTradeDialog';

interface DialogInputType {
  // currencyDetailList: CurrencyInfoProps[];
  activeCurrency: string;
  onChangeActiveCurrency: (name: string) => void;
  formValue: FormValuesProps;
  handleInputChange: (obj: { [key: string]: any }) => void;
  balance?: number;
  dolors?: number;
  type: DialogTypeProps;
}

const DialogInput = ({
  // currencyDetailList,
  activeCurrency,
  onChangeActiveCurrency,
  formValue,
  handleInputChange,
  balance,
  dolors,
  type
}: DialogInputType) => {
  const onChange = (e: SelectChangeEvent) => {
    onChangeActiveCurrency(e.target.value);
  };

  const getRenderValue = (value: any) => {
    // const item = currencyDetailList.find((currency) => {
    //   return currency.symbol === value;
    // });
    const item = {
      symbol: 'USDT',
      icon: ''
    };
    const { symbol, icon } = item || {};
    return (
      <div className={styles.render}>
        <img src={icon} alt={symbol} className={styles.img} />
        <span className={styles.symbol}>{symbol}</span>
      </div>
    );
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange({ number: e.target.value });
  };

  const onClickMax = () => {
    handleInputChange({ number: balance || 0 });
  };

  const OperationText = () => {
    switch (type) {
      case DialogTypeProps.withdraw:
        return (
          <div className={styles.info}>
            <div className={styles.balances}>可取数量&nbsp;{balance}</div>
            <div className={styles.max} onClick={onClickMax}>
              Max
            </div>
          </div>
        );
      case DialogTypeProps.borrow:
        return (
          <div className={styles.info}>
            <div className={styles.balances}>可借数量&nbsp;{balance}</div>
            <div className={styles.max} onClick={onClickMax}>
              Max
            </div>
          </div>
        );
      default:
        return (
          <div className={styles.info}>
            <div className={styles.balances}>余额&nbsp;{balance}</div>
            <div className={styles.max} onClick={onClickMax}>
              Max
            </div>
          </div>
        );
    }
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
              {/* {currencyDetailList &&
                currencyDetailList.map((item) => {
                  const { symbol, icon } = item;
                  return (
                    <MenuItem value={symbol} key={symbol}>
                      <img src={icon} alt={symbol} className={styles.img} />
                      <span className={styles.symbol}>{symbol}</span>
                    </MenuItem>
                  );
                })} */}
            </Select>
          </div>
          <div className={styles.bottom}>
            <div className={styles.dolors}>$&nbsp;{dolors}</div>
            <div className={styles.info}>
              <OperationText />
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
