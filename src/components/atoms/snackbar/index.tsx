/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { PrimitiveAtom, useAtomValue } from 'jotai'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSnackbar } from '~/hooks/useSnackbar'
import { faTimes, faExclamationCircle, faCheck, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import type { Snackbar as SnackbarType } from '~/interface/snackbar'

interface Props {
 atom: PrimitiveAtom<SnackbarType>
}

const VARIANTS = {
 Info: {
  base: 'bg-white border-blue-500',
  iconstyle: 'text-blue-500 ',
  icon: faInfoCircle,
  name: '정보',
 },

 Error: {
  base: 'bg-white border-red-500 ',
  iconstyle: 'text-red-500 ',
  icon: faExclamationCircle,
  name: '에러',
 },

 Warning: {
  base: 'bg-white border-yellow-500',
  iconstyle: 'text-yellow-500 ',
  icon: faExclamationCircle,
  name: '경고',
 },

 Success: {
  base: 'bg-white border-green-500',
  iconstyle: 'text-green-500 ',
  icon: faCheck,
  name: '성공',
 },
}

function Snackbar(props: Props) {
 const { atom } = props
 const item = useAtomValue(atom)
 const { handleRemoveSnackbar } = useSnackbar()
 const [hide, setHide] = useState(false)

 const timeoutRef = useRef<number>()

 const Var = item.type
  ? VARIANTS[item.type]
  : {
     base: 'bg-white border-gray-600 ',
     iconstyle: '',
     icon: item.icon,
     name: item.header,
    }

 useEffect(() => {
  timeoutRef.current = window.setTimeout(() => {
   setHide(true)
  }, 1000 * 1.5)

  return () => window.clearTimeout(timeoutRef.current)
 }, [])

 const handleMouseOver = useCallback(() => {
  window.clearTimeout(timeoutRef.current)
 }, [])

 const handleMouseLeave = useCallback(() => {
  timeoutRef.current = window.setTimeout(() => {
   setHide(true)
  }, 1000 * 1.5)
 }, [])

 return (
  <div
   className={`p-3 ${hide ? 'snackbar-hide' : 'snackbar-show'}`}
   onAnimationEnd={(e) => {
    if (e.animationName === 'snackbar-hide') {
     handleRemoveSnackbar(atom)
    }
   }}
  >
   <div
    onMouseOver={handleMouseOver}
    onMouseLeave={handleMouseLeave}
    className={clsx(
     'flex w-full visible flex-row shadow-lg',
     'border-l-4 rounded-md duration-100 cursor-pointer',
     'transform transition-all hover:scale-102',
     Var.base,
     item.type && 'max-h-40',
    )}
   >
    <div className="flex flex-row p-2 flex-no-wrap w-full">
     {Var.icon && (
      <div className={clsx('flex items-center h-12 w-12', 'mx-auto text-xl select-none')}>
       <FontAwesomeIcon className={clsx('mx-auto', Var.iconstyle)} icon={Var.icon} />
      </div>
     )}

     <div className="flex flex-col flex-no-wrap px-1 w-full">
      <div className="flex my-auto font-bold select-none text-xs">{Var.name}</div>
      <p
       className={clsx(
        'my-auto break-all flex',
        'text-gray-600 text-xs',
        typeof item.message === 'string' && item.truncate,
       )}
      >
       {item.message}
      </p>
     </div>
     <div
      className={clsx('w-10 h-12 mr-2 items-center mx-auto', 'text-center leading-none text-lg flex')}
      onClick={() => setHide(true)}
     >
      <FontAwesomeIcon
       className={clsx('mx-auto my-auto text-center text-gray-600', 'cursor-pointer hover:scale-105 transform')}
       icon={faTimes}
      />
     </div>
    </div>
   </div>
  </div>
 )
}

export default React.memo(Snackbar)
