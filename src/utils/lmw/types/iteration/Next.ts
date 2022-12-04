import Iteration from '~/utils/lmw/types/iteration/iteration'
import IterationMap from '~/utils/lmw/types/iteration/IterationMap'

type Next<I extends Iteration> = IterationMap[I[3]]

export default Next
