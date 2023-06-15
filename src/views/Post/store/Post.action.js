import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'Post'

export const fetchPost = createAsyncThunk('Post/fetchPost', async () => {
    const response = await axios.get(`/${endPoint}`)
    const Post = await response.data
    return Post
})

export const addPost = createAsyncThunk(
    'Post/addPost',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const Post = await response.data
        thunkAPI.dispatch(showSuccess('Post added successfully'))
        return Post
    }
)

export const editPost = createAsyncThunk(
    'Post/editPost',
    async (data, thunkAPI) => {
        let body = {
            ...data,
        }

        delete body['id']

        const response = await axios.put(`/${endPoint}/${data.id}`, body)
        const Post = await response.data
        thunkAPI.dispatch(showSuccess('Post updated successfully'))
        return Post
    }
)

export const deletePost = createAsyncThunk(
    'Post/deletePost',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected Post deleted successfully.')
            )
            return data.id
        }
    }
)
