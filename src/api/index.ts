import axios from 'axios';

export const oldFetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .catch((e) => {
      throw e;
    });

export const fetcher = async (args: {
  url: string;
  params: Record<string, any>;
}) => {
  const { url, params } = args;
  const { data } = await axios.get(url, { params });
  axios
    .get(url, { params })
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      throw e;
    });
  return data;
};
