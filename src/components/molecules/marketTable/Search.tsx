import React from 'react'
import { change } from '~/features/market/search/searchSlice'
import { FcSearch } from 'react-icons/fc'
import { IoIosClose } from 'react-icons/io'
import { useAppDispatch, useAppSelector } from '~/stores/redux/store'

function Search() {
 const search = useAppSelector((state) => state['market/search'].search)
 const dispatch = useAppDispatch()

 return (
  <div className="w-full flex items-center p-1 border-b">
   <input
    className="flex-1 outline-none border-0 p-1 text-gray-800 pr-9"
    type="text"
    placeholder="코인명/심볼검색"
    value={search}
    onChange={(e) => dispatch(change(e.target.value))}
    onKeyDown={(e) => {
     if (e.key === 'Escape') {
      dispatch(change(''))
     }
    }}
   />
   {search && (
    <button className="absolute right-[34px]" onClick={() => dispatch(change(''))}>
     <IoIosClose size={24} />
    </button>
   )}
   <FcSearch size={24} />
  </div>
 )
}

export default Search
