import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '~/components/molecules/header'

function Layout() {
 return (
  <div className="w-full h-screen">
   <Header />

   <section>
    <Outlet />
   </section>
  </div>
 )
}

export default Layout
