import { routerAddr, priceOracleAddr, mockUSDTAddr } from '@/constant/contract';
import { ThreeGMobiledataSharp } from '@mui/icons-material';
import { multicall } from '@wagmi/core';
import BigNumber from 'bignumber.js';
import { BigNumberish, ethers } from 'ethers';
import { formatUnits } from 'ethers/lib/utils.js';
import { makeAutoObservable, toJS } from 'mobx';
import { queryHelperContract } from './marketStore';
const unmeaningAddr = '0x0000000000000000000000000000000000000000';
interface SuppliedInfo {
  availableBalance: BigNumberish;
  collateral: boolean;
  dailyEstProfit: BigNumberish;
  depositApr: BigNumberish;
  depositValue: BigNumberish;
  underlying: string;
}
interface BorrowedInfo {
  borrowApr: BigNumberish;

  borrowLimit: BigNumberish;
  borrowValue: BigNumberish;
  dailyEstInterest: BigNumberish;
  underlying: string;
}
export default class PorfolioStore {
  userSuppliedList: any[] = [];
  userBorrowedList: any[] = [];
  borrowLimit = '';
  borrowingValue = '';
  collateralValue = '';
  usedRatio = '';
  userTotalSupplied = '';
  totalSuppliedApr = '';
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getUserSupplied(userAddr: string) {
    let suppliedList: any, borrowedList: any, userInfo: any;

    try {
      [suppliedList = [], borrowedList = [], userInfo] = await multicall({
        contracts: [
          {
            ...queryHelperContract,
            functionName: 'getUserSupplied',
            args: [userAddr]
          },
          {
            ...queryHelperContract,
            functionName: 'getUserBorrowed',
            args: [userAddr]
          },
          {
            ...queryHelperContract,
            functionName: 'getUserInfo',
            args: ['0x49f8948c60cE2b4180DEf540f03148540268C5B0', mockUSDTAddr]
          }
        ]
      });
    } catch (error) {
      console.log('error', error);
    }
    this.formatSuppliedList(suppliedList);
    this.userBorrowedList = borrowedList;

    this.borrowLimit = formatUnits(userInfo?.borrowLimit ?? 0, 6);
    this.borrowingValue = formatUnits(userInfo?.borrowingValue ?? 0, 6);
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
  formatSuppliedList(suppliedList: SuppliedInfo[]) {
    let totalSupplied = new BigNumber(0),
      suppliedInterest = new BigNumber(0);
    const userSuppliedList = suppliedList?.filter(
      ({ underlying, depositValue, depositApr }: SuppliedInfo) => {
        console.log('depositValue.toString()', depositValue.toString());
        if (underlying !== unmeaningAddr) {
          totalSupplied = totalSupplied.plus(
            new BigNumber(depositValue.toString())
          );

          suppliedInterest = suppliedInterest.plus(
            new BigNumber(depositValue.toString()).multipliedBy(
              new BigNumber(depositApr.toString())
            )
          );
        }
        return underlying !== unmeaningAddr;
      }
    );
    const totalSuppliedApr = suppliedInterest.div(totalSupplied);
    console.log('totalSuppliedApr3213131', totalSuppliedApr);
    this.totalSuppliedApr = totalSuppliedApr.toFixed();
    this.userTotalSupplied = totalSupplied.toFixed();
    console.log('userSuppliedList', userSuppliedList);
    console.log('this.totalSuppliedApr', this.totalSuppliedApr);
    console.log('this.userTotalSupplied', this.userTotalSupplied);
  }
}
