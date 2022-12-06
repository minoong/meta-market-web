import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { Provider } from 'jotai'
import { store } from '~/stores/jotai/store'
import App from './App'
import './index.css'

const queryClient = new QueryClient({
 defaultOptions: {
  queries: {
   retry: false,
   refetchOnWindowFocus: false,
  },
 },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
 <React.StrictMode>
  <Provider unstable_createStore={() => store}>
   <QueryClientProvider client={queryClient}>
    <Suspense fallback={<div>loading</div>}>
     <App />
    </Suspense>
    <ReactQueryDevtools initialIsOpen={false} />
   </QueryClientProvider>
  </Provider>
 </React.StrictMode>,
)
