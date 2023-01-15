import * as React from 'react';
import clsx from 'classnames';
import reactLogo from '@assets/react.svg';
import styles from './index.module.less';
import { useState } from 'react';

const TestBanner = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={clsx(styles.App)}>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img
            src="/vite.svg"
            className={clsx(styles.logo, 'w-20')}
            alt="Vite logo"
          />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img
            src={reactLogo}
            className={clsx(styles.logo, styles.react)}
            alt="React logo"
          />
        </a>
      </div>
      <div className={clsx(styles.card)}>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p className={clsx(styles.readTheDocs)}>
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
};

export default TestBanner;
