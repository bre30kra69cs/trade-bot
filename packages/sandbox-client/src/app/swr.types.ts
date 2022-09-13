interface Ok<T> {
  type: 'ok';
  data: T;
}

interface Fail<T> {
  type: 'fail';
  error: T;
}

interface Pending {
  type: 'pending';
}

export type Res<T, E> = Ok<T> | Fail<E> | Pending;
