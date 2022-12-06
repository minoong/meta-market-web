import { Market } from '~/interface/apis/upbit/market'
import ky from 'ky'
import { useQuery } from '@tanstack/react-query'
import { UniversalUseQueryOptions } from '~/interface/react-query/universal'
import { Snackbar } from '~/interface/snackbar'
import { store } from '~/stores/jotai/store'
import { snackbarsAtom } from '~/stores/jotai/snackbarState'
import { atom } from 'jotai'

async function getMarkets() {
 const response = await ky.get('https://api.upbit.com/v1/market/all')
 const data: Market[] = await response.json()

 return data
}

type GetMarkets = typeof getMarkets

function useMarketsQuery<T = GetMarkets>(options: UniversalUseQueryOptions<GetMarkets, T> = {}) {
 return useQuery(['market', 'all'], getMarkets, {
  suspense: true,
  onSuccess: () => {
   const newItem: Snackbar = {
    id: ['market', 'all'].join(''),
    message: '테스트',
    type: 'Info',
    lifetime: 2500,
    truncate: 'truncate-1-lines',
   }

   const etest = store.get(snackbarsAtom) || []

   store.set(snackbarsAtom, [
    ...etest.filter(
     (v) =>
      ((v.read((get) => get) as unknown as typeof snackbarsAtom).init as unknown as Snackbar).id !==
      ['market', 'all'].join(''),
    ),
    atom<Snackbar>(newItem),
   ])
  },
  ...options,
 })
}

export default useMarketsQuery
