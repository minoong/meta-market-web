import Length from '~/utils/lmw/types/Length'
import Prepend from '~/utils/lmw/types/Prepend'
import Tail from '~/utils/lmw/types/Tail'

type Drop<N extends number, T extends any[], I extends any[] = []> = {
 0: Drop<N, Tail<T>, Prepend<I, any>>
 1: T
}[Length<I> extends N ? 1 : 0]

export default Drop
