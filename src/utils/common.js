const getRandomArrayElement = (items) =>
  items[Math.floor(Math.random() * items.length)];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min > max || min < 0 || max < 0) {
    return NaN;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export { getRandomArrayElement, getRandomInt };