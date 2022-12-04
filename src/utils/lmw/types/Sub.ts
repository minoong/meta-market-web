import Cast from '~/utils/lmw/types/Cast'
import { _IsNegative } from '~/utils/lmw/types/IsNegative'
import Iteration from '~/utils/lmw/types/iteration/iteration'
import IterationOf from '~/utils/lmw/types/iteration/IterationOf'
import Next from '~/utils/lmw/types/iteration/Next'
import Pos from '~/utils/lmw/types/iteration/Pos'
import Prev from '~/utils/lmw/types/iteration/Prev'

type _SubPositive<N1 extends Iteration, N2 extends Iteration> = {
 0: _SubPositive<Prev<N1>, Prev<N2>> // N1 = -/+, N2 = +
 1: N1
 2: number
}[Pos<N2> extends 0 // If successful
 ? 1
 : number extends Pos<N2> // If un-success
 ? 2
 : 0] // Or continue

type SubPositive<N1 extends Iteration, N2 extends Iteration> = _SubPositive<N1, N2> extends infer X
 ? Cast<X, Iteration>
 : never

type _SubNegative<N1 extends Iteration, N2 extends Iteration> = {
 0: _SubNegative<Next<N1>, Next<N2>> // N1 = -/+, N2 = -
 1: N1
 2: number
}[Pos<N2> extends 0 // If successful
 ? 1
 : number extends Pos<N2> // If un-success
 ? 2
 : 0] // Or continue

type SubNegative<N1 extends Iteration, N2 extends Iteration> = _SubNegative<N1, N2> extends infer X
 ? Cast<X, Iteration>
 : never

export type _Sub<N1 extends Iteration, N2 extends Iteration> = {
 0: SubPositive<N1, N2>
 1: SubNegative<N1, N2>
}[_IsNegative<N2>]

/**
 * Subtract a [[Number]] from another one
 * @param N1 Left-hand side
 * @param N2 Right-hand side
 * @returns `string | number | boolean`
 * @example
 * ```ts
 * type test0 = Sub<'2', '10'>        // '-8'
 * type test1 = Sub<'0', '40'>        // '-40'
 * type test2 = Sub<'0', '40', 's'>   // '-40'
 * type test3 = Sub<'0', '40', 'n'>   //  -40
 * type test4 = Sub<'-20', '40', 's'> // string
 * type test5 = Sub<'-20', '40', 'n'> // number
 * ```
 */
type Sub<N1 extends number, N2 extends number> = N1 extends unknown
 ? N2 extends unknown
   ? _Sub<IterationOf<N1>, IterationOf<N2>>[0]
   : never
 : never

export default Sub
