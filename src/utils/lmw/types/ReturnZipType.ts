import Append from '~/utils/lmw/types/Append'
import Cast from '~/utils/lmw/types/Cast'
import Drop from '~/utils/lmw/types/Drop'
import IterableInfer from '~/utils/lmw/types/IterableInfer'
import Tail from '~/utils/lmw/types/Tail'
import { UniversalIterable } from '~/utils/lmw/types/Utils'

type _ReturnZipValueType<T extends unknown[], TEMP extends unknown[] = []> = T extends [unknown, ...unknown[]]
 ? _ReturnZipValueType<Tail<T>, Append<TEMP, IterableInfer<Cast<T[0], UniversalIterable<unknown>>>>>
 : TEMP

type _ReturnZipType<T extends unknown[], R, W = IterableIterator<R>> = T extends [a: infer A, ...args: unknown[]]
 ? A extends Iterable<unknown>
   ? _ReturnZipType<Drop<1, T>, R, W>
   : _ReturnZipType<Drop<1, T>, R, AsyncIterableIterator<R>>
 : W

type ReturnZipType<T extends UniversalIterable[]> = _ReturnZipType<T, _ReturnZipValueType<T>>

export default ReturnZipType
