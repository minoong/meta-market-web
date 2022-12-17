import Hangul from 'hangul-js'
import React, { useMemo, useState } from 'react'
import VirtualScroll from '~/components/atoms/virtualScroll'
import Row from '~/components/molecules/marketTable/Row'
import Search from '~/components/molecules/marketTable/Search'
import useMarketsQuery from '~/hooks/query/useMarketsQuery'
import useMarketsTickerQuery from '~/hooks/query/useMarketsTickerQuery'
import { useAppSelector } from '~/stores/redux/store'
import icon from '~/assets/images/ico_sort_none.png'

function Table() {
 const { data: marketsData = [] } = useMarketsQuery({
  select: (data) => {
   const symbols = data.filter(({ market }) => market.startsWith('KRW-'))

   return symbols
  },
  suspense: true,
 })

 const { data: marketsTickerData = [] } = useMarketsTickerQuery({
  select: (data) => {
   return data.sort((a, b) => b.acc_trade_price_24h - a.acc_trade_price_24h)
  },
  refetchInterval: 1000 * 60,
 })
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
  <div className="h-[600px] overflow-auto w-full scrollbar-hide" onScroll={(e) => setY(e.currentTarget.scrollTop)}>
   <div className="sticky top-0 z-10 bg-white">
    <Search />
    <table>
     <colgroup>
      <col width="20" />
      <col width="20" />
      <col width="94" />
      <col width="98" />
      <col width="58" />
      <col width="90" />
     </colgroup>
     <thead className="text-center text-[5px] text-gray-600 font-thin py-3 h-5 bg-[#f9fafc]">
      <tr>
       <th colSpan={3}>코인명</th>
       <th>
        <div className="flex justify-center items-center">
         <div className={`after:content-['\\00a0']`}>현재가</div>
         <img src={icon} alt="현재가" className="w-[5px] h-[10px] mt-[2px]" />
        </div>
       </th>
       <th>
        <div className="flex justify-center items-center">
         <div className={`after:content-['\\00a0']`}>전일대비</div>
         <img src={icon} alt="전일대비" className="w-[5px] h-[10px] mt-[2px]" />
        </div>
       </th>
       <th>
        <div className="flex justify-center items-center">
         <div className={`after:content-['\\00a0']`}>거래대금</div>
         <img src={icon} alt="거래대금" className="w-[5px] h-[10px] mt-[2px]" />
        </div>
       </th>
      </tr>
     </thead>
    </table>
   </div>
   <VirtualScroll height={600} itemHeight={42} columnGap={0} renderAhead={0} y={y}>
    {result.map((data) => (
     <Row key={data.market} data={data} />
    ))}
   </VirtualScroll>
  </div>
 )
}

export default React.memo(Table)
