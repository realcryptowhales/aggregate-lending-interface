export const GO = 'go';

export const fetcher = (url: string) => fetch(url).then((res) => res.json());
