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
interface Props {
  title: React.ReactNode;
  selectLabel: string;
  // defaultSelect: string;
  selectOption: string[];
}

const Title: React.FC<Props> = ({ title, selectLabel, selectOption }) => {
  const [currentVale, setCurrentValue] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setCurrentValue(event.target.value as string);
  };
  return (
    <div className={cls(style.container)}>
      <div>{title}</div>
      <div>
        <FormControl sx={{ minWidth: 92, height: 24 }} size="small">
          <InputLabel id="demo-simple-select-label">{selectLabel}</InputLabel>
          <Select
            id="demo-simple-select-label"
            value={currentVale}
            label={selectLabel}
            onChange={handleChange}
          >
            {selectOption.map((value) => {
              return (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default Title;
