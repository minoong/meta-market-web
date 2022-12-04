export function pipe<T>(...fn: Array<(input: T) => T>) {
 return function input(value: T) {
  return fn.reduce((currentValue, currentFunction) => {
   return currentFunction(currentValue)
  }, value)
 }
}
