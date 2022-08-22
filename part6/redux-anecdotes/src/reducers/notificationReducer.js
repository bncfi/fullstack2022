import { createSlice } from '@reduxjs/toolkit'

const notificationAtStart = null

const initialState = notificationAtStart

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotification(state, action) {
      state = action.payload
      return state
    },
  },
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer
