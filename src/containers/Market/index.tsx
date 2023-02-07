import * as React from 'react';
import { useState } from 'react';
import Header from '@/components/Header';
import { Link } from 'react-router-dom';

function Market() {
  return (
    <div className="w-full">
      <h1>This is market page</h1>
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
      <div>
        <li>
          <Link to="/markets/plat-form">plat-form</Link>
        </li>
      </div>
    </div>
  );
}

export default Market;
