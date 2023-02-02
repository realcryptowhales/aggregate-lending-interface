import * as React from 'react';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Avatar from '@mui/material/Avatar';

import clsx from 'classnames';
import styles from './index.module.less';

interface CurrencySelectProps {
  list: any[];
  defaultValue?: any;
}

const CurrencySelect: React.FC<CurrencySelectProps> = ({
  list,
  defaultValue
}) => {
  const [currency, setCurrency] = useState(defaultValue || list[0].symbol);
  const handleChange = (event: SelectChangeEvent) => {
    setCurrency(event.target.value);
  };
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <Select
          labelId="currency-select-label"
          value={currency}
          onChange={handleChange}
          autoWidth
        >
          {list.map(({ icon, symbol }) => {
            return (
              <MenuItem key={symbol} value={symbol}>
                <div className={clsx('flex items-center')}>
                  <Avatar
                    sx={{ width: '36px', height: '36px' }}
                    alt="Remy Sharp"
                    src={icon}
                  />
                  <span className={clsx(styles.text)}>{symbol}</span>
                </div>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default CurrencySelect;
