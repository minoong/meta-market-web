/* eslint-disable camelcase */
import clsx from 'clsx'
import { Avatar } from 'flowbite-react'
import React, { useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import Candle from '~/components/atoms/candle'
import Price from '~/components/molecules/marketTable/Price'
import useMarketsQuery from '~/hooks/query/useMarketsQuery'
import usePrevious from '~/hooks/usePrevious'
import { MarketTicker } from '~/interface/apis/upbit/marketTicker'
import { MarketUtils } from '~/utils/market/Utils'

interface Props {
 data: MarketTicker
}

function Row(props: Props) {
 const {
  data: {
   market,
   change,
   opening_price,
   trade_price,
   high_price,
   low_price,
   signed_change_rate,
   signed_change_price,
   acc_trade_price_24h,
  },
 } = props

 const { data } = useMarketsQuery({
  select: (data) => {
   return data.find((data) => data.market === market)
  },
  staleTime: Infinity,
 })

 const previousChange = usePrevious(trade_price)

 const marketKrwSymbol = useMemo(() => {
  const [krw, symbol] = market.split('-')

  return `${symbol}/${krw}`
 }, [market])

 const isRise = clsx({
  'text-[#c84a31]': change === 'RISE',
  'text-[#1261c4]': change === 'FALL',
 })

 return (
  <tr className="hover:bg-slate-100 transition-all duration-150 cursor-default">
   <td>
    <div className="flex justify-center items-center">
     <img
      src={`https://static.upbit.com/logos/${market.split('-')[1]}.png`}
      className="rounded-full w-3"
      alt={market}
     />
    </div>
   </td>
   <td>
    <div className="w-full flex justify-center">
     <svg width={10} height={15}>
      <Candle
       fill={change === 'RISE' ? '#c84a31' : '#1261c4'}
       width={10}
       height={15}
       price={{
        opening: opening_price,
        trade: trade_price,
        high: high_price,
        low: low_price,
       }}
      />
     </svg>
    </div>
   </td>
   <td className="px-1">
    <NavLink className="text-xs font-bold !cursor-pointer hover:underline" to={`/exchange/${data?.market}`}>
     {data && data.korean_name}
    </NavLink>
    <div className="text-[6px] text-gray-500 font-semibold">{marketKrwSymbol}</div>
   </td>
   <td className="px-1">
    <Price
     tradePrice={trade_price.toLocaleString()}
     yesterdayChnage={change}
     change={trade_price > (previousChange ?? 0) ? 'RISE' : trade_price < (previousChange ?? 0) ? 'FALL' : 'EVEN'}
     isFirstRender={previousChange === undefined}
    />
   </td>
   <td className="px-1">
    <div className={`${isRise} text-[6px] font-semibold text-right`}>
     <div>
      {signed_change_rate > 0 ? '+' : ''}
      {(signed_change_rate * 100).toFixed(2)}%
     </div>
     <div>{signed_change_price.toLocaleString()}</div>
    </div>
   </td>
   <td className="px-1">
    <div className="text-right">
     <span className="text-[6px] font-semibold">{MarketUtils.numberToHuman(acc_trade_price_24h)[0]}</span>
     <span className="text-[6px] text-gray-500 font-semibold">{MarketUtils.numberToHuman(acc_trade_price_24h)[1]}</span>
    </div>
   </td>
  </tr>
 )
}

export default React.memo(Row)
