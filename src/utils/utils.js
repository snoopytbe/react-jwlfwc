export function keygen() {
  return Math.random().toString(36).substr(2, 9);
}

export function isOdd(x) {
  return x & 1;
}
