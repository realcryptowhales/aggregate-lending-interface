// judge object is empty {}
export const emptyObjectCheck = (value: any) => {
  return (
    value && Object.keys(value).length === 0 && value.constructor === Object
  );
};
