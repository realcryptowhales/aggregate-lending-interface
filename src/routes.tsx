import * as React from 'react';
import Layout from '@/containers';
import Item from './containers/Item';
import Liquidation from './containers/Liquidation';
import NoMatch from '@/components/NoMatch';
import Redirect from '@/components/Redirect';
import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import Porfolio from './containers/Porfolio';
import Markets from './containers/Markets';

const routes: RouteObject[] = [
  {
    path: '/aggregate-lending-web',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Redirect to="/aggregate-lending-web/markets" />
      },
      {
        path: '/aggregate-lending-web/markets',
        children: [
          { index: true, element: <Markets /> },
          { path: '/aggregate-lending-web/markets/token', element: <Item /> }
        ]
      },
      {
        path: '/aggregate-lending-web/porfolio',
        children: [
          { index: true, element: <Porfolio /> },
          {
            path: '/aggregate-lending-web/porfolio/liquidation',
            element: <Liquidation />
          },
          { path: '/aggregate-lending-web/porfolio/token', element: <Item /> }
        ]
      },
      { path: '/aggregate-lending-web/*', element: <NoMatch /> }
      // { path: '*', element: <Redirect to="/markets" /> }
    ]
  }
];

const router = createBrowserRouter(routes);

export default router;
