import ArrayInfer from '~/utils/lmw/types/ArrayInfer'
import Equals from '~/utils/lmw/types/Equals'
import Length from '~/utils/lmw/types/Length'

type Last<T extends unknown[]> = Equals<Length<T>, number> extends 1
 ? ArrayInfer<T>
 : T extends [...any, infer U]
 ? U
 : never

export default Last
