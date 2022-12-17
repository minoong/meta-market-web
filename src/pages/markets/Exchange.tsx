import React, { Suspense } from 'react'
import Table from '~/components/molecules/marketTable/Table'
import MarketCardSkeleton from '~/components/molecules/skeleton/MarketCard.skeleton'
import { motion } from 'framer-motion'

function Exchange() {
 return (
  <div className="w-full h-full py-4 bg-[#e9ecf1]">
   <div className="grid grid-cols-[990px_400px] w-[1410px] m-auto gap-5">
    <div className="bg-slate-500">1</div>
    <div className="bg-white overflow-hidden flex justify-center">
     <Suspense fallback={<MarketCardSkeleton rows={5} />}>
      <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
       <Table />
      </motion.div>
     </Suspense>
    </div>
   </div>
  </div>
 )
}

export default Exchange
