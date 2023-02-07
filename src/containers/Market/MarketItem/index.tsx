import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import Summary from '@components/Summary';
import Avatar from '@mui/material/Avatar';
import Detail from '@components/Detail';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

function MarketItem() {
  const { id } = useParams<'id'>();
  const currencyList = [
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
  ];
  const dataList = [
    {
      key: 'index1',
      title: '价格',
      text: '$ 18,000.49'
    },
    {
      key: 'index2',
      title: '价格来源',
      text: (
        <div className="flex items-center">
          <Avatar
            sx={{ width: '18px', height: '18px' }}
            alt="Remy Sharp"
            src="https://static.okx.com/cdn/announce/20220119/1642588815382f0fd4a29-ba95-4ba9-ab33-23c1258ce96a.png"
          />
          <span className="font-500 text-3.5 leading-4 ml-2">OKC</span>
        </div>
      )
    },
    {
      key: 'index3',
      title: '你的存款数量',
      text: '90.49349018'
    },
    {
      key: 'index4',
      title: '你的借款数量',
      text: '50.49349018'
    },
    {
      key: 'index5',
      title: (
        <div className="flex items-center">
          <span className="mr-1">最高抵押率</span>
          <ErrorOutlineOutlinedIcon sx={{ width: '16px', height: '16px' }} />
        </div>
      ),
      text: '84.37%'
    },
    {
      key: 'index6',
      title: (
        <div className="flex items-center">
          <span className="mr-1">清算阈值</span>
          <ErrorOutlineOutlinedIcon sx={{ width: '16px', height: '16px' }} />
        </div>
      ),
      text: '89.37%'
    }
  ];

  return (
    <div className="w-full box-border px-27 py-6">
      <Summary
        selectValue={id}
        currencyList={currencyList}
        dataList={dataList}
      />
      <Detail />
      <Link to="/markets">back to markets</Link>
    </div>
  );
}

export default MarketItem;
