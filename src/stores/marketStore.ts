import { queryHelperABI } from '@/constant';
import {
  mockUSDTAddr,
  priceOracleAddr,
  queryHelperContractAddr,
  routerAddr
} from '@/constant/contract';
import { formatContractData } from '@/utils/format';
import { multicall } from '@wagmi/core';
import { BigNumberish } from 'ethers';
import { formatUnits } from 'ethers/lib/utils.js';
import { makeAutoObservable } from 'mobx';

export const queryHelperContract = {
  address: queryHelperContractAddr as `0x${string}`,
  abi: queryHelperABI
};
export interface MarketCurrencyInfo {
  underlying: string;
  borrowRate: BigNumberish;
  supplyRate: BigNumberish;
  totalBorrowed: BigNumberish;
  totalMatched: BigNumberish;
  totalSupplied: BigNumberish;
}
interface BorrowAprInfo {
  aaveBorrowRate: BigNumberish;
  aggBorrowRate: BigNumberish;
  compBorrowRate: BigNumberish;
}
interface SupplyAprInfo {
  aaveSupplyRate: BigNumberish;
  aggSupplyRate: BigNumberish;
  compSupplyRate: BigNumberish;
}

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

  marketTableList: MarketCurrencyInfo[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  async setPlatformInfo(platFormInfo: any[]) {
    console.log('platFormInfo', platFormInfo);
    this.totalSupplyAmount = formatUnits(platFormInfo?.[0], 6);
    this.totalBorrowAmount = formatUnits(platFormInfo?.[1], 6);
    this.matchTotalAmount = formatUnits(platFormInfo?.[2], 6);
    this.totalAmount = formatUnits(platFormInfo?.[0].add(platFormInfo?.[1]), 6);
    console.log('this.totalSupplyAmount', this.totalSupplyAmount);
    console.log('this.totalBorrowAmount', this.totalBorrowAmount);
    console.log('this.matchTotalAmount', this.matchTotalAmount);
    console.log('this.totalAmount', this.totalAmount);
  }
  async setCurrentSupplyRates(supplyRates: SupplyAprInfo) {
    this.supplyAaveApr = formatUnits(supplyRates.aaveSupplyRate, 6);
    this.supplyCompoundApr = formatUnits(supplyRates.compSupplyRate, 6);
    this.supplyAggregationPlatformApr = formatUnits(
      supplyRates.aggSupplyRate,
      6
    );
    console.log('this.supplyAaveApr', this.supplyAaveApr);
    console.log('this.supplyCompoundApr', this.supplyCompoundApr);
    console.log(
      'this.supplyAggregationPlatformApr',
      this.supplyAggregationPlatformApr
    );
  }
  async setCurrentBorrowRates(borrowRates: BorrowAprInfo) {
    this.borrowAaveApr = formatUnits(borrowRates.aaveBorrowRate, 6);
    this.borrowCompoundApr = formatUnits(borrowRates.compBorrowRate, 6);
    this.borrowAggregationPlatformApr = formatUnits(
      borrowRates.aggBorrowRate,
      6
    );
    console.log('this.borrowAaveApr', this.borrowAaveApr);
    console.log('this.borrowCompoundApr', this.borrowCompoundApr);
    console.log(
      'this.borrowAggregationPlatformApr',
      this.borrowAggregationPlatformApr
    );
  }
  async setMarketsInfo(marketTableList: any[]) {
    const res = marketTableList.map(formatContractData);
    console.log('marketTableList', res);
    this.marketTableList = res;
  }
}
