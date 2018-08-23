export function noop() {}

export function callEach(...functions) {
  return function(...args) {
    functions.forEach(func => func && func(...args));
  };
}
