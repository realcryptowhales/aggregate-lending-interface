import { createContext, useContext } from 'react';
import TestStore from './TestStore';

export class RootStore {
  public testStore: TestStore;
  constructor() {
    this.testStore = new TestStore();
  }
}

export const store = new RootStore();

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
