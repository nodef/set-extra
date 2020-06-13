import type {testFn} from './_types';

/**
 * Finds values passing the test.
 * @param x a set
 * @param fn test function (v, v, x)
 * @param ths this argument
 */
function find<T>(x: Iterable<T>, fn: testFn<T>, ths: object=null): T[] {
  var a = [];
  for(var v of x)
    if(fn.call(ths, v, v, x)) a.push(v);
  return a;
}
export default find;
