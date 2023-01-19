import * as React from 'react';
import clsx from 'classnames';
import styles from './index.module.less';
import { useState } from 'react';

const ScrollTab = () => {
  const [count, setCount] = useState(0);
  const list = [
    'Typescript',
    'swr',
    'vite',
    'ether.js',
    'react',
    'react-router',
    'mobx'
  ];
  return (
    <div className="w-120 overflow-hidden mx-auto my-0">
      <div className={clsx(styles.tab, 'flex flex-nowrap')}>
        <div className="flex">
          {list.map((item) => (
            <div key={item + '1'} className="mr-5">
              {item}
            </div>
          ))}
        </div>
        <div className="flex">
          {list.map((item) => (
            <div key={item + '2'} className="mr-5">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollTab;
