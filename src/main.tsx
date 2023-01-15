import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@styles/index.less';
import 'uno.css';
import { BrowserRouter } from 'react-router-dom';
import { StoreContext, store } from '@stores/index';
// import CssBaseline from '@mui/material/CssBaseline';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreContext.Provider value={store}>
        {/* normalize css for material */}
        {/* <CssBaseline /> */}
        <App />
      </StoreContext.Provider>
    </BrowserRouter>
  </React.StrictMode>
);
