/* eslint-disable camelcase */
import clsx from 'clsx'
import { Avatar } from 'flowbite-react'
import React, { useMemo } from 'react'
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
  <tr>
   <td>
    <Avatar img={`https://static.upbit.com/logos/${market.split('-')[1]}.png`} rounded size="xs" alt={market} />
   </td>
   <td>
    <div className="bg-slate-100 w-full flex justify-center">
     <svg width={10} height={26 * 1.2}>
      <Candle
       fill={change === 'RISE' ? '#c84a31' : '#1261c4'}
       width={10}
       height={26 * 1.2}
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
   <td>
    <div className="text-xs font-bold">{data && data.korean_name}</div>
    <div className="text-[6px] text-gray-600 font-semibold">{marketKrwSymbol}</div>
   </td>
   <td>
    <Price
     tradePrice={trade_price.toLocaleString()}
     yesterdayChnage={change}
     change={trade_price > (previousChange ?? 0) ? 'RISE' : trade_price < (previousChange ?? 0) ? 'FALL' : 'EVEN'}
     isFirstRender={previousChange === undefined}
    />
   </td>
   <td>
    <div className={`${isRise} text-[6px] font-semibold`}>
     <div>
      {signed_change_rate > 0 ? '+' : ''}
      {(signed_change_rate * 100).toFixed(2)}%
     </div>
     <div>{signed_change_price.toLocaleString()}</div>
    </div>
   </td>
   <td>
    <span className="text-[6px] font-semibold">{MarketUtils.numberToHuman(acc_trade_price_24h)[0]}</span>
    <span className="text-[6px] text-gray-600 font-semibold">{MarketUtils.numberToHuman(acc_trade_price_24h)[1]}</span>
   </td>
  </tr>
 )
}

export default React.memo(Row)
