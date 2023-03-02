import { mockUSDTAddr } from '@/constant/contract';
import BigNumber from 'bignumber.js';
import { BigNumberish } from 'ethers';
import { formatUnits } from 'ethers/lib/utils.js';
import { makeAutoObservable } from 'mobx';
import { queryHelperContract } from './marketStore';
import { multicall } from '@wagmi/core';
import { formatContractData } from '@/utils/format';
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
  userSuppliedList: any = [];
  userBorrowedList: any = [];
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
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  setSuppliedList(contractData: any[]) {
    this.userSuppliedList = contractData.map(formatContractData);
  }
  setBorrowedList(contractData: any[]) {
    this.userBorrowedList = contractData.map(formatContractData);
  }
  async computePorfolioData(data: PorfolioData) {
    let suppliedList: SuppliedInfo[],
      borrowedList: BorrowedInfo[],
      userInfo: UserInfo;
    // eslint-disable-next-line prefer-const
    [suppliedList = [], borrowedList = [], userInfo] = data;
    console.log('suppliedList', suppliedList);
    this.setSuppliedList(suppliedList);
    this.setBorrowedList(borrowedList);
    if (!this.userSuppliedList.length) {
      this.userTotalSupplied = '0';
      this.totalSuppliedApr = '0';
      this.dailyEstProfit = '0';
    }
    if (!this.userBorrowedList.length) {
      this.userTotalBorrowed = '0';
      this.totalBorrowedApr = '0';
    }
    suppliedList.length && this.computeTotalSupAprAndTotalSup(suppliedList);
    borrowedList.length && this.computeTotalBorAprAndTotalBor(borrowedList);
    this.borrowLimit = formatUnits(userInfo?.borrowLimit ?? 0, 6);
    this.userTotalBorrowed = formatUnits(userInfo?.borrowingValue ?? 0, 6);
    this.collateralValue = formatUnits(userInfo?.collateralValue ?? 0, 6);
    //分母不能为0。分母为0返回NaN
    this.usedRatio =
      +this.borrowLimit > 0
        ? new BigNumber(userInfo?.borrowingValue.toString())
            .div(
              new BigNumber(userInfo?.borrowingValue.toString()).plus(
                new BigNumber(userInfo?.borrowLimit.toString())
              )
            )
            .toString(10)
        : '';
    console.log(new BigNumber(0).toString(), 'sdasdad');

    console.log('this.borrowLimit', this.borrowLimit);
    console.log('this.userTotalBorrowed', this.userTotalBorrowed);
    console.log('this.collateralValue', this.collateralValue);
    console.log('this.usedRatio', this.usedRatio);
  }
  computeTotalSupAprAndTotalSup(suppliedList: SuppliedInfo[] = []) {
    let totalSupplied = new BigNumber(0),
      suppliedInterest = new BigNumber(0);

    suppliedList.forEach(({ depositValue, depositApr }: SuppliedInfo) => {
      console.log('depositValue.toString()', depositValue.toString());
      console.log(formatUnits(depositApr, 6), 'sadadadsadas');

      totalSupplied = totalSupplied.plus(
        new BigNumber(formatUnits(depositValue, 6))
      );

      suppliedInterest = suppliedInterest.plus(
        new BigNumber(formatUnits(depositValue, 6)).multipliedBy(
          new BigNumber(formatUnits(depositApr, 6))
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
    if (!this.userSuppliedList.length) return '0';
    const netInterest = new BigNumber(this.dailyEstProfit).minus(
      new BigNumber(this.totalBorrowInterest ? this.totalBorrowInterest : '0')
    );
    console.log('borInterest', this.userTotalSupplied);
    return netInterest.div(this.userTotalSupplied).toFixed();
  }
}
