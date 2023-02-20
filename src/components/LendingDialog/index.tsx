import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import styles from './index.module.less';
import clsx from 'classnames';
import DialogInput from './DialogInput';
import { UseLendingDialogProps } from './hooks/useLendingDialog';

export interface TabItemProps {
  key: number;
  text: string;
}

export interface LendingDialogProps extends UseLendingDialogProps {
  open: boolean;
  tabs: TabItemProps[];
  activeTab: number;
  onClose: () => void;
  onChangeTab: (num: number) => void;
  activeCurrency: string;
  onChangeActiveCurrency: (name: string) => void;
}

function LendingDialog(props: LendingDialogProps) {
  const {
    onClose,
    activeTab,
    open,
    tabs,
    onChangeTab,
    currencyList,
    activeCurrency,
    onChangeActiveCurrency
  } = props;

  return (
    <Dialog onClose={onClose} open={open} maxWidth="xl">
      <div className={styles.title}>
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
      </div>
      <div className={styles.content}>
        <section className={styles.left}>
          <DialogInput
            currencyList={currencyList}
            activeCurrency={activeCurrency}
            onChangeActiveCurrency={onChangeActiveCurrency}
          />
        </section>
        <section className={styles.right}></section>
      </div>
    </Dialog>
  );
}

export default LendingDialog;
