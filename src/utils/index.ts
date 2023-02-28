// judge object is empty {}
export const emptyObjectCheck = (value: any) => {
  return (
    value && Object.keys(value).length === 0 && value.constructor === Object
  );
};

export const formatAddr = (addr: string) =>
  `${addr.slice(0, 6)}...${addr.slice(-4)}`;
export const formatUrl = ({ url, args }) => {
  if (!args) return url;
  const arr = Object.keys(args).map((key, index) => {
    if (index > 0) {
      return `&${key}=${args[key]}`;
    }
    return `?${key}=${args[key]}`;
  });
  if (arr.length > 0) {
    return url + arr.join('');
  }
  return url;
};
