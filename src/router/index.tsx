import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '~/components/Layout'
import Home from '~/pages/Home'

const router = createBrowserRouter([
 {
  path: '/',
  element: <Layout />,
  children: [
   {
    path: '/',
    element: <Home />,
   },
  ],
 },
])

function Router() {
 return <RouterProvider router={router} />
}

export default Router
