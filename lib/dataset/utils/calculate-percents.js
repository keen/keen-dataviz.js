export function calculateSumForPercents(matrix) {
  const sumArray = [];
  matrix.slice(1).forEach((d, i) => {
    d.forEach((e) => {
      if (typeof e === 'number') {
        if (!sumArray[i]) {
          sumArray[i] = e;
          return sumArray[i];
        }
        sumArray[i] += e;
      }
      return sumArray[i];
    });
  });
  return sumArray;
}

export function calculatePercents(matrix, sumArray) {
  const newValues = matrix.slice(1).map((d, i) => d.map((e) => {
    if (typeof e === 'number') {
      return (e / sumArray[i]) * 100;
    }
    return e;
  }));
  return newValues;
}
