export interface App {
  run: () => Promise<void>;
  kill: () => Promise<void>;
}
