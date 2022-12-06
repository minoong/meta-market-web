import { Suspense, useEffect, useState } from 'react'
import { useSnackbar } from '~/hooks/useSnackbar'
import Snackbar from '~/components/atoms/snackbar'
import SnackbarContainer from '~/components/atoms/snackbar/SnackbarContainer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import useMarketsTickerQuery from '~/hooks/query/useMarketsTickerQuery'
import useMarketsQuery from '~/hooks/query/useMarketsQuery'
import reactLogo from './assets/react.svg'
import './App.css'

function Test() {
 const { data: data2 } = useMarketsTickerQuery()

 return (
  <>
   <div>sdf</div>
   {data2?.map((data) => (
    <div key={data.market}>{data.market}</div>
   ))}
  </>
 )
}

function App() {
 const [count, setCount] = useState(0)
 const { snackbars, handlePushSnackbar } = useSnackbar()

 const { data, status } = useMarketsQuery({
  select: (data) => {
   return 'fdsaf'
  },
 })
 const { data: data2, refetch } = useMarketsTickerQuery()

 return (
  <div className="App">
   <SnackbarContainer />
   <button
    onClick={() => {
     handlePushSnackbar('가단어리ㅏㄴ얼나ㅣ어ㅣㅏ', 'Success')
     //  refetch()
    }}
   >
    teset
   </button>
   <div>
    <Suspense fallback={<div>dsjfidsofjsdfoisjdfoisdjfosdjfoisjdoijdfodsjofis</div>}>
     <Test />
    </Suspense>
   </div>
   <div>
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
     <img src="/vite.svg" className="logo" alt="Vite logo" />
    </a>
    <a href="https://reactjs.org" target="_blank" rel="noreferrer">
     <img src={reactLogo} className="logo react" alt="React logo" />
    </a>
   </div>
   <h1>Vite + React</h1>
   <div className="card">
    <button type="button" onClick={() => setCount((count) => count + 1)}>
     count is {count}
    </button>
    <p>
     Edit <code>src/App.tsx</code> and save to test HMR
    </p>
   </div>
   <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
  </div>
 )
}

export default App
