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
import ScrollTab from '@components/ScrollTab';
import Button from '@mui/material/Button';
import Porfolio from './containers/Porfolio';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/test',
    element: <Porfolio />
  }
];

export const Routes = () => {
  const element = useRoutes(routes);
  console.log('element', element);
  return <>{element}</>;
};

export default Routes;
