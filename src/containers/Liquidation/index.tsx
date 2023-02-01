import * as React from 'react';
import { Link } from 'react-router-dom';

function Liquidation() {
  return (
    <div className="w-full">
      <h1>This is asset liquidation page</h1>
      <Link to="/porfolio">back to porfolio</Link>
    </div>
  );
}

export default Liquidation;
