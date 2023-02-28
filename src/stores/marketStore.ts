// import { multicall, MulticallConfig } from '@wagmi/core';
import { makeAutoObservable } from 'mobx';
import { erc20ABI } from 'wagmi';

const Erc20 = {
  address: '0x382bB369d343125BfB2117af9c149795C6C65C50' as `0x${string}`,
  abi: erc20ABI
};
export default class MarketStore {
  totalAmount = '';
  matchTotalAmount = '';
  totalDepositAmount = '';
  totalBorrowAmount = '';

  depositLendingPlatform = 'APR';
  depositAggregationPlatformApr = '';
  depositAaveApr = '';
  depositCompoundApr = '';

  borrowLendingPlatform = 'APY';
  borrowAggregationPlatformApr = '';
  borrowAaveApr = '';
  borrowCompoundApr = '';

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  async getMarketData() {
    // const [symbol, amount] = await multicall({
    //   contracts: [
    //     {
    //       ...Erc20,
    //       functionName: 'symbol'
    //     },
    //     {
    //       ...Erc20,
    //       functionName: 'balanceOf',
    //       args: ['0x49f8948c60cE2b4180DEf540f03148540268C5B0' as `0x${string}`]
    //     }
    //   ]
    // });
  }
}
