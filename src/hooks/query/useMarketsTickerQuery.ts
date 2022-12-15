import { useQuery } from '@tanstack/react-query'
import { atom } from 'jotai'
import ky from 'ky'
import useMarketsQuery from '~/hooks/query/useMarketsQuery'
import { MarketTicker } from '~/interface/apis/upbit/marketTicker'
import { UniversalUseQueryOptions } from '~/interface/react-query/universal'
import { Snackbar } from '~/interface/snackbar'
import { snackbarsAtom } from '~/stores/jotai/snackbarState'
import { store } from '~/stores/jotai/store'

async function getMarketsTicker(symbols: string) {
 const response = await ky.get(`https://api.upbit.com/v1/ticker?markets=${symbols}`)
 const data: MarketTicker[] = await response.json()

 return data
}

type GetMarketsTicker = typeof getMarketsTicker

function useMarketsTickerQuery<T = GetMarketsTicker>(options: UniversalUseQueryOptions<GetMarketsTicker, T> = {}) {
 const { data: symbols = '' } = useMarketsQuery({
  select: (data) => {
   const symbols = data
    .filter(({ market }) => market.startsWith('KRW-'))
    .map(({ market }) => market)
    .join(',')

   return symbols
  },
  suspense: true,
 })

 return useQuery(['markets', symbols], () => getMarketsTicker(symbols), {
  enabled: symbols !== '',
  suspense: true,
  onSuccess: () => {
   const newItem: Snackbar = {
    id: ['markets', symbols].join(''),
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
      ['markets', symbols].join(''),
    ),
    atom<Snackbar>(newItem),
   ])
  },
  ...options,
 })
}

export default useMarketsTickerQuery
