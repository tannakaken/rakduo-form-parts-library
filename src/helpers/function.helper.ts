export const identity = <T>(t: T) => t;

export const composite = <T1, T2, T3>(f: (t: T1) => T2, g: (t2: T2) => T3): (t1: T1) => T3 => (t: T1) => g(f(t));
