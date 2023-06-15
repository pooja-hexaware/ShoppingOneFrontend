import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'Order'

export const fetchOrder = createAsyncThunk('Order/fetchOrder', async () => {
    const response = await axios.get(`/${endPoint}`)
    const Order = await response.data
    return Order
})

export const addOrder = createAsyncThunk(
    'Order/addOrder',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const Order = await response.data
        thunkAPI.dispatch(showSuccess('Order added successfully'))
        return Order
    }
)

export const editOrder = createAsyncThunk(
    'Order/editOrder',
    async (data, thunkAPI) => {
        let body = {
            ...data,
        }

        delete body['id']

        const response = await axios.put(`/${endPoint}/${data.id}`, body)
        const Order = await response.data
        thunkAPI.dispatch(showSuccess('Order updated successfully'))
        return Order
    }
)

export const deleteOrder = createAsyncThunk(
    'Order/deleteOrder',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected Order deleted successfully.')
            )
            return data.id
        }
    }
)
