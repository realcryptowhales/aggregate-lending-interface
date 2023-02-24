import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import {
  useAccount,
  useBalance,
  useContractReads,
  useContractRead
} from 'wagmi';

import { wagmigotchiABI, mlootABI } from '@constant/index';

function Layout() {
  // const { address, isConnecting, isDisconnected } = useAccount();
  // console.log(address, isConnecting, isDisconnected, 'useAccount');
  // const { data, isError, isLoading } = useBalance({
  //   address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'
  // });
  // console.log(data, isError, isLoading, 'useBalance');

  const ethkContract = {
    address: '0xbFec33e59621d0C6E944931B3B31A40C23Cd8d84' as `0x${string}`,
    abi: [
      {
        inputs: [],
        name: 'symbol',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      }
    ]
  };
  const usdtContract = {
    address: '0x9ad7458f654d3dc27f858031f14d8933a4d0eb5f' as `0x${string}`,
    abi: [
      {
        inputs: [],
        name: 'symbol',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      }
    ]
  };

  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        ...usdtContract,
        functionName: 'symbol'
      },
      {
        ...ethkContract,
        functionName: 'symbol'
      }
    ]
  });
  console.log(data, isError, isLoading, 'multicall');

  // const contractRead = useContractRead({
  //   address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
  //   abi: wagmigotchiABI,
  //   functionName: 'getBoredom'
  // });
  // console.log(contractRead, 'contractRead');
  // const wagmigotchiContract = {
  //   address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
  //   abi: wagmigotchiABI
  // };

  return (
    <div className="w-full">
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
