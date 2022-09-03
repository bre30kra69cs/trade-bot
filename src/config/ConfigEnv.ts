import {injectable} from 'inversify';

import {Config} from './interface';

@injectable()
export class ConfigEnv implements Config {}
