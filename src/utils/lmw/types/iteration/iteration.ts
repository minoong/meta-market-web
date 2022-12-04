import IterationMap from '~/utils/lmw/types/iteration/IterationMap'

type Iteration = [
 value: number,
 sign: '-' | '0' | '+',
 prev: keyof IterationMap,
 next: keyof IterationMap,
 oppo: keyof IterationMap,
]

export default Iteration
