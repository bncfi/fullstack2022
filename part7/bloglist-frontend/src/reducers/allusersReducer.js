import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState: [],
  reducers: {
    setAllUsers(state, action) {
      return action.payload
    },
  },
})

export const { setAllUsers } = allUsersSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll()
    dispatch(setAllUsers(users))
  }
}

export default allUsersSlice.reducer
