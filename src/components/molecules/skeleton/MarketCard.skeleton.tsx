import { Skeleton, SkeletonCircle } from '@chakra-ui/react'
import React from 'react'

interface Props {
 rows: number
}

function MarketCardSkeleton(props: Props) {
 const { rows } = props
 return (
  <>
   {Array(rows)
    .fill(null)
    .map((_, i) => (
     // eslint-disable-next-line react/no-array-index-key
     <div className="flex gap-1 p-5" key={i}>
      <SkeletonCircle size="10" />
      <div className="w-full flex gap-1">
       <Skeleton height="40px" w="30%" />
       <Skeleton height="40px" w="30%" />
       <Skeleton height="40px" w="30%" />
       <Skeleton height="40px" w="10%" />
      </div>
     </div>
    ))}
  </>
 )
}

export default MarketCardSkeleton
