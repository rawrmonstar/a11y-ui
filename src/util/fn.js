export const noop = () => {};

export const callEach = (...fns) => (...args) => {
  fns.forEach(fn => fn && fn(...args));
};
