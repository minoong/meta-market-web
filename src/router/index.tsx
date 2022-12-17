import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '~/components/Layout'
import Home from '~/pages/Home'
import Exchange from '~/pages/markets/Exchange'

const router = createBrowserRouter([
 {
  path: '/',
  element: <Layout />,
  children: [
   {
    path: '/',
    element: <Home />,
   },
   {
    path: '/exchange/:symbol?',
    element: <Exchange />,
   },
  ],
 },
])

function Router() {
 return <RouterProvider router={router} />
}

export default Router
