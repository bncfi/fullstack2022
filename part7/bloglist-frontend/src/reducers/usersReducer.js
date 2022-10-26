import { createSlice } from '@reduxjs/toolkit'
//import loginService from '../services/login'

const usersSlice = createSlice({
  name: 'users',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = usersSlice.actions

export default usersSlice.reducer
