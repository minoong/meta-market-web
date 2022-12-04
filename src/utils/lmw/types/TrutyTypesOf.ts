import Falsy from '~/utils/lmw/types/Falsy'

type TruthyTypesOf<T> = T extends Falsy ? never : T

export default TruthyTypesOf
