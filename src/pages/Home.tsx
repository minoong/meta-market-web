import React, { Suspense } from 'react'
import Table from '~/components/molecules/marketTable/Table'
import MarketCardSkeleton from '~/components/molecules/skeleton/MarketCard.skeleton'
import VerticalCarousel from '~/components/molecules/verticalCarousel'

function Home() {
 return (
  <div>
   Home
   <Suspense fallback={<MarketCardSkeleton rows={10} />}>
    <Table />
   </Suspense>
   <div className="grid grid-cols-[990px_400px]">
    <div className="bg-slate-400">sdf</div>
    <div />
   </div>
   <VerticalCarousel offsetRadius={4}>
    {[1, 2, 3].map((v) => (
     <div key={v}># {v}</div>
    ))}
   </VerticalCarousel>
  </div>
 )
}

export default Home
