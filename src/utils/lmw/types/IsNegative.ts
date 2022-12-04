import Iteration from '~/utils/lmw/types/iteration/iteration'
import IterationOf from '~/utils/lmw/types/iteration/IterationOf'

export type _IsNegative<N extends Iteration> = {
 '-': 1
 '+': 0
 '0': 0
}[N[1]]

type IsNegative<N extends number> = _IsNegative<IterationOf<N>>

export default IsNegative
