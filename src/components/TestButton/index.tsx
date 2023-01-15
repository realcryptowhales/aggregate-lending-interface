import * as React from 'react';
import clsx from 'classnames';
import styles from './index.module.less';

const TestButton = () => {
  return (
    <div className={clsx(styles.button, 'mt4')}>
      <button>test</button>
    </div>
  );
};

export default TestButton;
