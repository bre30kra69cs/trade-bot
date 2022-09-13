import useSWR, {SWRConfiguration, Fetcher, Key} from 'swr';

import {Res} from './swr.types';

export const useFetch = <Data = any, Error = any>(
  key: string,
  config: SWRConfiguration<Data, Error, Fetcher<Data, string>> | undefined,
): Res<Data, Error> => {
  const {data, error} = useSWR<Data, Error, string>(key, config);

  if (error) {
    return {
      type: 'fail',
      error: error,
    };
  }

  if (data) {
    return {
      type: 'ok',
      data: data,
    };
  }

  return {
    type: 'pending',
  };
};
