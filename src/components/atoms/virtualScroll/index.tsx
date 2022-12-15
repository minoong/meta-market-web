import React from 'react'

type Props = {
 header?: React.ReactNode
 height: number
 children: JSX.Element[]
 itemHeight: number
 y: number
 columnGap?: number
 renderAhead?: number
}

const VirtualScroll = ({ children, height, itemHeight, y, columnGap = 0, renderAhead = 0 }: Props) => {
 const scrollRef = React.useRef<HTMLDivElement>(null)
 const offsetY = y

 const containerHeight = (itemHeight + columnGap) * children.length

 const startIndex = Math.max(Math.floor(offsetY / (itemHeight + columnGap)) - renderAhead, 0)

 const endIndex = Math.min(Math.ceil(height / (itemHeight + columnGap) + startIndex) + renderAhead, children.length)

 const visibleItem = children.slice(Math.max(startIndex, 0), Math.min(endIndex + 1, children.length))

 const translateY = Math.max((itemHeight + columnGap) * startIndex, columnGap)

 return (
  <div
   className="will-change-transform"
   style={{
    height: `${containerHeight}px`,
   }}
   ref={scrollRef}
  >
   <div style={{ transform: `translateY(${translateY}px)` }}>
    <table>
     <colgroup>
      <col width="26" />
      <col width="26" />
      <col width="94" />
      <col width="98" />
      <col width="58" />
      <col width="*" />
     </colgroup>
     <tbody>{visibleItem}</tbody>
    </table>
   </div>
  </div>
 )
}

export default VirtualScroll
