import { createContext, useContext } from 'react';
import MarketStore from './marketStore';
import commonStore from './commonStore';
import PorfolioStore from './porfolioStore';
import { ethers } from 'ethers';
export class RootStore {
  public commonStore: commonStore;
  marketStore: MarketStore;
  porfolioStore: PorfolioStore;
  constructor() {
    this.commonStore = new commonStore();
    this.marketStore = new MarketStore(this);
    this.porfolioStore = new PorfolioStore(this);
  }
}

export const store = new RootStore();

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
