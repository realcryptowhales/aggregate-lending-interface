import { mockUSDTAddr } from '@/constant/contract';
import BigNumber from 'bignumber.js';
import { BigNumberish } from 'ethers';
import { formatUnits } from 'ethers/lib/utils.js';
import { makeAutoObservable } from 'mobx';
import { queryHelperContract } from './marketStore';
import { multicall } from '@wagmi/core';
const unmeaningAddr = '0x0000000000000000000000000000000000000000';
export interface SuppliedInfo {
  availableBalance: BigNumberish;
  collateral: boolean;
  dailyEstProfit: BigNumberish;
  depositApr: BigNumberish;
  depositValue: BigNumberish;
  underlying: string;
}
export interface BorrowedInfo {
  borrowApr: BigNumberish;

  borrowLimit: BigNumberish;
  borrowValue: BigNumberish;
  dailyEstInterest: BigNumberish;
  underlying: string;
}
export interface UserInfo {
  borrowLimit: BigNumberish;
  borrowingValue: BigNumberish;
  collateralValue: BigNumberish;
}
export type PorfolioData = [SuppliedInfo[], BorrowedInfo[], UserInfo];
export default class PorfolioStore {
  userSuppliedList: any[] = [];
  userBorrowedList: any[] = [];
  borrowLimit = '';
  borrowingValue = '';
  collateralValue = '';
  usedRatio = '';

  userTotalSupplied = '';
  totalSuppliedApr = '';

  userTotalBorrowed = '';
  totalBorrowedApr = '';

  dailyEstProfit = '';
  totalBorrowInterest = '';
  a = 1;
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async computePorfolioData(data: PorfolioData) {
    let suppliedList: SuppliedInfo[],
      borrowedList: BorrowedInfo[],
      userInfo: UserInfo;
    // eslint-disable-next-line prefer-const
    [suppliedList = [], borrowedList = [], userInfo] = data;
    this.userSuppliedList = suppliedList;
    this.userBorrowedList = borrowedList;

    suppliedList.length && this.computeTotalSupAprAndTotalSup(suppliedList);
    borrowedList.length && this.computeTotalBorAprAndTotalBor(borrowedList);
    this.borrowLimit = formatUnits(userInfo?.borrowLimit ?? 0, 6);
    this.userTotalBorrowed = formatUnits(userInfo?.borrowingValue ?? 0, 6);
    this.collateralValue = formatUnits(userInfo?.collateralValue ?? 0, 6);
    this.usedRatio = new BigNumber(userInfo?.borrowingValue.toString())
      .div(
        new BigNumber(userInfo?.borrowingValue.toString()).plus(
          new BigNumber(userInfo?.borrowLimit.toString())
        )
      )
      .toString(10);
    console.log('this.borrowLimit', this.borrowLimit);
    console.log('this.borrowingValue', this.borrowingValue);
    console.log('this.collateralValue', this.collateralValue);
    console.log('this.usedRatio', this.usedRatio);
  }
  computeTotalSupAprAndTotalSup(suppliedList: SuppliedInfo[] = []) {
    let totalSupplied = new BigNumber(0),
      suppliedInterest = new BigNumber(0);

    suppliedList.forEach(({ depositValue, depositApr }: SuppliedInfo) => {
      console.log('depositValue.toString()', depositValue.toString());

      totalSupplied = totalSupplied.plus(
        new BigNumber(formatUnits(depositValue, 6))
      );

      suppliedInterest = suppliedInterest.plus(
        new BigNumber(formatUnits(depositValue, 6)).multipliedBy(
          // new BigNumber(formatUnits(depositApr, 6)) todo
          new BigNumber(0.7)
        )
      );
    });
    console.log('suppliedInterest', suppliedInterest.toFixed());
    this.dailyEstProfit = suppliedInterest.toFixed();
    console.log('this.dailyEstProfit', this.dailyEstProfit);
    this.totalSuppliedApr = suppliedInterest.div(totalSupplied).toFixed();
    this.userTotalSupplied = totalSupplied.toFixed();
    console.log('this.totalSuppliedApr', this.totalSuppliedApr);
    console.log('this.userTotalSupplied', this.userTotalSupplied);
  }
  computeTotalBorAprAndTotalBor(borrowedList: BorrowedInfo[] = []) {
    let totalBorrowed = new BigNumber(0),
      borrowedInterest = new BigNumber(0);
    borrowedList.forEach(({ borrowValue, borrowApr }: BorrowedInfo) => {
      console.log('depositValue.toString()', borrowValue.toString());
      totalBorrowed = totalBorrowed.plus(
        new BigNumber(formatUnits(borrowValue, 6))
      );

      borrowedInterest = borrowedInterest.plus(
        new BigNumber(formatUnits(borrowValue, 6)).multipliedBy(
          new BigNumber(formatUnits(borrowApr, 6))
        )
      );
    });
    this.totalBorrowInterest = borrowedInterest.toFixed();
    this.totalBorrowedApr = borrowedInterest.div(totalBorrowed).toFixed();

    // this.userTotalBorrowed = totalBorrowed.toFixed();
    console.log('this.totalBorrowedApr', this.totalBorrowedApr);
    console.log('this.userTotalBorrowed', this.userTotalBorrowed);
  }
  get netProfit() {
    if (!this.dailyEstProfit && !this.totalBorrowInterest) return '';
    const netInterest = new BigNumber(
      this.dailyEstProfit ? this.dailyEstProfit : '0'
    ).minus(
      new BigNumber(this.totalBorrowInterest ? this.totalBorrowInterest : '0')
    );
    console.log('borInterest', this.userTotalSupplied);
    return netInterest.div(this.userTotalSupplied).toFixed();
  }
}
