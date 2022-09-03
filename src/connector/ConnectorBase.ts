import {injectable} from 'inversify';

import {Connector} from './interface';
import {ApiSpin} from '../api/ApiSpin';
import {ApiTonic} from '../api/ApiTonic';
import {Api, ApiID, Market} from '../api/interface';

const API_TYPES_MAPPER: Record<ApiID, Api> = {
  Spin: new ApiSpin(),
  Tonic: new ApiTonic(),
};

const createConnectorBase = (apiTypes: ApiID[]) => {
  const targets = apiTypes.map((apiType) => API_TYPES_MAPPER[apiType]);

  @injectable()
  class ConnectorBase implements Connector {
    getApi = (apiID: ApiID) => {
      return API_TYPES_MAPPER[apiID];
    };

    init = async () => {
      await Promise.all(targets.map((target) => target.init()));
    };

    getMarkets = async () => {
      const responses = await Promise.all(
        targets.map((target) => target.getMarkets()),
      );

      return responses.flat();
    };

    getOrderbooks = async (markets: Market[]) => {
      return await Promise.all(
        markets.map((market) => {
          const target = API_TYPES_MAPPER[market.apiID];
          return target.getOrderbook(market.marketId);
        }),
      );
    };
  }

  return ConnectorBase;
};

export const ConnectorBase = createConnectorBase(['Spin', 'Tonic']);
