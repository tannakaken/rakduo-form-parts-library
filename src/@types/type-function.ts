export type Parameter<T extends (...args: any[]) => any> = Parameters<T>[0];
export type HasName = { [name: string]: any };

export type PromiseType<T extends Promise<any>> = T extends Promise<infer P>
  ? P
  : never;

export type valueOf<T> = T[keyof T];

/**
 * ハック。こういうことは本当はあまりしない方がいい（今後のtypescriptのアップデートで公式から用意してくれるといいのだが）
 * type A = {
 *     foo: string,
 *     bar: number,
 *     buz: string,
 * }
 * とあったら、
 * {
 *     foo: string,
 *     bar: never,
 *     buz: string,
 * }
 * にして、neverでないキーを取り出すので、
 * FilteredKey<A, string>は
 * "foo" | "buz"
 * と値がstringなキーだけ残る。
 */
 export type FilteredKey<T, U> = {
    [P in keyof T]: T[P] extends U ? P : never;
  }[keyof T];
