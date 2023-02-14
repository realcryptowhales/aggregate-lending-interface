import * as React from 'react';
import Layout from '@containers/Layout';
import MarketItem from '@/containers/Home/MarketItem';
import PorfolioItem from './containers/MyAsset/PorfolioItem';
import Liquidation from './containers/Liquidation';
import NoMatch from '@containers/NoMatch';
import Redirect from '@/components/Redirect';
import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import MyAsset from './containers/MyAsset';
import Home from './containers/Home';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Redirect to="/markets" /> },
      {
        path: '/markets',
        children: [
          { index: true, element: <Home /> },
          { path: '/markets/:id', element: <MarketItem /> }
        ]
      },
      {
        path: '/porfolio',
        children: [
          { index: true, element: <MyAsset /> },
          { path: '/porfolio/liquidation', element: <Liquidation /> },
          { path: '/porfolio/:id', element: <PorfolioItem /> }
        ]
      },
      { path: '*', element: <NoMatch /> }
      // { path: '*', element: <Redirect to="/markets" /> }
    ]
  }
];

const router = createBrowserRouter(routes);

export default router;
