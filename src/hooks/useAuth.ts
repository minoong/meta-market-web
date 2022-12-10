import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useAtom } from 'jotai'
import { RESET } from 'jotai/utils'
import { useCallback, useState } from 'react'
import { firebaseAuth } from '~/firebase'
import { useSnackbar } from '~/hooks/useSnackbar'
import { authState } from '~/stores/jotai/auth/authState'

function useAuth() {
 const [isPending, setIsPending] = useState<boolean>(false)
 const [auth, setAuth] = useAtom(authState)
 const { handlePushSnackbar } = useSnackbar()

 const handleGoogleLogin = useCallback(() => {
  setIsPending(() => true)
  const provider = new GoogleAuthProvider()
  signInWithPopup(firebaseAuth, provider)
   .then((data) => {
    setAuth(data.user)
    handlePushSnackbar('로그인 완료', 'Success')
   })
   .catch(() => {
    handlePushSnackbar('로그인 실패', 'Error')
   })
   .finally(() => {
    setIsPending(() => false)
   })
 }, [])

 const signOut = useCallback(() => {
  setIsPending(() => true)
  setAuth(RESET)
  firebaseAuth.signOut()
  handlePushSnackbar('로그아웃', 'Success')
  setIsPending(() => false)
 }, [])

 return { auth, handleGoogleLogin, signOut, isPending }
}

export default useAuth
