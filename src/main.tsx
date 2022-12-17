import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ChakraProvider } from '@chakra-ui/react'

import { Provider as JotaiProvider } from 'jotai'
import { store as jotaiStore } from '~/stores/jotai/store'
import { Provider as ReduxProvider } from 'react-redux'
import { store as reduxStore } from '~/stores/redux/store'
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
  <ReduxProvider store={reduxStore}>
   <ChakraProvider>
    <JotaiProvider unstable_createStore={() => jotaiStore}>
     <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>loading</div>}>
       <App />
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
     </QueryClientProvider>
    </JotaiProvider>
   </ChakraProvider>
  </ReduxProvider>
 </React.StrictMode>,
)
