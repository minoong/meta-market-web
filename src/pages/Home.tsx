import React, { Suspense } from 'react'
import Table from '~/components/molecules/marketTable/Table'
import MarketCardSkeleton from '~/components/molecules/skeleton/MarketCard.skeleton'

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
  </div>
 )
}

export default Home
