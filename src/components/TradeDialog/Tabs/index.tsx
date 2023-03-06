import styles from './index.module.less';
import clsx from 'classnames';
import { TipProps } from '@/constant/type';

function Tips({ activeTab, tabs, onChangeTab }: TipProps) {
  return (
    <div className={styles.tabs}>
      {tabs &&
        tabs.map((item) => {
          const { key, text } = item;
          return (
            <div
              key={key}
              className={clsx(
                styles.item,
                activeTab === key ? styles.active : ''
              )}
              onClick={() => {
                onChangeTab(key);
              }}
            >
              {text}
            </div>
          );
        })}
    </div>
  );
}

export default Tips;
