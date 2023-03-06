import * as React from 'react';
import style from './index.module.less';
import cls from 'classnames';
import {
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  Box
} from '@mui/material';
import styled from '@emotion/styled';
import { useState } from 'react';
import { mockUSDTAddr } from '@/constant';
interface Props {
  title: React.ReactNode;
  defaultValue: string;
  currencyList: { icon: string; symbol: string; address: string }[];
  onChange: (tokenAddr: string) => void;
}

const BootstrapSelect = styled(Select)(({ theme }) => ({
  '&': {
    fontWeight: 400,
    fontSize: '10px',
    lineHeight: '16px',
    color: '#000000'
  },
  '& .MuiOutlinedInput-input': {
    padding: '2px 8px !important',
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    textOverflow: 'unset'
  }
}));
const Title: React.FC<Props> = ({
  title,
  defaultValue,
  currencyList,
  onChange
}) => {
  const [currency, setCurrency] = useState(
    defaultValue || currencyList[0].symbol
  );
  // const [currencyAddr, setCurrencyAddr] = useState(mockUSDTAddr);
  const handleChange = (event: SelectChangeEvent) => {
    setCurrency(event.target.value);
  };
  return (
    <div className={cls(style.container)}>
      <div>{title}</div>
      <Box sx={{ width: 72, height: 20 }}>
        <FormControl fullWidth>
          <BootstrapSelect
            sx={{ padding: 0, height: 22 }}
            value={currency}
            onChange={handleChange as any}
          >
            {currencyList.map(({ symbol, address }) => {
              return (
                <MenuItem
                  onClick={() => {
                    onChange(address);
                  }}
                  className={style.font}
                  sx={{
                    width: 72,
                    fontSize: 14,
                    fontWeight: 400,
                    lineHeight: '16px'
                  }}
                  key={symbol}
                  value={symbol}
                >
                  {symbol}
                </MenuItem>
              );
            })}
          </BootstrapSelect>
        </FormControl>
      </Box>
      {/* <FormControl sx={{ minWidth: 92, height: 24 }} size="small">
        <CurrencySelect
          defaultValue={defaultValue}
          list={currencyList}
          showImage={false}
          height={24}
          sx={{
            height: 20,
            backgroundColor: 'rgba(0, 0, 0, 0.04)'
          }}
        />
      </FormControl> */}
    </div>
  );
};

export default Title;
