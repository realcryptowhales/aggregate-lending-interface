import * as React from 'react';
import clsx from 'classnames';
import CurrencySelect from '@components/CurrencySelect';
import Item from './Item';

interface SummaryProps {
  currencyList: any[];
  dataList: any[];
  selectValue: string;
}

const Summary: React.FC<SummaryProps> = ({
  currencyList,
  dataList,
  selectValue
}) => {
  return (
    <div
      className={clsx(
        'w-full',
        'flex',
        'items-center bg-#ffffff rd-4 shadow-[0_4px_12px_rgb(137,137,137,0.25)]'
      )}
    >
      <CurrencySelect
        defaultValue={selectValue}
        list={currencyList}
        showImage
      />
      {dataList.map(({ key, title, text }) => {
        return <Item key={key} title={title} text={text} />;
      })}
    </div>
  );
};

export default Summary;
