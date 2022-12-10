import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '~/components/molecules/header'
import { auth } from '~/firebase'

function Layout() {
 const [userData, setUserData] = useState<User>()

 function handleGoogleLogin() {
  const provider = new GoogleAuthProvider()
  signInWithPopup(auth, provider)
   .then((data) => {
    setUserData(data.user)
   })
   .catch((err) => {
    console.log(err)
   })
 }
 return (
  <div className="w-full h-screen">
   <Header />

   <section>
    <button onClick={handleGoogleLogin}>Login</button>
    {userData ? userData.displayName : null}
    <Outlet />
   </section>
  </div>
 )
}

export default Layout
