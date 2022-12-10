import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '~/components/Layout'

const router = createBrowserRouter([
 {
  path: '/',
  element: <Layout />,
  children: [{ path: '/', element: <div>home</div> }],
 },
])

function Router() {
 return <RouterProvider router={router} />
}

export default Router
