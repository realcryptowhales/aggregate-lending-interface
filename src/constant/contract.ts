import { queryHelperABI } from '@/constant';

export const queryHelperContractAddr =
  '0x33EC0d62C539936D43e2825BBcf064a44151DEE6';
export const priceOracleAddr = '0x0b89Fcd90C2D6577Ad6f1C4AFEAa7b20eeD4eE3B';
export const routerAddr = '0x1459FB5FDD9c17e3FFa524301e4f384e6D09D395';
export const mockUSDTAddr = '0x0b99A10c7EDdEDB735040a23a923A08248CE6f4f';

export const queryHelperContract = {
  address: queryHelperContractAddr as `0x${string}`,
  abi: queryHelperABI
};
