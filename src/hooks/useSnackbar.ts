import { atom, PrimitiveAtom, useAtomValue, useSetAtom } from 'jotai'
import { useCallback } from 'react'
import { Snackbar, SnackbarMessageType, Truncate } from '~/interface/snackbar'
import { filteredAtom, snackbarsAtom } from '~/stores/jotai/snackbarState'

function uuid() {
 return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
  const r = (Math.random() * 16) | 0
  const v = c === 'x' ? r : (r & 0x3) | 0x8
  return v.toString(16)
 })
}

export function useSnackbar() {
 const setSnackbars = useSetAtom(snackbarsAtom)
 const snackbars = useAtomValue(filteredAtom)

 const handlePushSnackbar = useCallback(
  (message: string, type: SnackbarMessageType, lifetime?: number, truncate?: Truncate) => {
   if (!message) return

   const id = uuid()
   const newItem: Snackbar = {
    id,
    message,
    type,
    lifetime: lifetime || 2500,
    truncate,
   }

   setSnackbars((prev) => [...prev, atom<Snackbar>(newItem)])
  },
  [],
 )

 const handleRemoveSnackbar = useCallback(async (snackbar: PrimitiveAtom<Snackbar>) => {
  setSnackbars((prev) => prev.filter((item) => item !== snackbar))
 }, [])

 return { snackbars, handlePushSnackbar, handleRemoveSnackbar }
}
