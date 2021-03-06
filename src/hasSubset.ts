/**
 * Checks if set has a subset.
 * @param x a set
 * @param y subset?
 */
function hasSubset<T>(x: Set<T>, y: Iterable<T>): boolean {
  for(var v of y)
    if(!x.has(v)) return false;
  return true;
}
export default hasSubset;
