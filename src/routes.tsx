import * as React from 'react';
import Layout from '@containers/Layout';
import Martket from '@containers/Market';
import MarketItem from '@containers/Market/MarketItem';
import Porfolio from './containers/Porfolio';
import PorfolioItem from './containers/Porfolio/PorfolioItem';
import Liquidation from './containers/Liquidation';
import NoMatch from '@containers/NoMatch';
import Redirect from '@/components/Redirect';
import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Redirect to="/markets" /> },
      {
        path: '/markets',
        children: [
          { index: true, element: <Martket /> },
          { path: '/markets/:id', element: <MarketItem /> }
        ]
      },
      {
        path: '/porfolio',
        children: [
          { index: true, element: <Porfolio /> },
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
