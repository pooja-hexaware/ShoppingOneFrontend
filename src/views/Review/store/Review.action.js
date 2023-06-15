import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'Review'

export const fetchReview = createAsyncThunk('Review/fetchReview', async () => {
    const response = await axios.get(`/${endPoint}`)
    const Review = await response.data
    return Review
})

export const addReview = createAsyncThunk(
    'Review/addReview',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const Review = await response.data
        thunkAPI.dispatch(showSuccess('Review added successfully'))
        return Review
    }
)

export const editReview = createAsyncThunk(
    'Review/editReview',
    async (data, thunkAPI) => {
        let body = {
            ...data,
        }

        delete body['id']

        const response = await axios.put(`/${endPoint}/${data.id}`, body)
        const Review = await response.data
        thunkAPI.dispatch(showSuccess('Review updated successfully'))
        return Review
    }
)

export const deleteReview = createAsyncThunk(
    'Review/deleteReview',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected Review deleted successfully.')
            )
            return data.id
        }
    }
)
