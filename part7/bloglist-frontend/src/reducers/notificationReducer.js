import { createSlice } from '@reduxjs/toolkit'

const initialState = null

let timeOutId = null

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

export const notificationSetter = (notification) => {
  return (dispatch) => {
    dispatch(setNotification(notification.message))
    if (timeOutId) {
      clearTimeout(timeOutId)
    }

    timeOutId = setTimeout(() => {
      dispatch(setNotification(null))
    }, notification.time * 1000)
  }
}

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer
