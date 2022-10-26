import { createSlice } from '@reduxjs/toolkit'

const initialState = null

let timeOutId = null

const errorSlice = createSlice({
  name: 'errorError',
  initialState,
  reducers: {
    setError(state, action) {
      state = action.payload
      return state
    },
  },
})

export const errorSetter = (error) => {
  return (dispatch) => {
    dispatch(setError(error.message))
    if (timeOutId) {
      clearTimeout(timeOutId)
    }

    timeOutId = setTimeout(() => {
      dispatch(setError(null))
    }, error.time * 1000)
  }
}

export const { setError } = errorSlice.actions
export default errorSlice.reducer
