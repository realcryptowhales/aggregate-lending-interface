import EnhancedTable, { Asset, HeadCell } from '@/components/Table';
import { TablePagination, Tooltip } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { liquidationTableRows } from './LiquidationTableRows';
import style from './index.module.less';
import useSWR, { SWRResponse } from 'SWR';
import { useAccount } from 'wagmi';
import axios from 'axios';
interface LiquidationHistoryRecord {
  liquidator: string;
  redeemToken: string;
  redeemTokenSymbol: string;
  redeemTokenIcon: string;
  redeemTokenName: string;
  redeemAmount: number;
  repayedToken: string;
  repayedTokenSymbol: string;
  repayedTokenIcon: string;
  repayedTokenName: string;
  repayedAmount: number;
  assetAddress: string;
  transactionHash: string;
  gmtCreate: string;
  liquidationPenalty: number;
}
export interface LiquidationData extends LiquidationHistoryRecord {
  key: any;
  event: string;
  liquidationThreshold: number;
}

const liquidationHeadCells: HeadCell<LiquidationData>[] = [
  {
    id: 'gmtCreate',
    label: '时间',
    needSort: false
  },
  {
    id: 'event',

    label: '事件类型',
    needSort: false
  },
  {
    id: 'redeemToken',
    label: '抵押资产',
    needSort: false
  },
  {
    id: 'redeemAmount',

    label: '抵押资产数量',
    needSort: false
  },
  {
    id: 'repayedToken',
    label: '偿还资产',
    needSort: false
  },
  {
    id: 'repayedAmount',

    label: '偿还资产数量',
    needSort: false
  },

  {
    id: 'liquidationPenalty',

    label: '清算惩罚',
    needSort: false
  },

  {
    id: 'liquidator',

    label: '清算人地址',
    needSort: false
  },
  {
    id: 'transactionHash',

    label: '交易详情',
    needSort: false
  }
];
// function createliquidationData(
//   time: string,
//   event: string,
//   liquidationAsset: Asset,
//   liquidationAmount: number,
//   repaidDebt: number,
//   liquidationThreshold: number,
//   liquidationPenalty: number,
//   liquidatorAddr: string,
//   hash: string
// ): LiquidationData {
//   return {
//     key: liquidationAmount,
//     t,
//     event,
//     liquidationAsset,
//     liquidationAmount,
//     repaidDebt,
//     liquidationThreshold,
//     liquidationPenalty,
//     liquidatorAddr,
//     hash
//   };
// }

