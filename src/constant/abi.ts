export const wagmigotchiABI = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caretaker',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'CaretakerLoved',
    type: 'event'
  },
  {
    inputs: [],
    name: 'clean',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'feed',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getAlive',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getBoredom',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getHunger',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getSleepiness',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getStatus',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getUncleanliness',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'love',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'play',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'sleep',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];

export const mlootABI = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'approved',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      }
    ],
    name: 'Approval',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address'
      },
      { indexed: false, internalType: 'bool', name: 'approved', type: 'bool' }
    ],
    name: 'ApprovalForAll',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address'
      },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      }
    ],
    name: 'Transfer',
    type: 'event'
  },
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'claim',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'getChest',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'getFoot',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'getHand',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'getHead',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'getNeck',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'getRing',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'getWaist',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'getWeapon',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'operator', type: 'address' }
    ],
    name: 'isApprovedForAll',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { internalType: 'bytes', name: '_data', type: 'bytes' }
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'operator', type: 'address' },
      { internalType: 'bool', name: 'approved', type: 'bool' }
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'index', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'uint256', name: 'index', type: 'uint256' }
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];
export const queryHelperABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_router',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_aaveLogic',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_compoundLogic',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [],
    name: 'aaveLogic',
    outputs: [
      {
        internalType: 'contract IProtocol',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'target',
            type: 'address'
          },
          {
            internalType: 'bool',
            name: 'allowFailure',
            type: 'bool'
          },
          {
            internalType: 'bytes',
            name: 'callData',
            type: 'bytes'
          }
        ],
        internalType: 'struct MulticallHelper.Call3[]',
        name: 'calls',
        type: 'tuple[]'
      }
    ],
    name: 'aggregate3',
    outputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'success',
            type: 'bool'
          },
          {
            internalType: 'bytes',
            name: 'returnData',
            type: 'bytes'
          }
        ],
        internalType: 'struct MulticallHelper.Result[]',
        name: 'returnData',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'compoundLogic',
    outputs: [
      {
        internalType: 'contract IProtocol',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_quote',
        type: 'address'
      }
    ],
    name: 'getBorrowMarkets',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'underlying',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'borrowAmount',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'borrowValue',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'matchAmount',
            type: 'uint256'
          },
          {
            internalType: 'uint256[]',
            name: 'borrows',
            type: 'uint256[]'
          }
        ],
        internalType: 'struct QueryHelper.BorrowMarket[]',
        name: 'borrowMarket',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_underlying',
        type: 'address'
      }
    ],
    name: 'getCurrentBorrowRate',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_underlying',
        type: 'address'
      }
    ],
    name: 'getCurrentBorrowRates',
    outputs: [
      {
        internalType: 'uint256',
        name: 'aggBorrowRate',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'aaveBorrowRate',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'compBorrowRate',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_underlying',
        type: 'address'
      }
    ],
    name: 'getCurrentSupplyRate',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_underlying',
        type: 'address'
      }
    ],
    name: 'getCurrentSupplyRates',
    outputs: [
      {
        internalType: 'uint256',
        name: 'aggSupplyRate',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'aaveSupplyRate',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'compSupplyRate',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_underlying',
        type: 'address'
      }
    ],
    name: 'getDTokenConvertRate',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_underlying',
        type: 'address'
      }
    ],
    name: 'getLendingRate',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_underlying',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_quote',
        type: 'address'
      }
    ],
    name: 'getMarketInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'underlying',
            type: 'address'
          },
          {
            internalType: 'uint256[]',
            name: 'supplies',
            type: 'uint256[]'
          },
          {
            internalType: 'uint256',
            name: 'supplyRate',
            type: 'uint256'
          },
          {
            internalType: 'uint256[]',
            name: 'borrows',
            type: 'uint256[]'
          },
          {
            internalType: 'uint256',
            name: 'borrowRate',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'totalMatched',
            type: 'uint256'
          }
        ],
        internalType: 'struct QueryHelper.MarketInfo',
        name: 'market',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_underlyings',
        type: 'address[]'
      },
      {
        internalType: 'address',
        name: '_quote',
        type: 'address'
      }
    ],
    name: 'getMarketsInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'underlying',
            type: 'address'
          },
          {
            internalType: 'uint256[]',
            name: 'supplies',
            type: 'uint256[]'
          },
          {
            internalType: 'uint256',
            name: 'supplyRate',
            type: 'uint256'
          },
          {
            internalType: 'uint256[]',
            name: 'borrows',
            type: 'uint256[]'
          },
          {
            internalType: 'uint256',
            name: 'borrowRate',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'totalMatched',
            type: 'uint256'
          }
        ],
        internalType: 'struct QueryHelper.MarketInfo[]',
        name: 'markets',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_underlying',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_quote',
        type: 'address'
      }
    ],
    name: 'getPlatformInfo',
    outputs: [
      {
        internalType: 'uint256',
        name: 'depositedValue',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'totalBorrowedValue',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'matchAmountValue',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_underlyings',
        type: 'address[]'
      },
      {
        internalType: 'address',
        name: '_quote',
        type: 'address'
      }
    ],
    name: 'getPlatformsInfo',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_underlying',
        type: 'address'
      }
    ],
    name: 'getSTokenConvertRate',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_quote',
        type: 'address'
      }
    ],
    name: 'getSupplyMarkets',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'underlying',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'supplyAmount',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'supplyValue',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'matchAmount',
            type: 'uint256'
          },
          {
            internalType: 'uint256[]',
            name: 'supplies',
            type: 'uint256[]'
          }
        ],
        internalType: 'struct QueryHelper.SupplyMarket[]',
        name: 'supplyMarket',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address'
      }
    ],
    name: 'getTokenInfoWithUser',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'underlying',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'tokenPrice',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'depositAmount',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'borrowAmount',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'maxLTV',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'liquidationThreshold',
            type: 'uint256'
          }
        ],
        internalType: 'struct QueryHelper.TokenInfoWithUser[]',
        name: 'tokenInfoWithUser',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'quote',
        type: 'address'
      }
    ],
    name: 'getUserBorrowed',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'underlying',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'borrowAmount',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'borrowValue',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'borrowApr',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'borrowLimit',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'dailyEstInterest',
            type: 'uint256'
          }
        ],
        internalType: 'struct QueryHelper.UserBorrowInfo[]',
        name: 'userBorrowInfos',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_quote',
        type: 'address'
      }
    ],
    name: 'getUserInfo',
    outputs: [
      {
        internalType: 'uint256',
        name: 'collateralValue',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'borrowingValue',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'borrowLimit',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_account',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_asset',
        type: 'address'
      }
    ],
    name: 'getUserStatus',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'assetPrice',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'userBalance',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'borrowed',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'supplied',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'totalBorrowed',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'tatalCollateral',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'borrowLimit',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'liquidateThreashold',
            type: 'uint256'
          },
          {
            internalType: 'bool',
            name: 'usingAsCollateral',
            type: 'bool'
          },
          {
            internalType: 'uint256',
            name: 'supplyRate',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'borrowRate',
            type: 'uint256'
          },
          {
            internalType: 'uint256[]',
            name: 'supplyRates',
            type: 'uint256[]'
          },
          {
            internalType: 'uint256[]',
            name: 'borrowRates',
            type: 'uint256[]'
          }
        ],
        internalType: 'struct QueryHelper.UserStatus',
        name: 'userStatus',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'quote',
        type: 'address'
      }
    ],
    name: 'getUserSupplied',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'underlying',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'depositAmount',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'depositValue',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'depositApr',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'availableBalance',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'dailyEstProfit',
            type: 'uint256'
          },
          {
            internalType: 'bool',
            name: 'collateral',
            type: 'bool'
          }
        ],
        internalType: 'struct QueryHelper.UserSupplyInfo[]',
        name: 'userSupplyInfos',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'router',
    outputs: [
      {
        internalType: 'contract IRouter',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
];

export const routerABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'asset',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newIndex',
        type: 'uint256'
      }
    ],
    name: 'AccFeeOffsetUpdated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'asset',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newAccFee',
        type: 'uint256'
      }
    ],
    name: 'AccFeeUpdated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'underlying',
        type: 'address'
      },
      {
        components: [
          {
            internalType: 'uint8',
            name: 'index',
            type: 'uint8'
          },
          {
            internalType: 'bool',
            name: 'collateralable',
            type: 'bool'
          },
          {
            internalType: 'bool',
            name: 'paused',
            type: 'bool'
          },
          {
            internalType: 'contract ISToken',
            name: 'sToken',
            type: 'address'
          },
          {
            internalType: 'contract IDToken',
            name: 'dToken',
            type: 'address'
          }
        ],
        indexed: false,
        internalType: 'struct Types.Asset',
        name: 'asset',
        type: 'tuple'
      }
    ],
    name: 'AssetAdded',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'asset',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'actions',
        type: 'uint256'
      }
    ],
    name: 'BlockActionsSet',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'borrower',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'asset',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'Borrowed',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'contract IConfig',
        name: 'config',
        type: 'address'
      }
    ],
    name: 'ConfigUpdated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'dToken',
        type: 'address'
      }
    ],
    name: 'DTokenUpdated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'asset',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'collector',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'FeeCollected',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'asset',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newIndex',
        type: 'uint256'
      }
    ],
    name: 'FeeIndexUpdated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint8',
        name: 'version',
        type: 'uint8'
      }
    ],
    name: 'Initialized',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'contract IPriceOracle',
        name: 'priceOracle',
        type: 'address'
      }
    ],
    name: 'PriceOracleUpdated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'contract IProtocol',
        name: 'protocol',
        type: 'address'
      }
    ],
    name: 'ProtocolAdded',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'contract IProtocol',
        name: 'old',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'contract IProtocol',
        name: '_new',
        type: 'address'
      }
    ],
    name: 'ProtocolUpdated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'contract IProtocolsHandler',
        name: 'protocolsHandler',
        type: 'address'
      }
    ],
    name: 'ProtocolsHandlerUpdated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'supplier',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'asset',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'Redeemed',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'borrower',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'asset',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'Repaid',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'asset',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'maxReserve',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'executeSupplyThreshold',
        type: 'uint256'
      }
    ],
    name: 'ReservePoolConfigUpdated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'sToken',
        type: 'address'
      }
    ],
    name: 'STokenUpdated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'supplier',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'asset',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'Supplied',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'asset',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isPaused',
        type: 'bool'
      }
    ],
    name: 'TokenPausedSet',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'asset',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newLending',
        type: 'uint256'
      }
    ],
    name: 'TotalLendingsUpdated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'asset',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newIndex',
        type: 'uint256'
      }
    ],
    name: 'UserFeeIndexUpdated',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'accFeeOffsets',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'accFees',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'underlying',
            type: 'address'
          },
          {
            internalType: 'uint8',
            name: 'decimals',
            type: 'uint8'
          },
          {
            internalType: 'bool',
            name: 'collateralable',
            type: 'bool'
          },
          {
            internalType: 'string',
            name: 'sTokenName',
            type: 'string'
          },
          {
            internalType: 'string',
            name: 'sTokenSymbol',
            type: 'string'
          },
          {
            internalType: 'string',
            name: 'dTokenName',
            type: 'string'
          },
          {
            internalType: 'string',
            name: 'dTokenSymbol',
            type: 'string'
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'maxLTV',
                type: 'uint256'
              },
              {
                internalType: 'uint256',
                name: 'liquidateLTV',
                type: 'uint256'
              },
              {
                internalType: 'uint256',
                name: 'maxLiquidateRatio',
                type: 'uint256'
              },
              {
                internalType: 'uint256',
                name: 'liquidateRewardRatio',
                type: 'uint256'
              },
              {
                internalType: 'uint256',
                name: 'feeRate',
                type: 'uint256'
              }
            ],
            internalType: 'struct Types.AssetConfig',
            name: 'config',
            type: 'tuple'
          },
          {
            internalType: 'uint256',
            name: 'maxReserve',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'executeSupplyThreshold',
            type: 'uint256'
          }
        ],
        internalType: 'struct Types.NewAssetParams',
        name: '_newAsset',
        type: 'tuple'
      }
    ],
    name: 'addAsset',
    outputs: [
      {
        components: [
          {
            internalType: 'uint8',
            name: 'index',
            type: 'uint8'
          },
          {
            internalType: 'bool',
            name: 'collateralable',
            type: 'bool'
          },
          {
            internalType: 'bool',
            name: 'paused',
            type: 'bool'
          },
          {
            internalType: 'contract ISToken',
            name: 'sToken',
            type: 'address'
          },
          {
            internalType: 'contract IDToken',
            name: 'dToken',
            type: 'address'
          }
        ],
        internalType: 'struct Types.Asset',
        name: 'asset',
        type: 'tuple'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'contract IProtocol',
        name: '_protocol',
        type: 'address'
      }
    ],
    name: 'addProtocol',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'assets',
    outputs: [
      {
        internalType: 'uint8',
        name: 'index',
        type: 'uint8'
      },
      {
        internalType: 'bool',
        name: 'collateralable',
        type: 'bool'
      },
      {
        internalType: 'bool',
        name: 'paused',
        type: 'bool'
      },
      {
        internalType: 'contract ISToken',
        name: 'sToken',
        type: 'address'
      },
      {
        internalType: 'contract IDToken',
        name: 'dToken',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'blockedActions',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'asset',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256'
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address'
          }
        ],
        internalType: 'struct Types.UserAssetParams',
        name: '_params',
        type: 'tuple'
      },
      {
        internalType: 'bool',
        name: '_executeNow',
        type: 'bool'
      }
    ],
    name: 'borrow',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_account',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_borrowAsset',
        type: 'address'
      }
    ],
    name: 'borrowLimit',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_account',
        type: 'address'
      }
    ],
    name: 'claimRewards',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'collectedFees',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'config',
    outputs: [
      {
        internalType: 'contract IConfig',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'dTokenImplement',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'asset',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256'
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address'
          }
        ],
        internalType: 'struct Types.UserAssetParams',
        name: '_params',
        type: 'tuple'
      }
    ],
    name: 'executeBorrow',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'asset',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256'
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address'
          }
        ],
        internalType: 'struct Types.UserAssetParams',
        name: '_params',
        type: 'tuple'
      },
      {
        internalType: 'uint256[]',
        name: '_supplies',
        type: 'uint256[]'
      },
      {
        internalType: 'uint256',
        name: '_protocolsSupplies',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_totalLending',
        type: 'uint256'
      }
    ],
    name: 'executeRedeem',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_asset',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256'
      }
    ],
    name: 'executeRepay',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_asset',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_totalLending',
        type: 'uint256'
      },
      {
        internalType: 'uint256[]',
        name: '_supplies',
        type: 'uint256[]'
      },
      {
        internalType: 'uint256',
        name: '_protocolsSupplies',
        type: 'uint256'
      }
    ],
    name: 'executeSupply',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'feeCollector',
    outputs: [
      {
        internalType: 'address payable',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'feeIndexes',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_underlying',
        type: 'address'
      }
    ],
    name: 'getAsset',
    outputs: [
      {
        components: [
          {
            internalType: 'uint8',
            name: 'index',
            type: 'uint8'
          },
          {
            internalType: 'bool',
            name: 'collateralable',
            type: 'bool'
          },
          {
            internalType: 'bool',
            name: 'paused',
            type: 'bool'
          },
          {
            internalType: 'contract ISToken',
            name: 'sToken',
            type: 'address'
          },
          {
            internalType: 'contract IDToken',
            name: 'dToken',
            type: 'address'
          }
        ],
        internalType: 'struct Types.Asset',
        name: 'asset',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getAssets',
    outputs: [
      {
        components: [
          {
            internalType: 'uint8',
            name: 'index',
            type: 'uint8'
          },
          {
            internalType: 'bool',
            name: 'collateralable',
            type: 'bool'
          },
          {
            internalType: 'bool',
            name: 'paused',
            type: 'bool'
          },
          {
            internalType: 'contract ISToken',
            name: 'sToken',
            type: 'address'
          },
          {
            internalType: 'contract IDToken',
            name: 'dToken',
            type: 'address'
          }
        ],
        internalType: 'struct Types.Asset[]',
        name: '_assets',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_underlying',
        type: 'address'
      }
    ],
    name: 'getBorrowStatus',
    outputs: [
      {
        internalType: 'uint256[]',
        name: 'borrows',
        type: 'uint256[]'
      },
      {
        internalType: 'uint256',
        name: 'totalBorrowedAmount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'totalLending',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'newInterest',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_account',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_repayAsset',
        type: 'address'
      }
    ],
    name: 'getLiquidationData',
    outputs: [
      {
        internalType: 'uint256',
        name: 'liquidationAmount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'maxLiquidationAmount',
        type: 'uint256'
      },
      {
        internalType: 'bool',
        name: 'blackListed',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_underlying',
        type: 'address'
      }
    ],
    name: 'getSupplyStatus',
    outputs: [
      {
        internalType: 'uint256[]',
        name: 'supplies',
        type: 'uint256[]'
      },
      {
        internalType: 'uint256',
        name: 'protocolsSupplies',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'totalLending',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'totalSuppliedAmountWithFee',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'newInterest',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getUnderlyings',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_protocolsHandler',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_priceOracle',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_config',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_rewards',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_sToken',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_dToken',
        type: 'address'
      },
      {
        internalType: 'address payable',
        name: '_reservePool',
        type: 'address'
      },
      {
        internalType: 'address payable',
        name: '_feeCollector',
        type: 'address'
      }
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_underlying',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_account',
        type: 'address'
      }
    ],
    name: 'isBorrowing',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_underlying',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_account',
        type: 'address'
      }
    ],
    name: 'isPoisitionHealthy',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_underlying',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_account',
        type: 'address'
      }
    ],
    name: 'isUsingAsCollateral',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'asset',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256'
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address'
          }
        ],
        internalType: 'struct Types.UserAssetParams',
        name: '_repayParams',
        type: 'tuple'
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'asset',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256'
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address'
          }
        ],
        internalType: 'struct Types.UserAssetParams',
        name: '_redeemParams',
        type: 'tuple'
      }
    ],
    name: 'liquidate',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'priceOracle',
    outputs: [
      {
        internalType: 'contract IPriceOracle',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'protocols',
    outputs: [
      {
        internalType: 'contract IProtocolsHandler',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'asset',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256'
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address'
          }
        ],
        internalType: 'struct Types.UserAssetParams',
        name: '_params',
        type: 'tuple'
      },
      {
        internalType: 'uint256',
        name: '_newInterest',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_totalBorrows',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: '_borrowBy',
        type: 'address'
      }
    ],
    name: 'recordBorrow',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'asset',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256'
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address'
          }
        ],
        internalType: 'struct Types.UserAssetParams',
        name: '_params',
        type: 'tuple'
      },
      {
        internalType: 'uint256',
        name: '_totalSupplies',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_newInterest',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: '_redeemFrom',
        type: 'address'
      },
      {
        internalType: 'bool',
        name: '_collateralable',
        type: 'bool'
      }
    ],
    name: 'recordRedeem',
    outputs: [
      {
        internalType: 'uint256',
        name: 'underlyingAmount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'fee',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'asset',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256'
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address'
          }
        ],
        internalType: 'struct Types.UserAssetParams',
        name: '_params',
        type: 'tuple'
      },
      {
        internalType: 'uint256',
        name: '_totalSupplies',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_newInterest',
        type: 'uint256'
      },
      {
        internalType: 'bool',
        name: '_collateralable',
        type: 'bool'
      }
    ],
    name: 'recordSupply',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'asset',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256'
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address'
          }
        ],
        internalType: 'struct Types.UserAssetParams',
        name: '_params',
        type: 'tuple'
      },
      {
        internalType: 'bool',
        name: '_collateralable',
        type: 'bool'
      },
      {
        internalType: 'bool',
        name: '_executeNow',
        type: 'bool'
      }
    ],
    name: 'redeem',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'asset',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256'
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address'
          }
        ],
        internalType: 'struct Types.UserAssetParams',
        name: '_params',
        type: 'tuple'
      },
      {
        internalType: 'bool',
        name: '_executeNow',
        type: 'bool'
      }
    ],
    name: 'repay',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'reservePool',
    outputs: [
      {
        internalType: 'contract IReservePool',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'rewards',
    outputs: [
      {
        internalType: 'contract IRewards',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'sTokenImplement',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_asset',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_action',
        type: 'uint256'
      }
    ],
    name: 'setBlockActions',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'asset',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256'
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address'
          }
        ],
        internalType: 'struct Types.UserAssetParams',
        name: '_params',
        type: 'tuple'
      },
      {
        internalType: 'bool',
        name: '_collateralable',
        type: 'bool'
      },
      {
        internalType: 'bool',
        name: '_executeNow',
        type: 'bool'
      }
    ],
    name: 'supply',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_asset',
        type: 'address'
      }
    ],
    name: 'sync',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_asset',
        type: 'address'
      }
    ],
    name: 'toggleToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_underlying',
        type: 'address'
      }
    ],
    name: 'totalBorrowed',
    outputs: [
      {
        internalType: 'uint256',
        name: 'totalBorrowedAmount',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'totalLendings',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_underlying',
        type: 'address'
      }
    ],
    name: 'totalSupplied',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'underlyings',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'contract IConfig',
        name: '_config',
        type: 'address'
      }
    ],
    name: 'updateConfig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_dToken',
        type: 'address'
      }
    ],
    name: 'updateDToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'contract IPriceOracle',
        name: '_priceOracle',
        type: 'address'
      }
    ],
    name: 'updatePriceOracle',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'contract IProtocol',
        name: '_old',
        type: 'address'
      },
      {
        internalType: 'contract IProtocol',
        name: '_new',
        type: 'address'
      }
    ],
    name: 'updateProtocol',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'contract IProtocolsHandler',
        name: '_protocolsHandler',
        type: 'address'
      }
    ],
    name: 'updateProtocolsHandler',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_asset',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_maxReserve',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_executeSupplyThreshold',
        type: 'uint256'
      }
    ],
    name: 'updateReservePoolConfig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_sToken',
        type: 'address'
      }
    ],
    name: 'updateSToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'userFeeIndexes',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_account',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_quote',
        type: 'address'
      }
    ],
    name: 'userStatus',
    outputs: [
      {
        internalType: 'uint256',
        name: 'collateralValue',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'borrowingValue',
        type: 'uint256'
      },
      {
        internalType: 'bool',
        name: 'blackListedCollateral',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    stateMutability: 'payable',
    type: 'receive'
  }
];

export const sTokenABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'spender',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      }
    ],
    name: 'Approval',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint8',
        name: 'version',
        type: 'uint8'
      }
    ],
    name: 'Initialized',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      }
    ],
    name: 'Transfer',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'spender',
        type: 'address'
      }
    ],
    name: 'allowance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'approve',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_from',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_totalUnderlying',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_totalUncollectedFee',
        type: 'uint256'
      }
    ],
    name: 'burn',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'fee',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'subtractedValue',
        type: 'uint256'
      }
    ],
    name: 'decreaseAllowance',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'addedValue',
        type: 'uint256'
      }
    ],
    name: 'increaseAllowance',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_underlying',
        type: 'address'
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'symbol',
        type: 'string'
      }
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_account',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_amountOfUnderlying',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_totalUnderlying',
        type: 'uint256'
      }
    ],
    name: 'mint',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'totalSupplied',
        type: 'uint256'
      }
    ],
    name: 'scaledAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_account',
        type: 'address'
      }
    ],
    name: 'scaledBalanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'scaledTotalSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
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
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'transfer',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'transferFrom',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'underlying',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_totalSupplied',
        type: 'uint256'
      }
    ],
    name: 'unscaledAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
];
