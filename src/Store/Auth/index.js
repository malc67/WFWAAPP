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
    updateSettingPref: (state, { payload: { setting } }) => {
      if (typeof setting !== 'undefined') {
        state.setting = setting
      }
    },
    clearAuth: (state) => {
      state.info = undefined
      state.profile = undefined
      state.setting = undefined
    }
  },
})

export const { updateInfo, updateBussinessProfile, updateSettingPref, clearAuth } = slice.actions

export default slice.reducer