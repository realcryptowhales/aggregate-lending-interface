import { createContext, useContext } from 'react';
import MarketStore from './marketStore';
import testStore from './testStore';

export class RootStore {
  public testStore: testStore;
  marketStore: MarketStore;
  constructor() {
    this.testStore = new testStore();
    this.marketStore = new MarketStore();
  }
}

export const store = new RootStore();

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
