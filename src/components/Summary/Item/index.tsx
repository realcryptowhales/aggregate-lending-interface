import * as React from 'react';
import clsx from 'classnames';
import styles from './index.module.less';

interface ItemProps {
  title: any;
  text: any;
}

const Item: React.FC<ItemProps> = ({ title, text }) => {
  return (
    <div className={clsx(styles.item, 'flex-col items-start')}>
      <div className={clsx(styles.title)}>{title}</div>
      <div className={clsx(styles.text)}>{text}</div>
    </div>
  );
};

export default Item;
