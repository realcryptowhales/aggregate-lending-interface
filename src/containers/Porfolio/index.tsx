import * as React from 'react';
import { Link } from 'react-router-dom';

function Porfolio() {
  return (
    <div className="w-full">
      <h1>This is porfolio page</h1>
      <ul>
        <li>
          <Link to="item1">go item1</Link>
        </li>
        <li>
          <Link to="item2">go item2</Link>
        </li>
        <li>
          <Link to="item3">go item3</Link>
        </li>
      </ul>
    </div>
  );
}

export default Porfolio;
