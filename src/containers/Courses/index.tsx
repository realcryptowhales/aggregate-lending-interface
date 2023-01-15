import * as React from 'react';
import { Outlet } from 'react-router-dom';

function Courses() {
  return (
    <div>
      <h2>Courses</h2>
      <Outlet />
    </div>
  );
}

export default Courses;
