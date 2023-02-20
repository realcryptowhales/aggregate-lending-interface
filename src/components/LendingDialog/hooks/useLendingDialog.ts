import { useState, useEffect } from 'react';

export interface currencyInfo {
  symbol: string;
  icon: string;
}

export interface UseLendingDialogProps {
  currencyList: currencyInfo[];
}

const useLendingDialog = ({ currencyList }: UseLendingDialogProps) => {
  const [tabs, setTabs] = useState([
    {
      text: '存款',
      key: 1
    },
    {
      text: '取款',
      key: 2
    }
  ]);
  const [activeTab, setActiveTab] = useState(1);
  const [open, setOpen] = useState(true);
  const [activeCurrency, setActiveCurrency] = useState(currencyList[0].symbol);

  useEffect(() => {
    setTabs([
      {
        text: '存款',
        key: 1
      },
      {
        text: '取款',
        key: 2
      }
    ]);
  }, []);

  const onChangeTab = (key: number) => {
    setActiveTab(key);
  };

  const onChangeActiveCurrency = (name: string) => {
    setActiveCurrency(name);
  };

  return {
    tabs,
    activeTab,
    onChangeTab,
    open,
    setOpen,
    currencyList,
    activeCurrency,
    onChangeActiveCurrency
  };
};

export default useLendingDialog;
