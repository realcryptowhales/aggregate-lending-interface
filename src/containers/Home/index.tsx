import * as React from 'react';
import useSWR from 'swr';
import { fetcher } from '@api/index';

const Home: React.FC = () => {
  const { data, error } = useSWR(
    'https://api.github.com/repos/ethereum/go-ethereum',
    fetcher
  );
  return (
    <div>
      <h2>Home</h2>
      {error && 'An error has occurred.'}
      {data ? (
        <>
          <h3>{data.name}</h3>
          <p>{data.description}</p>
          <strong>👁 {data.subscribers_count}</strong>{' '}
          <strong>✨ {data.stargazers_count}</strong>{' '}
          <strong>🍴 {data.forks_count}</strong>
        </>
      ) : (
        'Loading...'
      )}
      <hr />
    </div>
  );
};

export default Home;
