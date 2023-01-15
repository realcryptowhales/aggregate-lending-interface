import * as React from 'react';
import Home from '@containers/Home';
import Courses from '@/containers/Courses';
import Course from '@/containers/Course';
import Layout from '@containers/Layout';
import CoursesIndex from '@containers/CoursesIndex';
import NoMatch from '@containers/NoMatch';
import type { RouteObject } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import TestBanner from '@components/TestBanner';
import Button from '@mui/material/Button';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: '/courses',
        element: <Courses />,
        children: [
          { index: true, element: <CoursesIndex /> },
          { path: '/courses/:id', element: <Course /> }
        ]
      },
      { path: '*', element: <NoMatch /> }
    ]
  }
];

export const Routes = () => {
  const element = useRoutes(routes);

  return (
    <>
      <TestBanner />
      <Button variant="contained">Material Button</Button>
      {element}
    </>
  );
};

export default Routes;
