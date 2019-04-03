export default function calculateRange(matrix) {
  const newValues = matrix.slice(1).map(d => d.map((e, i) => {
    if (typeof e === 'number') {
      if (i === 1) {
        return e - d[i + 1];
      }
    }
    return e;
  }));
  return newValues;
}