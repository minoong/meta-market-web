import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = { search: '' }

export const searchSlice = createSlice({
 name: 'market/search',
 initialState,
 reducers: {
  change: (state, action: PayloadAction<string>) => {
   state.search = action.payload
  },
 },
})

const searchReducer = searchSlice.reducer

export const { change } = searchSlice.actions
export default searchReducer
