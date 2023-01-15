import { createContext, useContext } from 'react';
import testStore from './testStore';

export class RootStore {
  public testStore: testStore;
  constructor() {
    this.testStore = new testStore();
  }
}

export const store = new RootStore();

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
