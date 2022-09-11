export interface Logger {
  log: (message?: string) => void;
  warn: (message?: string) => void;
  error: (error: Error | unknown) => void;
}
