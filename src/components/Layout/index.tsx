import React from 'react'
import { Outlet } from 'react-router-dom'
import SnackbarContainer from '~/components/atoms/snackbar/SnackbarContainer'
import Header from '~/components/molecules/header'
import VerticalCarousel from '~/components/molecules/verticalCarousel'
import useAuth from '~/hooks/useAuth'

function Layout() {
 const { auth, handleGoogleLogin, signOut } = useAuth()

 return (
  <div className="w-full h-screen">
   <Header />

   <section>
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
