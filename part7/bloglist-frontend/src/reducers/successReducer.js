import { createSlice } from '@reduxjs/toolkit'

const initialState = null

let timeOutId = null

const successSlice = createSlice({
  name: 'success',
  initialState,
  reducers: {
    setSuccess(state, action) {
      return action.payload
    },
  },
})

export const successSetter = (success) => {
  return (dispatch) => {
    dispatch(setSuccess(success.message))
    if (timeOutId) {
      clearTimeout(timeOutId)
    }

    timeOutId = setTimeout(() => {
      dispatch(setSuccess(null))
    }, success.time * 1000)
  }
}

export const { setSuccess } = successSlice.actions
export default successSlice.reducer
