import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'Message'

export const fetchMessage = createAsyncThunk(
    'Message/fetchMessage',
    async () => {
        const response = await axios.get(`/${endPoint}`)
        const Message = await response.data
        return Message
    }
)

export const addMessage = createAsyncThunk(
    'Message/addMessage',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const Message = await response.data
        thunkAPI.dispatch(showSuccess('Message added successfully'))
        return Message
    }
)

export const editMessage = createAsyncThunk(
    'Message/editMessage',
    async (data, thunkAPI) => {
        let body = {
            ...data,
        }

        delete body['id']

        const response = await axios.put(`/${endPoint}/${data.id}`, body)
        const Message = await response.data
        thunkAPI.dispatch(showSuccess('Message updated successfully'))
        return Message
    }
)

export const deleteMessage = createAsyncThunk(
    'Message/deleteMessage',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected Message deleted successfully.')
            )
            return data.id
        }
    }
)
