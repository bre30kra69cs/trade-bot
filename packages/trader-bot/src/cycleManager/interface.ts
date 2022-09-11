export interface CycleManager {
  start: () => Promise<void>;
  stop: () => Promise<void>;
}
