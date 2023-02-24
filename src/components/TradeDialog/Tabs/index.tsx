import styles from './index.module.less';
import clsx from 'classnames';
import { TabItemProps } from '..';
import { DialogTypeProps } from '../hooks/useTradeDialog';

interface TipProps {
  tabs?: TabItemProps[];
  activeTab?: DialogTypeProps;
  onChangeTab: (num: number) => void;
}

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
