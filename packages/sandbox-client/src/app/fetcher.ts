interface FetcherConfig {
  host: string;
}

const createFetcher = (config: FetcherConfig) => {
  const get = async (
    input: string,
    init: Omit<RequestInit, 'method' | 'mode'> = {},
  ) => {
    return fetch(`${config.host}/${input}`, {
      ...init,
      method: 'get',
      mode: 'cors',
    }).then((response) => {
      return response.json();
    });
  };

  return {
    get,
  };
};

export const fetcher = createFetcher({
  host: 'http://localhost:3000',
});
