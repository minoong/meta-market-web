/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { Children, ReactElement, useCallback, useMemo, useState } from 'react'
import Slide from '~/components/molecules/verticalCarousel/Slide'
import useInterval from '~/hooks/useInterval'

interface Props {
 offsetRadius: number
 children: React.ReactNode | React.ReactNode[]
}

function mod(currentIndex: number, length: number) {
 return ((currentIndex % length) + length) % length
}

function VerticalCarousel(props: Props) {
 const [isPlaying, setPlaying] = useState<boolean>(true)
 const [currentIndex, setCurrentIndex] = useState<number>(0)
 const { offsetRadius, children } = props

 const arrayChildren = useMemo(() => Children.toArray(children), [children])
 const modBySlidesLength = useCallback((index: number) => mod(index, arrayChildren.length), [arrayChildren])

 useInterval(() => setCurrentIndex(modBySlidesLength(currentIndex + 1)), isPlaying ? 5000 : null)

 const clampOffsetRadius = useCallback(
  (offsetRadius: number) => {
   const upperBound = Math.floor((arrayChildren.length - 1) / 2)

   if (offsetRadius < 0) {
    return 0
   }

   if (offsetRadius > upperBound) {
    return upperBound
   }

   return offsetRadius
  },
  [arrayChildren],
 )

 const getPresentableSlides = useCallback(() => {
  const result = clampOffsetRadius(offsetRadius)
  const presentableSlides: ReturnType<typeof Children.toArray> = []

  for (let i = -result; i < 1 + result; i++) {
   presentableSlides.push(arrayChildren[modBySlidesLength(currentIndex + i)])
  }

  return presentableSlides
 }, [clampOffsetRadius, arrayChildren, modBySlidesLength, currentIndex])

 const moveSlide = useCallback(
  (direction: number) => {
   setCurrentIndex(modBySlidesLength(currentIndex + direction))
  },
  [modBySlidesLength, currentIndex],
 )

 const handleMouse = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  const type = e.type === 'mouseout'
  setPlaying(type)
 }, [])

 return (
  <div className="flex flex-col justify-center w-full h-48 m-auto bg-slate-400">
   <div
    className="relative flex justify-center w-full h-full overflow-hidden"
    onMouseOver={handleMouse}
    onMouseOut={handleMouse}
   >
    {Children.toArray(
     getPresentableSlides().map((content, index) => (
      <Slide
       key={(content as ReactElement).key}
       moveSlide={moveSlide}
       offsetRadius={clampOffsetRadius(offsetRadius)}
       index={index}
      >
       {content}
      </Slide>
     )),
    )}
   </div>
  </div>
 )
}

export default React.memo(VerticalCarousel)
