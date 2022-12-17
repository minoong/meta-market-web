import React from 'react'
import { Outlet } from 'react-router-dom'
import SnackbarContainer from '~/components/atoms/snackbar/SnackbarContainer'
import Header from '~/components/molecules/header'

function Layout() {
 return (
  <div className="w-full min-w-[1410px] flex flex-col h-screen">
   <Header />

   <main className="h-fit flex-1 mt-[64px]">
    <Outlet />
   </main>

   <footer>footer</footer>

   <SnackbarContainer />
  </div>
 )
}

export default Layout
