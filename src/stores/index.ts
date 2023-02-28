import { createContext, useContext } from 'react';
import MarketStore from './marketStore';
import testStore from './testStore';
import PorfolioStore from './porfolioStore';
export class RootStore {
  public testStore: testStore;
  marketStore: MarketStore;
  porfolioStore: PorfolioStore;
  constructor() {
    this.testStore = new testStore();
    this.marketStore = new MarketStore();
    this.porfolioStore = new PorfolioStore();
  }
}

export const store = new RootStore();

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
