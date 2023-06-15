import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'Receiver'

export const fetchReceiver = createAsyncThunk(
    'Receiver/fetchReceiver',
    async () => {
        const response = await axios.get(`/${endPoint}`)
        const Receiver = await response.data
        return Receiver
    }
)

export const addReceiver = createAsyncThunk(
    'Receiver/addReceiver',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const Receiver = await response.data
        thunkAPI.dispatch(showSuccess('Receiver added successfully'))
        return Receiver
    }
)

export const editReceiver = createAsyncThunk(
    'Receiver/editReceiver',
    async (data, thunkAPI) => {
        let body = {
            ...data,
        }

        delete body['id']

        const response = await axios.put(`/${endPoint}/${data.id}`, body)
        const Receiver = await response.data
        thunkAPI.dispatch(showSuccess('Receiver updated successfully'))
        return Receiver
    }
)

export const deleteReceiver = createAsyncThunk(
    'Receiver/deleteReceiver',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected Receiver deleted successfully.')
            )
            return data.id
        }
    }
)
