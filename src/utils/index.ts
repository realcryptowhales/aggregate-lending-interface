// judge object is empty {}
export const emptyObjectCheck = (value: any) => {
  return (
    value && Object.keys(value).length === 0 && value.constructor === Object
  );
};

export const formatAddr = (addr: string) =>
  `${addr.slice(0, 6)}...${addr.slice(-4)}`;
