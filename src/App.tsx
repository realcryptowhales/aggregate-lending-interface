import React from 'react';
import ReactDOM from 'react-dom/client';
import '@styles/index.less';
import 'uno.css';
import { StoreContext, store } from '@stores/index';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@/font/iconfont.css';
import '@/font/iconfont.js';

const theme = createTheme({
  palette: {
    primary: {
      main: '#dbdbdb'
    }
  }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </StoreContext.Provider>
  </React.StrictMode>
);
