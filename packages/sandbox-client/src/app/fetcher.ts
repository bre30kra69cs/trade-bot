import {useAlerts} from './alertsManager';

interface FetcherConfig {
  host: string;
}

interface FetcherError {
  statusCode?: number;
  message?: string;
  error?: string;
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
    })
      .then()
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((error: FetcherError) => {
          throw new Error(error.message);
        });
      })
      .catch((error: Error) => {
        useAlerts.getState().pushAlert({
          type: 'danger',
          message: error.message,
          timeout: 3000,
        });

        throw error;
      });
  };

  const post = async (
    input: string,
    init: Omit<RequestInit, 'method' | 'mode'> = {},
  ) => {
    return fetch(`${config.host}/${input}`, {
      ...init,
      method: 'post',
      mode: 'cors',
    })
      .then()
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((error: FetcherError) => {
          throw new Error(error.message);
        });
      })
      .catch((error: Error) => {
        useAlerts.getState().pushAlert({
          type: 'danger',
          message: error.message,
          timeout: 3000,
        });

        throw error;
      });
  };

  return {
    get,
    post,
  };
};

export const fetcher = createFetcher({
  host: 'http://localhost:3000',
});
