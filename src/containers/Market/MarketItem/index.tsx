import * as React from 'react';
import { Link, useParams } from 'react-router-dom';

function capitalizeString(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function MarketItem() {
  const { id } = useParams<'id'>();

  return (
    <div className="w-full">
      <h1>This is item page for market</h1>
      <h2>
        Welcome to the {id!.split('-').map(capitalizeString).join(' ')} course!
      </h2>
      <Link to="/markets">back to markets</Link>
    </div>
  );
}

export default MarketItem;
