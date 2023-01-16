import * as React from 'react';
import { useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ethers } from 'ethers';
import { useState } from 'react';

const updateBalance = async (cb: (balance: any) => any) => {
  const provider = new ethers.providers.JsonRpcProvider(
    'https://mainnet.infura.io/v3/ef918edd7d114a1f883c57aa00eb3747'
  );
  const balance = await provider.getBalance('vitalik.eth');
  console.log(
    `ETH Balance of vitalik: ${ethers.utils.formatEther(balance)} ETH`
  );
  cb(balance);
};

function Layout() {
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    updateBalance(setBalance);
  }, []);

  return (
    <div>
      <h2>{`ETH Balance of vitalik is ${ethers.utils.formatEther(
        balance
      )} ETH`}</h2>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/courses">Courses</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
}

export default Layout;
