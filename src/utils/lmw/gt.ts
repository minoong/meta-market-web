/**
 * Returns true if the first argument is greater than the second; false otherwise.
 *
 * @example
 * ```ts
 * gt(5, 1) // expected true
 * gt(1, 5) // expected false
 * gt("a", "b") // expected false
 * gt("b", "a") // expected true
 *
 * filter(gt(5), [1, 2, 4, 5, 8, 9]) // Iterable<[1, 2, 4]>
 * filter(gt(1), [1, 2, 3, 4, 5]) // Iterable<[]>
 * filter(gt("b"), ["a", "b", "c"]) // Iterable<["a"]>
 * filter(gt("a"), ["a", "b"]) // Itreable<[]>
 * ```
 */
function gt(a: string): (b: string) => boolean
function gt(a: number): (b: number) => boolean
function gt(a: Date): (b: Date) => boolean
function gt(a: string, b: string): boolean
function gt(a: number, b: number): boolean
function gt(a: Date, b: Date): boolean

function gt(a: any, b?: any): ((b: any) => boolean) | boolean {
 if (b === undefined) {
  return (_b: any) => gt(a, _b)
 }

 if (a.constructor !== b.constructor) {
  throw new TypeError('The values you want to compare must be of the same type')
 }

 return a > b
}

export default gt