// const liquidationRows = [
//   createliquidationData(
//     '2023',
//     '清算',
//     {
//       logo: 'https://static.okx.com/cdn/assets/imgs/221/C25FE324914596B9.png',
//       symbol: 'BTC',
//       name: 'btc'
//     },
//     305,
//     3.7,
//     89,
//     85,
//     '0x213',
//     'tx2'
//   ),
//   createliquidationData(
//     '2023',
//     '清算',
//     {
//       logo: 'https://static.okx.com/cdn/assets/imgs/221/5F33E3F751873296.png',
//       symbol: 'ETH',
//       name: 'eth'
//     },
//     305,
//     3.7,
//     89,
//     85,
//     '0x213',
//     'tx7'
//   ),
//   createliquidationData(
//     '2023',
//     '清算',
//     {
//       logo: 'https://static.okx.com/cdn/assets/imgs/221/5F74EB20302D7761.png',
//       symbol: 'USDT',
//       name: 'usdt'
//     },
//     305,
//     3.7,
//     89,
//     85,
//     '0x213',
//     'tx7'
//   ),
//   createliquidationData(
//     '2023',
//     '清算',
//     {
//       logo: 'https://static.okx.com/cdn/announce/20220119/1642588815382f0fd4a29-ba95-4ba9-ab33-23c1258ce96a.png',
//       symbol: 'OKB',
//       name: 'okb'
//     },
//     305,
//     3.7,
//     89,
//     85,
//     '0x213',
//     'tx9'
//   ),
//   createliquidationData(
//     '2023',
//     '清算',
//     {
//       logo: 'https://static.okx.com/cdn/assets/imgs/221/C25FE324914596B9.png',
//       symbol: 'BTC',
//       name: 'btc'
//     },
//     305,
//     3.7,
//     89,
//     85,
//     '0x213',
//     'tx2'
//   ),
//   createliquidationData(
//     '2023',
//     '清算',
//     {
//       logo: 'https://static.okx.com/cdn/assets/imgs/221/5F33E3F751873296.png',
//       symbol: 'ETH',
//       name: 'eth'
//     },
//     305,
//     3.7,
//     89,
//     85,
//     '0x213',
//     'tx7'
//   ),
//   createliquidationData(
//     '2023',
//     '清算',
//     {
//       logo: 'https://static.okx.com/cdn/assets/imgs/221/5F74EB20302D7761.png',
//       symbol: 'USDT',
//       name: 'usdt'
//     },
//     305,
//     3.7,
//     89,
//     85,
//     '0x213',
//     'tx7'
//   ),
//   createliquidationData(
//     '2023',
//     '清算',
//     {
//       logo: 'https://static.okx.com/cdn/announce/20220119/1642588815382f0fd4a29-ba95-4ba9-ab33-23c1258ce96a.png',
//       symbol: 'OKB',
//       name: 'okb'
//     },
//     305,
//     3.7,
//     89,
//     85,
//     '0x213',
//     'tx9'
//   ),
//   createliquidationData(
//     '2023',
//     '清算',
//     {
//       logo: 'https://static.okx.com/cdn/assets/imgs/221/C25FE324914596B9.png',
//       symbol: 'BTC',
//       name: 'btc'
//     },
//     305,
//     3.7,
//     89,
//     85,
//     '0x213',
//     'tx2'
//   ),
//   createliquidationData(
//     '2023',
//     '清算',
//     {
//       logo: 'https://static.okx.com/cdn/assets/imgs/221/5F33E3F751873296.png',
//       symbol: 'ETH',
//       name: 'eth'
//     },
//     305,
//     3.7,
//     89,
//     85,
//     '0x213',
//     'tx7'
//   ),
//   createliquidationData(
//     '2023',
//     '清算',
//     {
//       logo: 'https://static.okx.com/cdn/assets/imgs/221/5F74EB20302D7761.png',
//       symbol: 'USDT',
//       name: 'usdt'
//     },
//     305,
//     3.7,
//     89,
//     85,
//     '0x213',
//     'tx7'
//   ),
//   createliquidationData(
//     '2023',
//     '清算',
//     {
//       logo: 'https://static.okx.com/cdn/announce/20220119/1642588815382f0fd4a29-ba95-4ba9-ab33-23c1258ce96a.png',
//       symbol: 'OKB',
//       name: 'okb'
//     },
//     305,
//     3.7,
//     89,
//     85,
//     '0x213',
//     'tx9'
//   ),
//   createliquidationData(
//     '2023',
//     '清算',
//     {
//       logo: 'https://static.okx.com/cdn/assets/imgs/221/C25FE324914596B9.png',
//       symbol: 'BTC',
//       name: 'btc'
//     },
//     305,
//     3.7,
//     89,
//     85,
//     '0x213',
//     'tx2'
//   ),
//   createliquidationData(
//     '2023',
//     '清算',
//     {
//       logo: 'https://static.okx.com/cdn/assets/imgs/221/5F33E3F751873296.png',
//       symbol: 'ETH',
//       name: 'eth'
//     },
//     305,
//     3.7,
//     89,
//     85,
//     '0x213',
//     'tx7'
//   ),
//   createliquidationData(
//     '2023',
//     '清算',
//     {
//       logo: 'https://static.okx.com/cdn/assets/imgs/221/5F74EB20302D7761.png',
//       symbol: 'USDT',
//       name: 'usdt'
//     },
//     305,
//     3.7,
//     89,
//     85,
//     '0x213',
//     'tx7'
//   ),
//   createliquidationData(
//     '2023',
//     '清算',
//     {
//       logo: 'https://static.okx.com/cdn/announce/20220119/1642588815382f0fd4a29-ba95-4ba9-ab33-23c1258ce96a.png',
//       symbol: 'OKB',
//       name: 'okb'
//     },
//     305,
//     3.7,
//     89,
//     85,
//     '0x213',
//     'tx9'
//   ),
//   createliquidationData(
//     '2023',
//     '清算',
//     {
//       logo: 'https://static.okx.com/cdn/assets/imgs/221/C25FE324914596B9.png',
//       symbol: 'BTC',
//       name: 'btc'
//     },
//     305,
//     3.7,
//     89,
//     85,
//     '0x213',
//     'tx2'
//   ),
//   createliquidationData(
//     '2023',
//     '清算',
//     {
//       logo: 'https://static.okx.com/cdn/assets/imgs/221/5F33E3F751873296.png',
//       symbol: 'ETH',
//       name: 'eth'
//     },
//     305,
//     3.7,
//     89,
//     85,
//     '0x213',
//     'tx7'
//   ),
//   createliquidationData(
//     '2023',
//     '清算',
//     {
//       logo: 'https://static.okx.com/cdn/assets/imgs/221/5F74EB20302D7761.png',
//       symbol: 'USDT',
//       name: 'usdt'
//     },
//     305,
//     3.7,
//     89,
//     85,
//     '0x213',
//     'tx7'
//   ),
//   createliquidationData(
//     '2023',
//     '清算',
//     {
//       logo: 'https://static.okx.com/cdn/announce/20220119/1642588815382f0fd4a29-ba95-4ba9-ab33-23c1258ce96a.png',
//       symbol: 'OKB',
//       name: 'okb'
//     },
//     305,
//     3.7,
//     89,
//     85,
//     '0x213',
//     'tx9'
//   ),
//   createliquidationData(
//     '2023',
//     '清算',
//     {
//       logo: 'https://static.okx.com/cdn/assets/imgs/221/C25FE324914596B9.png',
//       symbol: 'BTC',
//       name: 'btc'
//     },
//     305,
//     3.7,
//     89,
//     85,
//     '0x213',
//     'tx2'
//   ),
//   createliquidationData(
//     '2023',
//     '清算',
//     {
//       logo: 'https://static.okx.com/cdn/assets/imgs/221/5F33E3F751873296.png',
//       symbol: 'ETH',
//       name: 'eth'
//     },
//     305,
//     3.7,
//     89,
//     85,
//     '0x213',
//     'tx7'
//   ),
//   createliquidationData(
//     '2023',
//     '清算',
//     {
//       logo: 'https://static.okx.com/cdn/assets/imgs/221/5F74EB20302D7761.png',
//       symbol: 'USDT',
//       name: 'usdt'
//     },
//     305,
//     3.7,
//     89,
//     85,
//     '0x213',
//     'tx7'
//   ),
//   createliquidationData(
//     '2023',
//     '清算',
//     {
//       logo: 'https://static.okx.com/cdn/announce/20220119/1642588815382f0fd4a29-ba95-4ba9-ab33-23c1258ce96a.png',
//       symbol: 'OKB',
//       name: 'okb'
//     },
//     305,
//     3.7,
//     89,
//     85,
//     '0x213',
//     'tx9'
//   ),
//   createliquidationData(
//     '2023',
//     '清算',
//     {
//       logo: 'https://static.okx.com/cdn/assets/imgs/221/C25FE324914596B9.png',
//       symbol: 'BTC',
//       name: 'btc'
//     },
//     305,
//     3.7,
//     89,
//     85,
//     '0x213',
//     'tx2'
//   ),
//   createliquidationData(
//     '2023',
//     '清算',
//     {
//       logo: 'https://static.okx.com/cdn/assets/imgs/221/5F33E3F751873296.png',
//       symbol: 'ETH',
//       name: 'eth'
//     },
//     305,
//     3.7,
//     89,
//     85,
//     '0x213',
//     'tx7'
//   ),
//   createliquidationData(
//     '2023',
//     '清算',
//     {
//       logo: 'https://static.okx.com/cdn/assets/imgs/221/5F74EB20302D7761.png',
//       symbol: 'USDT',
//       name: 'usdt'
//     },
//     305,
//     3.7,
//     89,
//     85,
//     '0x213',
//     'tx7'
//   ),
//   createliquidationData(
//     '2023',
//     '清算',
//     {
//       logo: 'https://static.okx.com/cdn/announce/20220119/1642588815382f0fd4a29-ba95-4ba9-ab33-23c1258ce96a.png',
//       symbol: 'OKB',
//       name: 'okb'
//     },
//     305,
//     3.7,
//     89,
//     85,
//     '0x213',
//     'tx9'
//   ),
//   createliquidationData(
//     '2023',
//     '清算',
//     {
//       logo: 'https://static.okx.com/cdn/assets/imgs/221/C25FE324914596B9.png',
//       symbol: 'BTC',
//       name: 'btc'
//     },
//     305,
//     3.7,
//     89,
//     85,
//     '0x213',
//     'tx2'
//   ),
//   createliquidationData(
//     '2023',
//     '清算',
//     {
//       logo: 'https://static.okx.com/cdn/assets/imgs/221/5F33E3F751873296.png',
//       symbol: 'ETH',
//       name: 'eth'
//     },
//     305,
//     3.7,
//     89,
//     85,
//     '0x213',
//     'tx7'
//   ),
//   createliquidationData(
//     '2023',
//     '清算',
//     {
//       logo: 'https://static.okx.com/cdn/assets/imgs/221/5F74EB20302D7761.png',
//       symbol: 'USDT',
//       name: 'usdt'
//     },
//     305,
//     3.7,
//     89,
//     85,
//     '0x213',
//     'tx7'
//   ),
//   createliquidationData(
//     '2023',
//     '清算',
//     {
//       logo: 'https://static.okx.com/cdn/announce/20220119/1642588815382f0fd4a29-ba95-4ba9-ab33-23c1258ce96a.png',
//       symbol: 'OKB',
//       name: 'okb'
//     },
//     305,
//     3.7,
//     89,
//     85,
//     '0x213',
//     'tx9'
//   )
// ];
const pageSize = 5;
const fetcher = async (args: { url: string; params: any }) => {
  const { url, params } = args;
  console.log(params);
  // const { data, status } = await axios.get(url, params);
  // return data;
  return Promise.resolve({
    pageNum: 1,
    pageSize: 8,
    totalNum: 20,
    result: [
      {
        liquidator: '0x5e4B00f651949e111D4e5f5d6c914aaaD28d40CF',
        redeemToken: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        redeemTokenSymbol: 'USDT',
        redeemTokenIcon: 'https://etherscan.io/token/images/tether_32.png',
        redeemTokenName: 'USDT',
        redeemAmount: 600.33,
        repayedToken: '0x75231f58b43240c9718dd58b4967c5114342a86c',
        repayedTokenSymbol: 'OKB',
        repayedTokenIcon: 'https://etherscan.io/token/images/okex_28.png',
        repayedTokenName: 'OKB',
        repayedAmount: 3000.0,
        assetAddress: '0x23335657622Dcc27bB1914E51cDc30871D6d04d3',
        transactionHash:
          '0x2ffcf4be3c0c9bbc5abad37c9f998259ebfa11e171c5f5b91cb84c2cf94b475e',
        gmtCreate: '2023-02-22T19:27:48.000+00:00'
      },
      {
        liquidator: '0x5e4B00f651949e111D4e5f5d6c914aaaD28d40CF',
        redeemToken: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        redeemTokenSymbol: 'USDT',
        redeemTokenIcon: 'https://etherscan.io/token/images/tether_32.png',
        redeemTokenName: 'USDT',
        redeemAmount: 300.33,
        repayedToken: '0x75231f58b43240c9718dd58b4967c5114342a86c',
        repayedTokenSymbol: 'OKB',
        repayedTokenIcon: 'https://etherscan.io/token/images/okex_28.png',
        repayedTokenName: 'OKB',
        repayedAmount: 6000.0,
        assetAddress: '0x23335657622Dcc27bB1914E51cDc30871D6d04d3',
        transactionHash:
          '0x2ffcf4be3c0c9bbc5abad37c9f998259ebfa11e171c5f5b91cb84c2cf94b475e',
        gmtCreate: '2023-02-22T01:23:00.000+00:00'
      },
      {
        liquidator: '0x5e4B00f651949e111D4e5f5d6c914aaaD28d40CF',
        redeemToken: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        redeemTokenSymbol: 'USDT',
        redeemTokenIcon: 'https://etherscan.io/token/images/tether_32.png',
        redeemTokenName: 'USDT',
        redeemAmount: 300.33,
        repayedToken: '0x75231f58b43240c9718dd58b4967c5114342a86c',
        repayedTokenSymbol: 'OKB',
        repayedTokenIcon: 'https://etherscan.io/token/images/okex_28.png',
        repayedTokenName: 'OKB',
        repayedAmount: 6000.0,
        assetAddress: '0x23335657622Dcc27bB1914E51cDc30871D6d04d3',
        transactionHash:
          '0x2ffcf4be3c0c9bbc5abad37c9f998259ebfa11e171c5f5b91cb84c2cf94b475e',
        gmtCreate: '2023-02-22T01:23:00.000+00:00'
      },
      {
        liquidator: '0x5e4B00f651949e111D4e5f5d6c914aaaD28d40CF',
        redeemToken: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        redeemTokenSymbol: 'USDT',
        redeemTokenIcon: 'https://etherscan.io/token/images/tether_32.png',
        redeemTokenName: 'USDT',
        redeemAmount: 300.33,
        repayedToken: '0x75231f58b43240c9718dd58b4967c5114342a86c',
        repayedTokenSymbol: 'OKB',
        repayedTokenIcon: 'https://etherscan.io/token/images/okex_28.png',
        repayedTokenName: 'OKB',
        repayedAmount: 6000.0,
        assetAddress: '0x23335657622Dcc27bB1914E51cDc30871D6d04d3',
        transactionHash:
          '0x2ffcf4be3c0c9bbc5abad37c9f998259ebfa11e171c5f5b91cb84c2cf94b475e',
        gmtCreate: '2023-02-22T01:23:00.000+00:00'
      },
      {
        liquidator: '0x5e4B00f651949e111D4e5f5d6c914aaaD28d40CF',
        redeemToken: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        redeemTokenSymbol: 'USDT',
        redeemTokenIcon: 'https://etherscan.io/token/images/tether_32.png',
        redeemTokenName: 'USDT',
        redeemAmount: 300.33,
        repayedToken: '0x75231f58b43240c9718dd58b4967c5114342a86c',
        repayedTokenSymbol: 'OKB',
        repayedTokenIcon: 'https://etherscan.io/token/images/okex_28.png',
        repayedTokenName: 'OKB',
        repayedAmount: 6000.0,
        assetAddress: '0x23335657622Dcc27bB1914E51cDc30871D6d04d3',
        transactionHash:
          '0x2ffcf4be3c0c9bbc5abad37c9f998259ebfa11e171c5f5b91cb84c2cf94b475e',
        gmtCreate: '2023-02-22T01:23:00.000+00:00'
      },
      {
        liquidator: '0x5e4B00f651949e111D4e5f5d6c914aaaD28d40CF',
        redeemToken: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        redeemTokenSymbol: 'USDT',
        redeemTokenIcon: 'https://etherscan.io/token/images/tether_32.png',
        redeemTokenName: 'USDT',
        redeemAmount: 300.33,
        repayedToken: '0x75231f58b43240c9718dd58b4967c5114342a86c',
        repayedTokenSymbol: 'OKB',
        repayedTokenIcon: 'https://etherscan.io/token/images/okex_28.png',
        repayedTokenName: 'OKB',
        repayedAmount: 6000.0,
        assetAddress: '0x23335657622Dcc27bB1914E51cDc30871D6d04d3',
        transactionHash:
          '0x2ffcf4be3c0c9bbc5abad37c9f998259ebfa11e171c5f5b91cb84c2cf94b475e',
        gmtCreate: '2023-02-22T01:23:00.000+00:00'
      },
      {
        liquidator: '0x5e4B00f651949e111D4e5f5d6c914aaaD28d40CF',
        redeemToken: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        redeemTokenSymbol: 'USDT',
        redeemTokenIcon: 'https://etherscan.io/token/images/tether_32.png',
        redeemTokenName: 'USDT',
        redeemAmount: 300.33,
        repayedToken: '0x75231f58b43240c9718dd58b4967c5114342a86c',
        repayedTokenSymbol: 'OKB',
        repayedTokenIcon: 'https://etherscan.io/token/images/okex_28.png',
        repayedTokenName: 'OKB',
        repayedAmount: 6000.0,
        assetAddress: '0x23335657622Dcc27bB1914E51cDc30871D6d04d3',
        transactionHash:
          '0x2ffcf4be3c0c9bbc5abad37c9f998259ebfa11e171c5f5b91cb84c2cf94b475e',
        gmtCreate: '2023-02-22T01:23:00.000+00:00'
      },
      {
        liquidator: '0x5e4B00f651949e111D4e5f5d6c914aaaD28d40CF',
        redeemToken: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        redeemTokenSymbol: 'USDT',
        redeemTokenIcon: 'https://etherscan.io/token/images/tether_32.png',
        redeemTokenName: 'USDT',
        redeemAmount: 300.33,
        repayedToken: '0x75231f58b43240c9718dd58b4967c5114342a86c',
        repayedTokenSymbol: 'OKB',
        repayedTokenIcon: 'https://etherscan.io/token/images/okex_28.png',
        repayedTokenName: 'OKB',
        repayedAmount: 6000.0,
        assetAddress: '0x23335657622Dcc27bB1914E51cDc30871D6d04d3',
        transactionHash:
          '0x2ffcf4be3c0c9bbc5abad37c9f998259ebfa11e171c5f5b91cb84c2cf94b475e',
        gmtCreate: '2023-02-22T01:23:00.000+00:00'
      }
    ]
  });
};

