/**
 * Checks if value is a set.
 * @param {*} x a value
 * @returns {boolean}
 */
function is(x) {
  return x instanceof Set;
}
/**
 * Checks if two sets have the same values.
 * @param {Set} s a set
 * @param {Set} t another set
 * @returns {boolean}
 */
function isEqual(s, t) {
  if(s.size!==t.size) return false;
  for(var v of s)
    if(!t.has(v)) return false;
  return true;
}
function asSets(cs) {
  var a = []
  for(var c of cs)
    a.push(c instanceof Set? c : new Set(c));
  return a;
}
/**
 * Gives a set with values in all collections.
 * @param {Set} s a set (updated)
 * @param {...Iterable} cs collections
 * @returns {Set}
 */
function intersection$(s, ...cs) {
  var ts = asSets(cs);
  values: for(var v of s) {
    for(var t of ts)
      if(!t.has(v)) { s.delete(v); continue values; }
  }
  return s;
}
/**
 * Gives a set with values in all collections.
 * @param {...Iterable} cs collections
 * @returns {Set}
 */
function intersection(...cs) {
  if(cs.length===0) return new Set();
  var s = new Set(cs.pop());
  return intersection$(s, ...cs);
}
/**
 * Checks if set is part of all collections.
 * @param {Set} s a set
 * @param {...Iterable} cs collections
 * @returns {boolean}
 */
function isSubset(s, ...cs) {
  // might have better approach
  return intersection(s, ...cs).size===s.size;
}
/**
 * Gives a set with values from all collections.
 * @param {Set} s a set (updated)
 * @param {...Iterable} cs collections
 * @returns {Set}
 */
function union$(s, ...cs) {
  for (var c of cs)
    for(var v of c)
      s.add(v);
  return s;
}
/**
 * Gives a set with values from all collections.
 * @param {...Iterable} cs collections
 * @returns {Set}
 */
function union(...cs) {
  return union$(new Set(), ...cs);
}
/**
 * Checks if all collections are part of set.
 * @param {Set} s a set
 * @param {...Iterable} cs collections
 * @returns {boolean}
 */
function isSuperset(s, ...cs) {
  // can it be better?
  return union(s, ...cs).size===s.size;
}
/**
 * Checks if collections have no value in common.
 * @param {...Iterable} cs collections
 * @returns {boolean}
 */
function isDisjoint(...cs) {
  // can this be improved?
  return intersection(...cs).size===0;
}
/**
 * Gives a set excluding values in collections.
 * @param {Set} s a set (updated)
 * @param {...Iterable} cs collections
 * @returns {Set}
 */
function difference$(s, ...cs) {
  for(var c of cs)
    for(var v of c)
      s.delete(v);
  return s;
}
/**
 * Gives a set excluding values in collections.
 * @param {Iterable} s a set
 * @param {...Iterable} cs collections
 * @returns {Set}
 */
function difference(s, ...cs) {
  return difference$(new Set(s), ...cs);
}
/**
 * Gives a set with values in odd number of collections.
 * @param {...Iterable} cs collections
 * @returns {Set}
 */
function symmetricDifference(...cs) {
  var s = union(...cs);
  var ts = asSets(cs);
  for(var v of s) {
    var n = 0;
    for(var t of ts)
      if(t.has(v)) n++;
    if((n & 1)===0) s.delete(v);
  }
  return s;
}
/**
 * Lists all subsets of a set.
 * @param {Iterable} s a set
 * @returns {Iterable<Set>}
 */
function* powerset(s) {
  var a = Array.from(s);
  for(var incl=0, I=2**a.length; incl<I; incl++) {
    for(var v=new Set(), b=0, j=incl; j>0; b++, j>>=1)
      if(j & 1) v.add(a[b]);
    yield v;
  }
  return;
}
exports.is = is;
exports.isEqual = isEqual;
exports.isSubset = isSubset;
exports.isSuperset = isSuperset;
exports.isDisjoint = isDisjoint;
exports.union = union;
exports.union$ = union$;
exports.intersection = intersection;
exports.intersection$ = intersection$;
exports.difference = difference;
exports.difference$ = difference$;;
exports.symmetricDifference = symmetricDifference;
exports.powerset = powerset;
