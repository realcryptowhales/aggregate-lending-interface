export const IS_TEST = true;
export const currencyList: { [key: string]: { icon: string; symbol: string } } =
  {
    BTC: {
      icon: 'https://static.okx.com/cdn/assets/imgs/221/C25FE324914596B9.png',
      symbol: 'BTC'
    },
    ETH: {
      icon: 'https://static.okx.com/cdn/assets/imgs/221/5F33E3F751873296.png',
      symbol: 'ETH'
    },
    OKB: {
      icon: 'https://static.okx.com/cdn/announce/20220119/1642588815382f0fd4a29-ba95-4ba9-ab33-23c1258ce96a.png',
      symbol: 'OKB'
    },
    LTC: {
      icon: 'https://static.okx.com/cdn/assets/imgs/221/8EC634AF717771B6.png',
      symbol: 'LTC'
    },
    USDT: {
      icon: 'https://static.okx.com/cdn/assets/imgs/221/5F74EB20302D7761.png',
      symbol: 'USDT'
    }
  };
export enum TOKENSYMBOL {
  BTC = 'BTC',
  ETH = 'ETH',
  OKB = 'OKB',
  USDT = 'USDT',
  LTC = 'LTC'
}
