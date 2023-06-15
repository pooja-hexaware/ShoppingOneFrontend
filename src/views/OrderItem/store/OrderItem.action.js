import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'OrderItem'

export const fetchOrderItem = createAsyncThunk(
    'OrderItem/fetchOrderItem',
    async () => {
        const response = await axios.get(`/${endPoint}`)
        const OrderItem = await response.data
        return OrderItem
    }
)

export const addOrderItem = createAsyncThunk(
    'OrderItem/addOrderItem',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const OrderItem = await response.data
        thunkAPI.dispatch(showSuccess('OrderItem added successfully'))
        return OrderItem
    }
)

export const editOrderItem = createAsyncThunk(
    'OrderItem/editOrderItem',
    async (data, thunkAPI) => {
        let body = {
            ...data,
        }

        delete body['id']

        const response = await axios.put(`/${endPoint}/${data.id}`, body)
        const OrderItem = await response.data
        thunkAPI.dispatch(showSuccess('OrderItem updated successfully'))
        return OrderItem
    }
)

export const deleteOrderItem = createAsyncThunk(
    'OrderItem/deleteOrderItem',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected OrderItem deleted successfully.')
            )
            return data.id
        }
    }
)
