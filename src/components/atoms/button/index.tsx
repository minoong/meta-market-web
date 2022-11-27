import clsx from 'clsx'
import React, { MouseEvent } from 'react'

interface Props {
 size?: 'sm' | 'md' | 'lg'
 type?: 'button' | 'submit' | 'reset'
 primary?: boolean
 variant?: 'text' | 'contained' | 'outlined'
 disabled?: boolean
 full?: boolean
 children: React.ReactNode
 onClick?: (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void
}

function Button(props: Props) {
 const {
  primary = false,
  size = 'sm',
  variant = 'contained',
  full = false,
  type = 'button',
  disabled = false,
  children,
  onClick,
 } = props

 const classNames = clsx(
  primary && variant === 'contained' && 'bg-sky-500 text-white',
  primary &&
   variant === 'outlined' &&
   'ring-sky-500 ring-1 [&:not(:disabled)]:hover:ring-2 [&:not(:disabled)]:hover:ring-sky-600 [&:not(:disabled)]:active:ring-sky-700',
  primary && variant === 'text' && 'text-sky-500 [&:not(:disabled)]:hover:bg-gray-300',
  !primary && variant === 'contained' && 'bg-red-500 text-white',
  !primary &&
   variant === 'outlined' &&
   'ring-red-500 ring-1 [&:not(:disabled)]:hover:ring-2 [&:not(:disabled)]:hover:ring-red-600 [&:not(:disabled)]:active:ring-red-700',
  !primary && variant === 'text' && 'text-red-500 [&:not(:disabled)]:hover:bg-gray-300',
  full ? 'w-full' : 'w-fit',
  disabled && 'cursor-not-allowed brightness-75',
 )

 return (
  <button
   type={type}
   className={`p-3 rounded-lg text-${size} [&:not(:disabled)]:hover:brightness-110
   [&:not(:disabled)]:hover:ring-brightness-110
   [&:not(:disabled)]:active:brightness-125
   ${classNames}
    transition-all duration-150
    `}
   onClick={onClick}
   disabled={disabled}
  >
   {children}
  </button>
 )
}

export default Button
