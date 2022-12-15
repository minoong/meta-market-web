import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import usePrevious from '~/hooks/usePrevious'
import { Change } from '~/interface/apis/upbit/marketTicker'

interface Props {
 tradePrice: string
 change: Change
 yesterdayChnage: Change
 isFirstRender: boolean
}

function Price(props: Props) {
 const { tradePrice, change, yesterdayChnage, isFirstRender } = props
 const [currentChange, setCurrentChange] = useState<Change>(change)
 const previousChange = usePrevious(change)

 useEffect(() => {
  if (previousChange !== change) {
   setCurrentChange(change)
  }
  const id = setTimeout(() => {
   setCurrentChange('EVEN')
  }, 300)

  return () => clearTimeout(id)
 }, [change, previousChange])

 const isRise = clsx({
  'text-[#c84a31]': yesterdayChnage === 'RISE',
  'text-[#1261c4]': yesterdayChnage === 'FALL',
 })

 const highlight = clsx(
  currentChange === 'RISE' && 'border border-[#c84a31]',
  currentChange === 'FALL' && 'border border-[#1261c4]',
  currentChange === 'EVEN' && 'border border-transparent',
 )

 return (
  <div
   className={`${isRise} transition-all ease-in ${
    !isFirstRender ? highlight : ''
   } text-xs h-10 flex justify-end pr-2 pt-1`}
  >
   {tradePrice}
  </div>
 )
}

export default Price
