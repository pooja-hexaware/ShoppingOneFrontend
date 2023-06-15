import { createSlice } from '@reduxjs/toolkit'
import { fetchCategory } from './Category.action'
import { addCategory } from './Category.action'
import { editCategory } from './Category.action'
import { deleteCategory } from './Category.action'

const fetchCategoryExtraReducer = {
    [fetchCategory.pending]: (state, action) => {
        state.loading = true
    },
    [fetchCategory.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchCategory.rejected]: (state, action) => {
        state.loading = false
    },
}

const addCategoryExtraReducer = {
    [addCategory.pending]: (state, action) => {
        state.loading = true
    },
    [addCategory.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addCategory.rejected]: (state, action) => {
        state.loading = false
    },
}

const editCategoryExtraReducer = {
    [editCategory.pending]: (state, action) => {
        state.loading = true
    },
    [editCategory.fulfilled]: (state, action) => {
        const { id, categoryNumber, categoryName, description } = action.payload
        const existingCategory = state.entities.find(
            (Category) => Category?.id?.toString() === id?.toString()
        )
        if (existingCategory) {
            existingCategory.categoryNumber = categoryNumber
            existingCategory.categoryName = categoryName
            existingCategory.description = description
        }
        state.loading = false
    },
    [editCategory.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteCategoryExtraReducer = {
    [deleteCategory.pending]: (state, action) => {
        state.loading = true
    },
    [deleteCategory.fulfilled]: (state, action) => {
        const id = action.payload
        const existingCategory = state.entities.find(
            (Category) => Category.id.toString() === id.toString()
        )
        if (existingCategory) {
            state.entities = state.entities.filter(
                (Category) => Category.id !== id
            )
        }
        state.loading = false
    },
    [deleteCategory.rejected]: (state, action) => {
        state.loading = false
    },
}
const CategorySlice = createSlice({
    name: 'Category',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        CategoryAdded(state, action) {
            state.entities.push(action.payload)
        },
        CategoryUpdated(state, action) {
            const { id, categoryNumber, categoryName, description } =
                action.payload
            const existingCategory = state.entities.find(
                (Category) => Category.id.toString() === id.toString()
            )
            if (existingCategory) {
                existingCategory.categoryNumber = categoryNumber
                existingCategory.categoryName = categoryName
                existingCategory.description = description
            }
        },
        CategoryDeleted(state, action) {
            const { id } = action.payload
            const existingCategory = state.entities.find(
                (Category) => Category.id.toString() === id.toString()
            )
            if (existingCategory) {
                state.entities = state.entities.filter(
                    (Category) => Category.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchCategoryExtraReducer,
        ...addCategoryExtraReducer,
        ...editCategoryExtraReducer,
        ...deleteCategoryExtraReducer,
    },
})

export const { CategoryAdded, CategoryUpdated, CategoryDeleted } =
    CategorySlice.actions

export default CategorySlice.reducer
