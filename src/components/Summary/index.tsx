import * as React from 'react';
import clsx from 'classnames';
import styles from './index.module.less';
import CurrencySelect from '@components/CurrencySelect';
import Item from './Item';

interface SummaryProps {
  currencyList: any[];
  dataList: any[];
  selectValue: any;
}

const Summary: React.FC<SummaryProps> = ({
  currencyList,
  dataList,
  selectValue
}) => {
  return (
    <div className={clsx('w-full', 'flex', 'items-center', styles.summary)}>
      <CurrencySelect defaultValue={selectValue} list={currencyList} />
      {dataList.map(({ key, title, text }) => {
        return <Item key={key} title={title} text={text} />;
      })}
    </div>
  );
};

export default Summary;
