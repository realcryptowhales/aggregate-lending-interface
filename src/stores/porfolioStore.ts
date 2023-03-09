import BigNumber from 'bignumber.js';
import { BigNumberish } from 'ethers';
import { formatUnits } from 'ethers/lib/utils.js';
import { makeAutoObservable } from 'mobx';
import { formatContractData } from '@/utils/format';
import { RootStore } from '.';
import BN from 'bignumber.js';

export interface SuppliedInfo extends Array<any> {
  availableBalance: BigNumberish;
  collateral: boolean;
  dailyEstProfit: BigNumberish;
  depositApr: BigNumberish;
  depositValue: BigNumberish;
  depositAmount: BigNumberish;
  underlying: string;
}
export interface BorrowedInfo {
  borrowApr: BigNumberish;

  borrowLimit: BigNumberish;
  borrowValue: BigNumberish;
  borrowAmount: BigNumberish;

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
  rootStore: RootStore;
  userSuppliedList: any = [];
  userBorrowedList: any = [];
  borrowLimit = '';
  borrowingValue = '';
  collateralValue = ''; // 抵押品价值
  usedRatio = ''; // 已用比例

  userTotalSupplied = '';
  totalSuppliedApr = '';

  userTotalBorrowed = '';
  totalBorrowedApr = '';

  dailyEstProfit = ''; //今日预估总收益率
  totalBorrowInterest = ''; // 借款利息
  curLtv = '';
  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.rootStore = rootStore;
  }
  setSuppliedList(contractData: SuppliedInfo[]) {
    if (contractData === null) return;

    const { tokenMap } = this.rootStore.commonStore;
    this.userSuppliedList = contractData
      .map(formatContractData)
      .map(
        ({
          depositValue,
          depositAmount,
          availableBalance,
          dailyEstProfit,
          depositApr,
          underlying,
          supplies,
          totalMatched,
          ...rest
        }) => {
          const decimal = tokenMap[underlying.toLocaleLowerCase()]?.decimal;
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

          return {
            depositValue: formatUnits(depositValue, 6),
            depositAmount: formatUnits(depositAmount, decimal),
            availableBalance: formatUnits(availableBalance, decimal),
            dailyEstProfit: formatUnits(dailyEstProfit, 6),
            depositApr: formatUnits(depositApr, 6),
            symbol,
            underlying,
            matchedSupplyPercentage,
            // aaveSupplyPercentage,
            // compoundSupplyPercentage,
            protocolSupplyPercentage,
            ...rest
          };
        }
      );
  }
  setBorrowedList(contractData: any[]) {
    if (contractData === null) return;

    const { tokenMap } = this.rootStore.commonStore;

    this.userBorrowedList = contractData.map(formatContractData).map(
      ({
        underlying,
        borrowAmount,
        borrowValue,
        borrowApr,
        borrowLimit,
        dailyEstInterest,
        borrows,
        totalMatched,

        ...rest
      }) => {
        const decimal = tokenMap[underlying.toLocaleLowerCase()]?.decimal;
        const symbol = tokenMap[underlying.toLocaleLowerCase()]?.symbol;
        const matchedAmount = new BN(totalMatched.toString());

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
        return {
          borrowAmount: formatUnits(borrowAmount, decimal),
          borrowValue: formatUnits(borrowValue, 6),
          borrowApr: formatUnits(borrowApr, 6),
          borrowLimit: formatUnits(borrowLimit, decimal),
          dailyEstInterest: formatUnits(dailyEstInterest, 6),
          symbol,
          underlying,
          matchedBorrowPercentage,
          // aaveBorrowPercentage,
          // compoundBorrowPercentage,
          protocolBorrowPercentage,
          ...rest
        };
      }
    );
  }
  async computePorfolioData(data: PorfolioData) {
    let suppliedList: SuppliedInfo[],
      borrowedList: BorrowedInfo[],
      userInfo: UserInfo;
    // eslint-disable-next-line prefer-const
    [suppliedList = [], borrowedList = [], userInfo] = data;
    this.setSuppliedList(suppliedList || []);
    this.setBorrowedList(borrowedList || []);
    if (!this.userSuppliedList.length) {
      this.userTotalSupplied = '0';
      this.totalSuppliedApr = '0';
      this.dailyEstProfit = '0';
    }
    if (!this.userBorrowedList.length) {
      this.userTotalBorrowed = '0';
      this.totalBorrowedApr = '0';
    }
    suppliedList?.length &&
      this.computeTotalSupAprAndTotalSup(suppliedList || []);
    borrowedList?.length &&
      this.computeTotalBorAprAndTotalBor(borrowedList || []);
    this.borrowLimit = formatUnits(userInfo?.borrowLimit ?? 0, 6);
    this.userTotalBorrowed = formatUnits(userInfo?.borrowingValue ?? 0, 6);
    this.collateralValue = formatUnits(userInfo?.collateralValue ?? 0, 6);
    this.collateralValue = formatUnits(userInfo?.collateralValue ?? 0, 6);
    this.curLtv =
      +this.collateralValue === 0
        ? '0'
        : new BigNumber(this.userTotalBorrowed)
            .div(new BigNumber(this.collateralValue))
            .toFixed();
    console.log('this.curLtv', this.curLtv);
    //分母不能为0。分母为0返回NaN
    const totalAvailableBorrow = new BigNumber(
      userInfo?.borrowingValue?.toString() ?? 0
    ).plus(new BigNumber(userInfo?.borrowLimit?.toString() ?? 0));
    this.usedRatio = totalAvailableBorrow.isZero()
      ? '0'
      : new BigNumber(userInfo?.borrowingValue?.toString() ?? 0)
          .div(totalAvailableBorrow)
          .toString(10);
  }
  computeTotalSupAprAndTotalSup(suppliedList: SuppliedInfo[] = []) {
    let totalSupplied = new BigNumber(0),
      suppliedInterest = new BigNumber(0);
    // totalDailyEstProfit = new BigNumber(0);
    suppliedList.forEach(
      ({ depositValue, depositApr, dailyEstProfit }: SuppliedInfo) => {
        totalSupplied = totalSupplied.plus(
          new BigNumber(formatUnits(depositValue, 6))
        );
        // totalDailyEstProfit = totalDailyEstProfit.plus(
        //   new BigNumber(formatUnits(dailyEstProfit, 6))
        // );
        suppliedInterest = suppliedInterest.plus(
          new BigNumber(formatUnits(depositValue, 6)).multipliedBy(
            new BigNumber(formatUnits(depositApr, 6))
          )
        );
      }
    );
    this.dailyEstProfit = suppliedInterest.div(new BigNumber(365)).toFixed();
    this.totalSuppliedApr = suppliedInterest.div(totalSupplied).toFixed();
    this.userTotalSupplied = totalSupplied.toFixed();
  }
  computeTotalBorAprAndTotalBor(borrowedList: BorrowedInfo[] = []) {
    let totalBorrowed = new BigNumber(0),
      borrowedInterest = new BigNumber(0);
    borrowedList.forEach(({ borrowValue, borrowApr }: BorrowedInfo) => {
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
  }
  // 净收益率
  get netProfit() {
    if (this.userTotalSupplied === '') return '';
    if (this.userTotalSupplied === '0') return '0';

    const netInterest = new BigNumber(this.dailyEstProfit).minus(
      new BigNumber(
        this.totalBorrowInterest ? this.totalBorrowInterest : '0'
      ).div(365)
    );

    return netInterest.div(this.userTotalSupplied).toFixed();
  }
}