const Liquidation = () => {
  const [pageNo, setPageNo] = useState(0);
  const handleChangePage = (event: unknown, newPageNo: number) => {
    setPageNo(newPageNo);
  };
  const { address, isConnected } = useAccount();
  const { data = { totalNum: 0, result: [] } } =
    isConnected &&
    address &&
    (useSWR(
      {
        url: '/liquidator/list',
        params: { pageNo: pageNo + 1, assetAddress: address, pageSize: 8 }
      },
      fetcher
    ) as any);
  const { totalNum, result } = data;
  // const computedLiquidationRows = React.useMemo(() => {
  //   return liquidationRows.slice(
  //     page * rowsPerPage,
  //     page * rowsPerPage + rowsPerPage
  //   );
  // }, [liquidationRows, page, rowsPerPage]);

  return (
    <div className={style.container}>
      <div className={style.title}>资产清算记录</div>
      <EnhancedTable<LiquidationData>
        headCells={liquidationHeadCells}
        rows={result}
        TableRows={liquidationTableRows}
      />
      <TablePagination
        style={{ marginTop: '40px', marginBottom: '64px' }}
        component="div"
        count={totalNum}
        rowsPerPage={8}
        page={pageNo}
        labelRowsPerPage="" //hidden select
        SelectProps={{ sx: { display: 'none' } }} //hidden select
        onPageChange={handleChangePage}
        // onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Liquidation;
