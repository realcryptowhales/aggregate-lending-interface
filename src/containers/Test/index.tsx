import React, { useState } from 'react';
import { Button } from '@mui/material';
import LendingDialog from '@/components/LendingDialog';
import useLendingDialog from '@/components/LendingDialog/hooks/useLendingDialog';

const Markets = () => {
  const {
    tabs,
    activeTab,
    open,
    setOpen,
    onChangeTab,
    currencyList,
    activeCurrency,
    onChangeActiveCurrency
  } = useLendingDialog({
    currencyList: [
      {
        icon: 'https://static.okx.com/cdn/assets/imgs/221/C25FE324914596B9.png',
        symbol: 'BTC'
      },
      {
        icon: 'https://static.okx.com/cdn/assets/imgs/221/5F33E3F751873296.png',
        symbol: 'ETH'
      },
      {
        icon: 'https://static.okx.com/cdn/announce/20220119/1642588815382f0fd4a29-ba95-4ba9-ab33-23c1258ce96a.png',
        symbol: 'OKB'
      },
      {
        icon: 'https://static.okx.com/cdn/assets/imgs/221/8EC634AF717771B6.png',
        symbol: 'LTC'
      },
      {
        icon: 'https://static.okx.com/cdn/assets/imgs/221/5F74EB20302D7761.png',
        symbol: 'USDT'
      }
    ]
  });

  return (
    <div>
      <Button
        variant="outlined"
        onClick={() => {
          setOpen(true);
        }}
      >
        Open simple dialog
      </Button>
      <LendingDialog
        activeTab={activeTab}
        onChangeTab={onChangeTab}
        open={open}
        tabs={tabs}
        activeCurrency={activeCurrency}
        currencyList={currencyList}
        onClose={() => {
          setOpen(false);
        }}
        onChangeActiveCurrency={onChangeActiveCurrency}
      />
    </div>
  );
};

export default Markets;
