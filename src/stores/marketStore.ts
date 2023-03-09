import { queryHelperABI } from '@/constant';
import { queryHelperContractAddr } from '@/constant/contract';
import {
  formatContractData,
  formatPercent,
  rawToPercent,
  rawToThousandCurrency,
  thousandCurrency
} from '@/utils/format';
import { BigNumber, BigNumberish } from 'ethers';
import { formatUnits } from 'ethers/lib/utils.js';
import { makeAutoObservable } from 'mobx';
import { RootStore } from '.';
import BN from 'bignumber.js';
export const queryHelperContract = {
  address: queryHelperContractAddr as `0x${string}`,
  abi: queryHelperABI
};
interface MarketCurrencyInfo {
  underlying: string;
  borrowRate: BigNumberish;
  supplyRate: BigNumberish;
  totalBorrowed: BigNumberish;
  totalMatched: BigNumberish;
  totalSupplied: BigNumberish;
}
interface BorrowAprInfo {
  aaveBorrowRate: BigNumber;
  aggBorrowRate: BigNumber;
  compBorrowRate: BigNumber;
}
interface SupplyAprInfo {
  aaveSupplyRate: BigNumber;
  aggSupplyRate: BigNumber;
  compSupplyRate: BigNumber;
}

export default class MarketStore {
  rootStore: RootStore;

  totalValue = '--';
  matchTotalValue = '--';
  totalSupplyValue = '--';
  totalBorrowValue = '--';

  supplyAggregationPlatformApr = '--';
  supplyAaveApr = '--';
  supplyCompoundApr = '--';

  borrowAggregationPlatformApr = '--';
  borrowAaveApr = '--';
  borrowCompoundApr = '--';

