import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'Category'

export const fetchCategory = createAsyncThunk(
    'Category/fetchCategory',
    async () => {
        const response = await axios.get(`/${endPoint}`)
        const Category = await response.data
        return Category
    }
)

export const addCategory = createAsyncThunk(
    'Category/addCategory',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const Category = await response.data
        thunkAPI.dispatch(showSuccess('Category added successfully'))
        return Category
    }
)

export const editCategory = createAsyncThunk(
    'Category/editCategory',
    async (data, thunkAPI) => {
        let body = {
            ...data,
        }

        delete body['id']

        const response = await axios.put(`/${endPoint}/${data.id}`, body)
        const Category = await response.data
        thunkAPI.dispatch(showSuccess('Category updated successfully'))
        return Category
    }
)

export const deleteCategory = createAsyncThunk(
    'Category/deleteCategory',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected Category deleted successfully.')
            )
            return data.id
        }
    }
)
