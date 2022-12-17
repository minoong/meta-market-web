import Hangul from 'hangul-js'
import React, { useMemo, useState } from 'react'
import VirtualScroll from '~/components/atoms/virtualScroll'
import Row from '~/components/molecules/marketTable/Row'
import Search from '~/components/molecules/marketTable/Search'
import useMarketsQuery from '~/hooks/query/useMarketsQuery'
import useMarketsTickerQuery from '~/hooks/query/useMarketsTickerQuery'
import { useAppSelector } from '~/stores/redux/store'

function Table() {
 const { data: marketsData = [] } = useMarketsQuery({
  select: (data) => {
   const symbols = data.filter(({ market }) => market.startsWith('KRW-'))

   return symbols
  },
  suspense: true,
 })

 const { data: marketsTickerData = [] } = useMarketsTickerQuery()
 const search = useAppSelector((state) => state['market/search'].search)
 const [y, setY] = useState<number>(0)
 const result = useMemo(() => {
  if (!search) {
   return marketsTickerData
  }

  const reg = new RegExp(search, 'ig')
  const korReg = new RegExp(
   Hangul.d(search, true)
    .map((s) => s[0])
    .join(''),
   'ig',
  )

  const searchMarketsData = marketsData.filter((marketData) => {
   return (
    reg.test(marketData.english_name) ||
    reg.test(marketData.market.split('-')[1]) ||
    Hangul.disassembleToString(marketData.korean_name).includes(Hangul.disassembleToString(search)) ||
    (!Hangul.isComplete(search) &&
     korReg.test(
      Hangul.d(marketData.korean_name, true)
       .map((kor) => kor[0])
       .join(''),
     ))
   )
  })

  if (!searchMarketsData.length) {
   return []
  }

  return marketsTickerData.filter((tickerData) => searchMarketsData.find((v) => v.market === tickerData.market))
 }, [marketsData, marketsTickerData, search])

 return (
  <div className="h-[600px] overflow-auto w-fit scrollbar-hide" onScroll={(e) => setY(e.currentTarget.scrollTop)}>
   <Search />
   <VirtualScroll height={600} itemHeight={42} columnGap={0} renderAhead={0} y={y}>
    {result.map((data) => (
     <Row key={data.market} data={data} />
    ))}
   </VirtualScroll>
  </div>
 )
}

export default Table
