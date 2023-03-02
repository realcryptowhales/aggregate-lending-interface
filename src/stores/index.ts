import { createContext, useContext } from 'react';
import MarketStore from './marketStore';
import commonStore from './commonStore';
import PorfolioStore from './porfolioStore';
export class RootStore {
  public commonStore: commonStore;
  marketStore: MarketStore;
  porfolioStore: PorfolioStore;
  constructor() {
    this.commonStore = new commonStore();
    this.marketStore = new MarketStore();
    this.porfolioStore = new PorfolioStore();
  }
}

export const store = new RootStore();

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
