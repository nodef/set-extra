import range from "./range";
import type {compareFn, mapFn} from "./_types";

/**
 * Finds smallest entry.
 * @param x a set
 * @param fc compare function (a, b)
 * @param fm map function (v, v, x)
 * @returns [value, value]
 */
function min<T, U=T>(x: Iterable<T>, fc: compareFn<T|U>=null, fm: mapFn<T, T|U>=null): [T, T] {
  return range(x, fc, fm)[0];
}
export default min;
