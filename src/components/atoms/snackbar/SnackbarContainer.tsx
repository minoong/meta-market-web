import clsx from 'clsx'
import React from 'react'
import Snackbar from '~/components/atoms/snackbar'
import { useSnackbar } from '~/hooks/useSnackbar'

const VARIANTS = {
 top_left: {
  style: 'top-0 left-0',
 },
 top_right: {
  style: 'top-0 right-0',
 },
 bottom_right: {
  style: 'bottom-0 right-0',
 },
 bottom_left: {
  style: 'bottom-0 left-0',
 },
 top_middle: {
  style: 'top-0 left-1/2 -translate-x-1/2 transform',
 },
 bottom_middle: {
  style: 'bottom-0 left-1/2 -translate-x-1/2 transform',
 },
 undefined: {
  style: 'top-0 right-0',
 },
} as const

type SnackbarContainer = {
 variant?: keyof typeof VARIANTS
}

function SnackbarContainer(props: SnackbarContainer) {
 const { variant = 'bottom_right' } = props
 const Var = VARIANTS[variant]
 const { snackbars } = useSnackbar()

 return (
  <div className={clsx(Var.style, 'fixed z-50')}>
   {snackbars.map((id) => (
    <Snackbar atom={id} key={id.toString()} />
   ))}
  </div>
 )
}

export default React.memo(SnackbarContainer)
