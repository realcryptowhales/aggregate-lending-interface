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

export default Market;
