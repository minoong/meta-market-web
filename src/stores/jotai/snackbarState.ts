import { atom, PrimitiveAtom } from 'jotai'
import { Snackbar } from '~/interface/snackbar'

export const snackbarsAtom = atom<PrimitiveAtom<Snackbar>[]>([])
export const filteredAtom = atom((get) => {
 const todos = get(snackbarsAtom)
 return todos
})
