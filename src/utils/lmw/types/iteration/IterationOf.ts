import IterationMap from '~/utils/lmw/types/iteration/IterationMap'

type IterationOf<N extends number> = `${N}` extends keyof IterationMap ? IterationMap[`${N}`] : IterationMap['__']

export default IterationOf
