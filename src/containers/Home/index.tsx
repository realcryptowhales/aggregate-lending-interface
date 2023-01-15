import * as React from 'react';
import useSWR from 'swr';
import { fetcher } from '@api/index';

function Home() {
  const { data, error } = useSWR(
    'https://api.github.com/repos/ethereum/go-ethereum',
    fetcher
  );
  if (error) return 'An error has occurred.';
  if (!data) return 'Loading...';
  return (
    <div>
      <h2>Home</h2>
      <h3>{data.name}</h3>
      <p>{data.description}</p>
      <strong>👁 {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
      <hr />
    </div>
  );
}

export default Home;
