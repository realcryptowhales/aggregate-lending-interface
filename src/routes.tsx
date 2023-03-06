import * as React from 'react';
import Layout from '@/containers';
// import MarketItem from '@/containers/Markets/MarketItem';
import Item from './containers/Item';
import Liquidation from './containers/Liquidation';
import NoMatch from '@/components/NoMatch';
import Redirect from '@/components/Redirect';
import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import Porfolio from './containers/Porfolio';
import Markets from './containers/Markets';
import Test from './containers/Test';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Redirect to="/markets" /> },
      {
        path: '/markets',
        children: [
          { index: true, element: <Markets /> },
          { path: '/markets/token', element: <Item /> }
        ]
      },
      {
        path: '/porfolio',
        children: [
          { index: true, element: <Porfolio /> },
          { path: '/porfolio/liquidation', element: <Liquidation /> },
          { path: '/porfolio/token', element: <Item /> }
        ]
      },
      {
        path: '/test',
        children: [{ index: true, element: <Test /> }]
      },
      { path: '*', element: <NoMatch /> }
      // { path: '*', element: <Redirect to="/markets" /> }
    ]
  }
];

const router = createBrowserRouter(routes);

export default router;