  marketTableList: MarketCurrencyInfo[] = [];
  bestSupApr = '聚合平台';
  bestBroApr = '聚合平台';

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.rootStore = rootStore;
  }
  // async setPlatformInfo(platFormInfo: any[]) {
  //   this.totalSupplyValue = rawToThousandCurrency(platFormInfo?.[0], 6);
  //   this.totalBorrowValue = rawToThousandCurrency(platFormInfo?.[1], 6);
  //   this.matchTotalValue = rawToThousandCurrency(platFormInfo?.[2], 6);
  //   this.totalValue = rawToThousandCurrency(
  //     platFormInfo?.[0].add(platFormInfo?.[1]),
  //     6
  //   );
  // }
  computeBestSupApr(aave: number, com: number, agg: number) {
    const maxSupApr = Math.max(aave, com, agg);
    if (agg === maxSupApr) return '聚合平台';
    else if (aave === maxSupApr) return 'AAVE';
    else if (com === maxSupApr) return 'Compound';
    return '聚合平台';
  }
  computeBestBroApr(aave: number, com: number, agg: number) {
    const minBroApr = Math.min(aave, com, agg);
    if (agg === minBroApr) return '聚合平台';
    else if (aave === minBroApr) return 'AAVE';
    else if (com === minBroApr) return 'Compound';
    return '聚合平台';
  }
  async setCurrentSupplyRates(supplyRates: SupplyAprInfo) {
    this.bestSupApr = this.computeBestSupApr(
      +formatUnits(supplyRates?.aaveSupplyRate || 0, 6),
      +formatUnits(supplyRates?.compSupplyRate || 0, 6),
      +formatUnits(supplyRates?.aggSupplyRate || 0, 6)
    );
    this.supplyAaveApr = rawToPercent(supplyRates?.aaveSupplyRate, 6);
    this.supplyCompoundApr = rawToPercent(supplyRates?.compSupplyRate, 6);
    this.supplyAggregationPlatformApr = rawToPercent(
      supplyRates?.aggSupplyRate,
      6
    );
  }
  async setCurrentBorrowRates(borrowRates: BorrowAprInfo) {
    this.bestBroApr = this.computeBestBroApr(
      +formatUnits(borrowRates?.aaveBorrowRate || 0, 6),
      +formatUnits(borrowRates?.compBorrowRate || 0, 6),
      +formatUnits(borrowRates?.compBorrowRate || 0, 6)
    );
    this.borrowAaveApr = rawToPercent(borrowRates?.aaveBorrowRate, 6);
    this.borrowCompoundApr = rawToPercent(borrowRates?.compBorrowRate, 6);
    this.borrowAggregationPlatformApr = rawToPercent(
      borrowRates?.aggBorrowRate,
      6
    );
  }
  async setMarketsInfo(marketTableList: any[]) {
    const { tokenMap } = this.rootStore.commonStore;
    let totalSuppliedValue = new BN(0);
    let totalBorrowedValue = new BN(0);
    let totalMatchValue = new BN(0);
    this.marketTableList = marketTableList
      .map(formatContractData)
      .map(
        ({
          underlying,
          supplies,
          supplyRate,
          borrows,
          borrowRate,
          totalMatched
        }) => {
          const symbol = tokenMap[underlying.toLocaleLowerCase()]?.symbol;

          const matchedAmount = new BN(totalMatched.toString());

          const supplyAaveAmount = new BN(supplies[0].toString());
          const supplyCompoundAmount = new BN(supplies[1].toString());
          const supplyProtocolAmount =
            supplyAaveAmount.plus(supplyCompoundAmount);

          const supplyTotalAmount = supplyAaveAmount
            .plus(supplyCompoundAmount)
            .plus(matchedAmount);
          let matchedSupplyPercentage;
          // let aaveSupplyPercentage;
          // let compoundSupplyPercentage;
          let protocolSupplyPercentage;
          if (supplyTotalAmount.isZero()) {
            matchedSupplyPercentage = '0';
            protocolSupplyPercentage = '1';
          } else {
            matchedSupplyPercentage = matchedAmount
              .div(supplyTotalAmount)
              .toFixed();
            // aaveSupplyPercentage = supplyAaveAmount
            //   .div(supplyTotalAmount)
            //   .toFixed();
            // compoundSupplyPercentage = supplyCompoundAmount
            //   .div(supplyTotalAmount)
            //   .toFixed();
            protocolSupplyPercentage = supplyProtocolAmount
              .div(supplyTotalAmount)
              .toFixed();
          }
          const borrowAaveAmount = new BN(borrows[0].toString());
          const borrowCompoundAmount = new BN(borrows[1].toString());
          const borrowProtocolAmount =
            borrowAaveAmount.plus(borrowCompoundAmount);
          const borrowTotalAmount = borrowAaveAmount
            .plus(borrowCompoundAmount)
            .plus(matchedAmount);
          let matchedBorrowPercentage;
          // let aaveBorrowPercentage;
          // let compoundBorrowPercentage;
          let protocolBorrowPercentage;
          if (borrowTotalAmount.isZero()) {
            console.log('symbol', symbol);
            matchedBorrowPercentage = '0';
            protocolBorrowPercentage = '1';
          } else {
            matchedBorrowPercentage = matchedAmount
              .div(borrowTotalAmount)
              .toFixed();
            // aaveBorrowPercentage = borrowAaveAmount
            //   .div(borrowTotalAmount)
            //   .toFixed();
            // compoundBorrowPercentage = borrowCompoundAmount
            //   .div(borrowTotalAmount)
            //   .toFixed();
            protocolBorrowPercentage = borrowProtocolAmount
              .div(borrowTotalAmount)
              .toFixed();
          }
          totalSuppliedValue = totalSuppliedValue.plus(supplyTotalAmount);
          totalBorrowedValue = totalBorrowedValue.plus(borrowTotalAmount);
          totalMatchValue = totalMatchValue.plus(matchedAmount);

          // const decimal = tokenMap[underlying.toLocaleLowerCase()]?.decimal;
          return {
            totalSupplied: formatUnits(supplyTotalAmount.toFixed(), 6),
            supplyRate: formatUnits(supplyRate, 6),
            totalBorrowed: formatUnits(borrowTotalAmount.toFixed(), 6),
            borrowRate: formatUnits(borrowRate, 6),
            totalMatched: formatUnits(totalMatched, 6),
            symbol,
            underlying,
            matchedSupplyPercentage,
            // aaveSupplyPercentage,
            // compoundSupplyPercentage,
            protocolSupplyPercentage,
            matchedBorrowPercentage,
            // aaveBorrowPercentage,
            // compoundBorrowPercentage,
            protocolBorrowPercentage
          };
        }
      );
    this.totalSupplyValue = thousandCurrency(
      totalSuppliedValue.div(10 ** 6).toFixed()
    );
    this.totalBorrowValue = thousandCurrency(
      totalBorrowedValue.div(10 ** 6).toFixed()
    );
    this.matchTotalValue = thousandCurrency(
      totalMatchValue.div(10 ** 6).toFixed()
    );
    this.totalValue = thousandCurrency(
      totalSuppliedValue
        .plus(totalBorrowedValue)
        .div(10 ** 6)
        .toFixed()
    );
  }
}
