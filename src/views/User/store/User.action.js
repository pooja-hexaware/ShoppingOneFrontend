import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'User'

export const fetchUser = createAsyncThunk('User/fetchUser', async () => {
    const response = await axios.get(`/${endPoint}`)
    const User = await response.data
    return User
})

export const addUser = createAsyncThunk(
    'User/addUser',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const User = await response.data
        thunkAPI.dispatch(showSuccess('User added successfully'))
        return User
    }
)

export const editUser = createAsyncThunk(
    'User/editUser',
    async (data, thunkAPI) => {
        let body = {
            ...data,
        }

        delete body['id']

        const response = await axios.put(`/${endPoint}/${data.id}`, body)
        const User = await response.data
        thunkAPI.dispatch(showSuccess('User updated successfully'))
        return User
    }
)

export const deleteUser = createAsyncThunk(
    'User/deleteUser',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected User deleted successfully.')
            )
            return data.id
        }
    }
)
