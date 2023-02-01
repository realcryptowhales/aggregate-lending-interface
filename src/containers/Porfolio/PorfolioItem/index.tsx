import * as React from 'react';
import { Link, useParams } from 'react-router-dom';

function capitalizeString(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function PorfolioItem() {
  const { id } = useParams<'id'>();

  return (
    <div className="w-full">
      <h1>This is item page for porfolio</h1>
      <h2>
        Welcome to the {id!.split('-').map(capitalizeString).join(' ')} course!
      </h2>
      <Link to="/porfolio">back to porfolio</Link>
    </div>
  );
}

export default PorfolioItem;
