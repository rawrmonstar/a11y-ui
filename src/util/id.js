const idCounter = {};

export const generateID = (name, counter = idCounter) => {
  const count = (counter[name] || 0) + 1;
  counter[name] = count;
  return `${name}-${count}`;
};
