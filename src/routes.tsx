import * as React from 'react';
import Home from '@containers/Home';
import Layout from '@containers/Layout';
import Martket from '@containers/Market';
import MarketItem from '@containers/Market/MarketItem';
import Porfolio from './containers/Porfolio';
import PorfolioItem from './containers/Porfolio/PorfolioItem';
import NoMatch from '@containers/NoMatch';
import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
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
          { path: '/porfolio/:id', element: <PorfolioItem /> }
        ]
      },
      { path: '*', element: <NoMatch /> }
    ]
  }
];

const router = createBrowserRouter(routes);

export default router;
