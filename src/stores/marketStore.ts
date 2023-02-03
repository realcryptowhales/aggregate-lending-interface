import { makeAutoObservable } from 'mobx';

export default class MarketStore {
  totalMarket = '';
  matchTotalAmount = '';
  totalDepositAmount = '';
  totalLoanAmount = '';

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
}
