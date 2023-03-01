import { queryHelperABI } from '@/constant';
import {
  mockUSDTAddr,
  priceOracleAddr,
  queryHelperContractAddr,
  routerAddr
} from '@/constant/contract';
import { multicall } from '@wagmi/core';
import { makeAutoObservable } from 'mobx';

export const queryHelperContract = {
  address: queryHelperContractAddr as `0x${string}`,
  abi: queryHelperABI
};
export default class MarketStore {
  totalAmount = '';
  matchTotalAmount = '';
  totalSupplyAmount = '';
  totalBorrowAmount = '';

  supplyLendingPlatform = 'APR';
  supplyAggregationPlatformApr = '';
  supplyAaveApr = '';
  supplyCompoundApr = '';

  borrowLendingPlatform = 'APY';
  borrowAggregationPlatformApr = '';
  borrowAaveApr = '';
  borrowCompoundApr = '';

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  async getMarketData() {
    console.log('1', 1);
    let platFormInfo: any;
    try {
      [platFormInfo] = await multicall({
        contracts: [
          {
            ...queryHelperContract,
            functionName: 'getPlatformInfo'
            // args: [routerAddr, priceOracleAddr]
          }
        ]
      });
    } catch (e) {
      console.log('e', e);
    }
    console.log('platFormInfo', platFormInfo);
    this.totalSupplyAmount = platFormInfo?.[0]?.toString();
    this.totalBorrowAmount = platFormInfo?.[1]?.toString();
    this.matchTotalAmount = platFormInfo?.[2]?.toString();
    this.totalAmount = platFormInfo?.[0].add(platFormInfo?.[1]).toString();
    console.log('this.totalSupplyAmount', this.totalSupplyAmount);
    console.log('this.totalBorrowAmount', this.totalBorrowAmount);
    console.log('this.matchTotalAmount', this.matchTotalAmount);
    console.log('this.totalAmount', this.totalAmount);
  }
  async getCurrentSupplyRates(tokenAddr: string) {
    let supplyRates: any;
    try {
      [supplyRates] = await multicall({
        contracts: [
          {
            ...queryHelperContract,
            functionName: 'getCurrentSupplyRates',
            args: [tokenAddr]
          }
        ]
      });
    } catch (e) {
      console.log('e', e);
    }
    this.supplyAaveApr = supplyRates.aaveSupplyRate.toString();
    this.supplyCompoundApr = supplyRates.compSupplyRate.toString();
    this.supplyAggregationPlatformApr = supplyRates.aggSupplyRate.toString();
    console.log('this.supplyAaveApr', this.supplyAaveApr);
    console.log('this.supplyCompoundApr', this.supplyCompoundApr);
    console.log(
      'this.supplyAggregationPlatformApr',
      this.supplyAggregationPlatformApr
    );
  }
  async getCurrentBorrowRates(tokenAddr: string) {
    let borrowRates: any;
    try {
      [borrowRates] = await multicall({
        contracts: [
          {
            ...queryHelperContract,
            functionName: 'getCurrentBorrowRates',
            args: [tokenAddr]
          }
        ]
      });
    } catch (e) {
      console.log('e', e);
    }
    this.borrowAaveApr = borrowRates.aaveBorrowRate.toString();
    this.borrowCompoundApr = borrowRates.compBorrowRate.toString();
    this.borrowAggregationPlatformApr = borrowRates.aggBorrowRate.toString();
    console.log('this.borrowAaveApr', this.borrowAaveApr);
    console.log('this.borrowCompoundApr', this.borrowCompoundApr);
    console.log(
      'this.borrowAggregationPlatformApr',
      this.borrowAggregationPlatformApr
    );
  }
  async getMarketsInfo() {
    let marketTableList: any;
    try {
      [marketTableList] = await multicall({
        contracts: [
          {
            ...queryHelperContract,
            functionName: 'getMarketsInfo',
            args: [mockUSDTAddr]
          }
        ]
      });
    } catch (e) {
      console.log('e', e);
    }
    console.log('marketTableList', marketTableList);
  }
}
