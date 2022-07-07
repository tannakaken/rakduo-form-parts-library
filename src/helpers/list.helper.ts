export const zipList = <T, S>(l1: T[], l2: S[]): [T, S][] => {
  if (l1.length < l2.length) {
    return l1.map((e, index) => [e, l2[index]]);
  }
  return l2.map((e, index) => [l1[index], e]);
};

export const zipNext = <T>(list: T[]) => zipList(list, list.slice(1));

export const filterUndefined = <T>(list: (T | undefined)[]): T[] =>
  list.filter((e) => e !== undefined) as T[];

export const filterNull = <T>(list: (T | null)[]): T[] =>
  list.filter((e) => e !== null) as T[];

export const removeIndex = <T>(l: T[], index: number): T[] => [
  ...l.slice(0, index),
  ...l.slice(index + 1, l.length),
];

export const swapList = <T>(l: T[], i: number, j: number): T[] => {
  const result = [...l];
  result[i] = l[j];
  result[j] = l[i];
  return result;
};

export const rangeUntil = (n: number) => Array.from(Array(n), (v, k) => k);
export const rangeFromUntil = (start: number, end: number) =>
  Array.from(Array(end - start), (v, k) => k + start);

export const listEqual = <T>(l1: T[] | undefined | null, l2: T[] | undefined | null) => {
  if (l1 === l2) {
    return true;
  }
  if (l1 === null || l2 === null) {
    return false;
  }
  if (l1 === undefined || l2 === undefined) {
    return false;
  }
  if (l1.length !== l2.length) {
    return false;
  }

  for (let i = 0; i < l1.length; ++i) {
    if (l1[i] !== l2[i]) {
      return false;
    }
  }
  return true;
};

export const setEqual = <T>(s1: Set<T> | undefined | null, s2: Set<T> | undefined | null) => {
  if (s1 === s2) {
    return true;
  }
  if (s1 === null || s2 === null) {
    return false;
  }
  if (s1 === undefined || s2 === undefined) {
    return false;
  }
  if (s1.size !== s2.size) {
    return false;
  }
  for (const e of Array.from(s1)) {
    if (!s2.has(e)) {
      return false;
    }
  }
  for (const e of Array.from(s2)) {
    if (!s1.has(e)) {
      return false;
    }
  }
  return true;
};
