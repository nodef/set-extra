import type {testFn} from "./_types";

/**
 * Discards values which pass a test.
 * @param x a set (updated)
 * @param ft test function (v, v, x)
 * @returns x
 */
function reject$<T>(x: Set<T>, ft: testFn<T>): Set<T> {
  for(var v of x)
    if(ft(v, v, x)) x.delete(v);
  return x;
}
export default reject$;
