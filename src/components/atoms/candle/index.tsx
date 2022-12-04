import React, { useMemo } from 'react'
import * as d3 from 'd3'
import pipe from '~/utils/lmw/pipe'

interface Props {
 width: number
 height: number
 price: {
  opening: number
  trade: number
  high: number
  low: number
 }
 fill: string
}

function Candle(props: Props) {
 const { width, height, price, fill } = props

 const yScale = useMemo(() => {
  const high = price.high - price.opening
  const low = price.opening - price.low

  const max = Math.max(high, low)

  const scale = d3
   .scaleLinear()
   .domain([price.opening - max, price.opening + max])
   .range([height, 0])

  return scale
 }, [price, height])

 const rectHeight = useMemo(() => {
  const gapAbs = (gap: number) => Math.abs(gap)
  const correct = (input: number) => (input === 0 ? 1 : input)

  const result = pipe(yScale(price.opening) - yScale(price.trade), gapAbs, correct)

  return result
 }, [price, yScale])

 const lineWidth = useMemo(() => width / 2, [width])

 return (
  <g>
   <rect x={0} width={width} height={rectHeight} y={yScale(Math.max(price.trade, price.opening))} fill={fill} />
   <line x1={lineWidth} x2={lineWidth} y1={yScale(price.high)} y2={yScale(price.low)} stroke={fill} />
  </g>
 )
}

export default React.memo(Candle)
