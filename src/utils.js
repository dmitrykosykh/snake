const swap = (array, index1, index2) => {
  const [a, b] = [array[index1], array[index2]];
  array[index1] = b;
  array[index2] = a;
};

const shiftToRight = (array) => {
  for (let index = array.length - 1; index > 0; index -= 1) {
    array[index] = array[index - 1];
  }
};

export { swap, shiftToRight };
