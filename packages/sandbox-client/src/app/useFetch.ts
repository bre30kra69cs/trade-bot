import useSWR, {SWRConfiguration, Fetcher} from 'swr';

import {fetcher} from './fetcher';

export const useFetch = <Data = any, Error = any>(
  key: string,
  config: Omit<
    SWRConfiguration<Data, Error, Fetcher<Data, string>>,
    'fetcher' | 'suspense'
  > = {},
): Data => {
  const {data} = useSWR<Data, Error, string>(key, {
    ...config,
    suspense: true,
    fetcher: fetcher.get,
  });

  return data!;
};
