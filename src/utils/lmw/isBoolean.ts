/**
 * Returns true if `n` is a Boolean.
 *
 * @example
 * ```ts
 * isBoolean(true); // true
 * isBoolean(null); // false
 * isBoolean("lmw"); // false
 * ```
 */
function isBoolean(n: unknown): n is boolean {
 return typeof n === 'boolean'
}

export default isBoolean
