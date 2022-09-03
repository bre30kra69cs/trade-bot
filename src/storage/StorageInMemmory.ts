import {injectable} from 'inversify';

import {Storage} from './interface';

@injectable()
export class StorageInMemmory implements Storage {
  private state = new Map();

  set = async <T>(key: string, value: T) => {
    this.state.set(key, value);
  };

  get = async <T>(key: string): Promise<T | undefined> => {
    return this.state.get(key);
  };
}
