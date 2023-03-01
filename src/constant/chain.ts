import {
  // mainnet,
  //  polygon,
  //   optimism,
  //   arbitrum,
  Chain
} from 'wagmi/chains';

const okcChain: Chain = {
  id: 66,
  name: 'OKC',
  network: 'okc',
  iconUrl:
    'https://static.oklink.com/cdn/explorer/oklinkmanage/picture/okc_logo.png',
  nativeCurrency: {
    decimals: 18,
    name: 'OKT',
    symbol: 'OKT'
  },
  rpcUrls: {
    default: { http: ['https://exchainrpc.okex.org'] },
    public: { http: ['https://exchainrpc.okex.org'] }
  },
  blockExplorers: {
    default: { name: 'oklink', url: 'https://www.oklink.com/okc' }
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 10364792
    }
  },
  testnet: false
} as any;

const okcTestChain: Chain = {
  id: 65,
  name: 'OKC testnet',
  network: 'okcTest',
  iconUrl:
    'https://static.oklink.com/cdn/explorer/oklinkmanage/picture/okc_logo.png',
  nativeCurrency: {
    decimals: 18,
    name: 'OKT',
    symbol: 'OKT'
  },
  rpcUrls: {
    public: { http: ['https://exchaintestrpc.okex.org'] },
    default: { http: ['https://exchaintestrpc.okex.org'] }
  },
  blockExplorers: {
    default: { name: 'oklink', url: 'https://www.oklink.com/okc-test' }
  },
  contracts: {
    multicall3: {
      address: '0x135F4b91e85f4e1F71D31E883a13292dEEBD8c46',
      blockCreated: 10364792
    }
  },
  testnet: true
} as any;

export const chainList = [
  // mainnet,
  // polygon,
  // optimism,
  // arbitrum,
  okcTestChain,
  okcChain
];
