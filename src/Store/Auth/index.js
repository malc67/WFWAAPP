import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'auth',
  initialState: { info: {} },
  reducers: {
    updateInfo: (state, { payload: { info } }) => {
      if (typeof info !== 'undefined') {
        state.info = info
      }
    },
    updateBussinessProfile: (state, { payload: { profile } }) => {
      if (typeof profile !== 'undefined') {
        state.profile = profile
      }
    },
    clearAuth: (state) => {
      state.info = undefined
      state.profile = undefined
    }
  },
})

export const { updateInfo, updateBussinessProfile, clearAuth } = slice.actions

export default slice.reducer