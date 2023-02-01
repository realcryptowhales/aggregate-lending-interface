import * as React from 'react';
import Home from '@containers/Home';
import Courses from '@/containers/Courses';
import Course from '@/containers/Course';
import Layout from '@containers/Layout';
import CoursesIndex from '@containers/CoursesIndex';
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
        element: <Courses />,
        children: [
          { index: true, element: <CoursesIndex /> },
          { path: '/markets/:id', element: <Course /> }
        ]
      },
      {
        path: '/porfolio',
        element: <Courses />,
        children: [
          { index: true, element: <CoursesIndex /> },
          { path: '/porfolio/:id', element: <Course /> }
        ]
      },
      { path: '*', element: <NoMatch /> }
    ]
  }
];

const router = createBrowserRouter(routes);

export default router;
