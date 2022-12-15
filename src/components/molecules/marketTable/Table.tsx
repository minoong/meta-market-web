import React, { useState } from 'react'
import VirtualScroll from '~/components/atoms/virtualScroll'
import Row from '~/components/molecules/marketTable/Row'
import useMarketsTickerQuery from '~/hooks/query/useMarketsTickerQuery'

function Table() {
 const { data = [] } = useMarketsTickerQuery()
 const [y, setY] = useState<number>(0)

 return (
  <div className="h-[600px] overflow-auto w-fit scrollbar-hide" onScroll={(e) => setY(e.currentTarget.scrollTop)}>
   <VirtualScroll height={600} itemHeight={42} columnGap={0} renderAhead={0} y={y}>
    {data.map((data) => (
     <Row key={data.market} data={data} />
    ))}
   </VirtualScroll>
  </div>
 )
}

export default Table
