import * as React from 'react';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Avatar from '@mui/material/Avatar';
import clsx from 'classnames';
import styles from './index.module.less';
import { style, SxProps, Theme } from '@mui/system';

interface CurrencySelectProps {
  list: any[];
  defaultValue?: any;
  showImage: boolean;
  height?: number;
  sx?: any;
  onChange?: (arg0: string) => void;
}

const CurrencySelect: React.FC<CurrencySelectProps> = ({
  list,
  defaultValue,
  showImage,
  height,
  sx,
  onChange
}) => {
  const [currency, setCurrency] = useState(defaultValue || list[0].address);

  const handleChange = (event: SelectChangeEvent) => {
    setCurrency(event.target.value);
    onChange && onChange(event.target.value);
  };
  return (
    <FormControl sx={{ m: 1, minWidth: 80, margin: 0 }}>
      <Select
        labelId="currency-select-label"
        value={currency}
        onChange={handleChange}
        autoWidth
        sx={sx}
      >
        {list.map(({ icon, symbol, address }) => {
          return (
            <MenuItem key={address} value={address}>
              {showImage ? (
                <div className={clsx('flex items-center')}>
                  <Avatar
                    sx={{ width: '36px', height: '36px' }}
                    alt="Remy Sharp"
                    src={icon}
                  />
                  <span
                    className={clsx(styles.text, !showImage && styles.font)}
                  >
                    {symbol}
                  </span>
                </div>
              ) : (
                <span className={clsx(styles.font)}>{symbol}</span>
              )}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default CurrencySelect;
