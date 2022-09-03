import {contariner} from './di/container';
import {Token} from './di/Token';
import {App} from './app/interface';

export const bootstrap = async () => {
  const app = contariner.get<App>(Token.App);
  await app.run();
};
