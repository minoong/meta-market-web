import Iteration from '~/utils/lmw/types/iteration/iteration'
import IterationMap from '~/utils/lmw/types/iteration/IterationMap'

type Prev<I extends Iteration> = IterationMap[I[2]]

export default Prev
