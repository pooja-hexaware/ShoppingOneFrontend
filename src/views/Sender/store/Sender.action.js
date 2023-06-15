import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'Sender'

export const fetchSender = createAsyncThunk('Sender/fetchSender', async () => {
    const response = await axios.get(`/${endPoint}`)
    const Sender = await response.data
    return Sender
})

export const addSender = createAsyncThunk(
    'Sender/addSender',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const Sender = await response.data
        thunkAPI.dispatch(showSuccess('Sender added successfully'))
        return Sender
    }
)

export const editSender = createAsyncThunk(
    'Sender/editSender',
    async (data, thunkAPI) => {
        let body = {
            ...data,
        }

        delete body['id']

        const response = await axios.put(`/${endPoint}/${data.id}`, body)
        const Sender = await response.data
        thunkAPI.dispatch(showSuccess('Sender updated successfully'))
        return Sender
    }
)

export const deleteSender = createAsyncThunk(
    'Sender/deleteSender',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected Sender deleted successfully.')
            )
            return data.id
        }
    }
)
