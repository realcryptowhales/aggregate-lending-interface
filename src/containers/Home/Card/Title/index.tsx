import * as React from 'react';
import useSWR from 'swr';
import { fetcher } from '@api/index';
import style from './index.module.less';
import cls from 'classnames';
import {
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  FormControl
} from '@mui/material';
import { height } from '@mui/system';
import CurrencySelect from '@/components/CurrencySelect';
interface Props {
  title: React.ReactNode;
  // selectLabel: string;
  // defaultSelect: string;
  // selectOption: string[];
  defaultValue: string;
  currencyList: any[];
}
const currencyList = [
  {
    icon: 'https://static.okx.com/cdn/assets/imgs/221/C25FE324914596B9.png',
    symbol: 'BTC'
  },
  {
    icon: 'https://static.okx.com/cdn/assets/imgs/221/5F33E3F751873296.png',
    symbol: 'ETH'
  },
  {
    icon: 'https://static.okx.com/cdn/announce/20220119/1642588815382f0fd4a29-ba95-4ba9-ab33-23c1258ce96a.png',
    symbol: 'OKB'
  },
  {
    icon: 'https://static.okx.com/cdn/assets/imgs/221/8EC634AF717771B6.png',
    symbol: 'LTC'
  },
  {
    icon: 'https://static.okx.com/cdn/assets/imgs/221/5F74EB20302D7761.png',
    symbol: 'USDT'
  }
];
const Title: React.FC<Props> = ({ title, defaultValue, currencyList }) => {
  const [currentVale, setCurrentValue] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setCurrentValue(event.target.value as string);
  };
  return (
    <div className={cls(style.container)}>
      <div>{title}</div>
      <FormControl sx={{ minWidth: 92, height: 24 }} size="small">
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
      </FormControl>
    </div>
  );
};

export default Title;
