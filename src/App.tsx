import React from 'react';
import ReactDOM from 'react-dom/client';
import '@styles/index.css';
import 'uno.css';
import { StoreContext, store } from '@stores/index';
import { RouterProvider } from 'react-router-dom';
import {
  RainbowKitProvider,
  connectorsForWallets
} from '@rainbow-me/rainbowkit';
import { chainList } from '@constant/index';
import { metaMaskWallet, injectedWallet } from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import router from './routes';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@/font/iconfont.css';
import '@/font/iconfont.js';
import '@rainbow-me/rainbowkit/styles.css';

const { chains, provider } = configureChains(chainList, [publicProvider()]);

const connectors = connectorsForWallets([
  {
    groupName: 'Wallets',
    wallets: [
      injectedWallet({ chains }), // okx wallet
      metaMaskWallet({ chains })
    ]
  }
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#dbdbdb'
    }
  }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <StoreContext.Provider value={store}>
          <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
          </ThemeProvider>
        </StoreContext.Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
