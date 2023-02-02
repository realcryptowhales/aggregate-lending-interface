import * as React from 'react';
import { Link } from 'react-router-dom';

function Porfolio() {
  return (
    <div className="w-full">
      <h1>This is porfolio page</h1>
      <Link to="liquidation">go to asset liquidation</Link>
      <ul>
        <li>
          <Link to="BTC">go BTC</Link>
        </li>
        <li>
          <Link to="ETH">go ETH</Link>
        </li>
        <li>
          <Link to="OKB">go OKB</Link>
        </li>
      </ul>
    </div>
  );
}

export default Porfolio;
