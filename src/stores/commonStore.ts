import { makeAutoObservable } from 'mobx';
interface TokenInfo {
  address: string;
  symbol: string;
  name: string;
  icon: string;
  decimal: number;
}
type TokenMap = Record<string, TokenInfo>;
export default class CommonStore {
  tokenMap: TokenMap = {};
  tokenList: TokenInfo[] = [];
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  setTokenMap(tokenList: TokenInfo[] = []) {
    this.tokenList = tokenList;
    tokenList.map(({ address, ...rest }) => {
      this.tokenMap[address] = { address, ...rest };
    });
  }
}
