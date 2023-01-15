import { makeAutoObservable } from 'mobx';

export interface ITestStore {
  loading: boolean;
  contractInfo: any;
  setLoading: (loading: boolean) => void;
}

export default class TestStore implements ITestStore {
  public loading = false;
  public contractInfo = {
    blockHeight: 0,
    balanceOkt: 0,
    archivements: 0,
    waitTransactionQueueSize: 0
  };

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }
}
