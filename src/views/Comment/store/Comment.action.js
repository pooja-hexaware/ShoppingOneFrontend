import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'Comment'

export const fetchComment = createAsyncThunk(
    'Comment/fetchComment',
    async () => {
        const response = await axios.get(`/${endPoint}`)
        const Comment = await response.data
        return Comment
    }
)

export const addComment = createAsyncThunk(
    'Comment/addComment',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const Comment = await response.data
        thunkAPI.dispatch(showSuccess('Comment added successfully'))
        return Comment
    }
)

export const editComment = createAsyncThunk(
    'Comment/editComment',
    async (data, thunkAPI) => {
        let body = {
            ...data,
        }

        delete body['id']

        const response = await axios.put(`/${endPoint}/${data.id}`, body)
        const Comment = await response.data
        thunkAPI.dispatch(showSuccess('Comment updated successfully'))
        return Comment
    }
)

export const deleteComment = createAsyncThunk(
    'Comment/deleteComment',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected Comment deleted successfully.')
            )
            return data.id
        }
    }
)
