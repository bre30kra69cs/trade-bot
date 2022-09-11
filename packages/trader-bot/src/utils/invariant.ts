export function invariant(
  value: unknown,
  message = 'Invariant Error',
): asserts value {
  if (!value) {
    throw new Error(message);
  }
}
