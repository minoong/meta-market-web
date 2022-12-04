import IterableInfer from '~/utils/lmw/types/IterableInfer'
import ReturnValueType from '~/utils/lmw/types/ReturnValueType'

type ReturnPartitionType<T extends Iterable<unknown> | AsyncIterable<unknown>> = ReturnValueType<
 T,
 [Awaited<IterableInfer<T>>[], Awaited<IterableInfer<T>>[]]
>

export default ReturnPartitionType
