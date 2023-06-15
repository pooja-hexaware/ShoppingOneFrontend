import { createSlice } from '@reduxjs/toolkit'
import { fetchUser } from './User.action'
import { addUser } from './User.action'
import { editUser } from './User.action'
import { deleteUser } from './User.action'

const fetchUserExtraReducer = {
    [fetchUser.pending]: (state, action) => {
        state.loading = true
    },
    [fetchUser.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchUser.rejected]: (state, action) => {
        state.loading = false
    },
}

const addUserExtraReducer = {
    [addUser.pending]: (state, action) => {
        state.loading = true
    },
    [addUser.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addUser.rejected]: (state, action) => {
        state.loading = false
    },
}

const editUserExtraReducer = {
    [editUser.pending]: (state, action) => {
        state.loading = true
    },
    [editUser.fulfilled]: (state, action) => {
        const { id, userId, username, email, password, doj } = action.payload
        const existingUser = state.entities.find(
            (User) => User?.id?.toString() === id?.toString()
        )
        if (existingUser) {
            existingUser.userId = userId
            existingUser.username = username
            existingUser.email = email
            existingUser.password = password
            existingUser.doj = doj
        }
        state.loading = false
    },
    [editUser.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteUserExtraReducer = {
    [deleteUser.pending]: (state, action) => {
        state.loading = true
    },
    [deleteUser.fulfilled]: (state, action) => {
        const id = action.payload
        const existingUser = state.entities.find(
            (User) => User.id.toString() === id.toString()
        )
        if (existingUser) {
            state.entities = state.entities.filter((User) => User.id !== id)
        }
        state.loading = false
    },
    [deleteUser.rejected]: (state, action) => {
        state.loading = false
    },
}
const UserSlice = createSlice({
    name: 'User',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        UserAdded(state, action) {
            state.entities.push(action.payload)
        },
        UserUpdated(state, action) {
            const { id, userId, username, email, password, doj } =
                action.payload
            const existingUser = state.entities.find(
                (User) => User.id.toString() === id.toString()
            )
            if (existingUser) {
                existingUser.userId = userId
                existingUser.username = username
                existingUser.email = email
                existingUser.password = password
                existingUser.doj = doj
            }
        },
        UserDeleted(state, action) {
            const { id } = action.payload
            const existingUser = state.entities.find(
                (User) => User.id.toString() === id.toString()
            )
            if (existingUser) {
                state.entities = state.entities.filter((User) => User.id !== id)
            }
        },
    },
    extraReducers: {
        ...fetchUserExtraReducer,
        ...addUserExtraReducer,
        ...editUserExtraReducer,
        ...deleteUserExtraReducer,
    },
})

export const { UserAdded, UserUpdated, UserDeleted } = UserSlice.actions

export default UserSlice.reducer
