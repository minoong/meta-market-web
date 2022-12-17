import React from 'react'
import { Outlet } from 'react-router-dom'
import SnackbarContainer from '~/components/atoms/snackbar/SnackbarContainer'
import Header from '~/components/molecules/header'
import VerticalCarousel from '~/components/molecules/verticalCarousel'
import { decrement, increment } from '~/features/counter/counterSlice'
import { change } from '~/features/market/search/searchSlice'
import useAuth from '~/hooks/useAuth'
import { useAppDispatch, useAppSelector } from '~/stores/redux/store'

function Layout() {
 const count = useAppSelector((state) => state.counter.value)
 const search = useAppSelector((state) => state['market/search'].search)
 const dispatch = useAppDispatch()
 const { auth, handleGoogleLogin, signOut } = useAuth()

 return (
  <div className="w-full h-full">
   <Header />

   <section>
    <div>
     <button aria-label="Increment value" onClick={() => dispatch(increment())}>
      Increment
     </button>
     <span>
      {count}, {search}
     </span>
     <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
      Decrement
     </button>
     <input value={search} onChange={(e) => dispatch(change(e.target.value))} />
    </div>
    <button onClick={handleGoogleLogin}>Login</button>
    <button onClick={signOut}>signOut</button>
    {auth ? auth.displayName : null}
    <Outlet />
    <VerticalCarousel offsetRadius={4}>
     {[1, 2, 3].map((v) => (
      <div key={v}># {v}</div>
     ))}
    </VerticalCarousel>
   </section>

   <SnackbarContainer />
  </div>
 )
}

export default Layout
