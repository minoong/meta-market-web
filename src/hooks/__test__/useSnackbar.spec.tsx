import { renderHook, act } from '@testing-library/react'
import { Provider } from 'jotai'
import { useSnackbar } from '~/hooks/useSnackbar'
import { snackbarsAtom } from '~/stores/jotai/snackbarState'

describe('useSnackbar#1', () => {
 it('초기 상태값 확인', async () => {
  const wrapper = ({ children }: { children: React.ReactElement }) => (
   <Provider initialValues={[[snackbarsAtom, []]]}>{children}</Provider>
  )

  const { result } = renderHook(() => useSnackbar(), {
   wrapper,
  })

  expect(result.current.snackbars).toHaveLength(0)
 })

 it('스넥바 추가', async () => {
  const { result } = renderHook(() => useSnackbar())

  expect(result.current.snackbars).toHaveLength(0)

  act(() => {
   result.current.handlePushSnackbar('message', 'Success')
  })

  expect(result.current.snackbars).toHaveLength(1)
 })
})

describe('useSnackbar#2', () => {
 it('스넥바 제거', async () => {
  const wrapper = ({ children }: { children: React.ReactElement }) => (
   <Provider initialValues={[[snackbarsAtom, []]]}>{children}</Provider>
  )

  const { result } = renderHook(() => useSnackbar(), {
   wrapper,
  })

  expect(result.current.snackbars).toHaveLength(0)

  act(() => {
   result.current.handlePushSnackbar('message', 'Success')
  })

  expect(result.current.snackbars).toHaveLength(1)

  act(() => {
   result.current.handleRemoveSnackbar(result.current.snackbars[0])
  })

  expect(result.current.snackbars).toHaveLength(0)
 })
})
