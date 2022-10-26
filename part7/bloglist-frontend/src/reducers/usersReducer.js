import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
  name: 'loggedInUser',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = usersSlice.actions

export default usersSlice.reducer
