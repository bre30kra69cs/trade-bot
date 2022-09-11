import {Data} from '../dataLoader/interface';

export interface DataParser<T> {
  parse: (data: Data) => T;
}
