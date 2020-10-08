import { flatten } from '../utils/flatten';

export function createExtractionKeys(results) {
  const keys = new Set();
  results.forEach((result) => {
    Object.keys(flatten(result)).map((key) => {
      keys.add(key);
    });
  });

  return keys;
}
