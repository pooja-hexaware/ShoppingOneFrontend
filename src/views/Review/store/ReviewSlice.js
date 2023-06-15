import { createSlice } from '@reduxjs/toolkit'
import { fetchReview } from './Review.action'
import { addReview } from './Review.action'
import { editReview } from './Review.action'
import { deleteReview } from './Review.action'

const fetchReviewExtraReducer = {
    [fetchReview.pending]: (state, action) => {
        state.loading = true
    },
    [fetchReview.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchReview.rejected]: (state, action) => {
        state.loading = false
    },
}

const addReviewExtraReducer = {
    [addReview.pending]: (state, action) => {
        state.loading = true
    },
    [addReview.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addReview.rejected]: (state, action) => {
        state.loading = false
    },
}

const editReviewExtraReducer = {
    [editReview.pending]: (state, action) => {
        state.loading = true
    },
    [editReview.fulfilled]: (state, action) => {
        const { id, reviewNumber, rating, content } = action.payload
        const existingReview = state.entities.find(
            (Review) => Review?.id?.toString() === id?.toString()
        )
        if (existingReview) {
            existingReview.reviewNumber = reviewNumber
            existingReview.rating = rating
            existingReview.content = content
        }
        state.loading = false
    },
    [editReview.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteReviewExtraReducer = {
    [deleteReview.pending]: (state, action) => {
        state.loading = true
    },
    [deleteReview.fulfilled]: (state, action) => {
        const id = action.payload
        const existingReview = state.entities.find(
            (Review) => Review.id.toString() === id.toString()
        )
        if (existingReview) {
            state.entities = state.entities.filter((Review) => Review.id !== id)
        }
        state.loading = false
    },
    [deleteReview.rejected]: (state, action) => {
        state.loading = false
    },
}
const ReviewSlice = createSlice({
    name: 'Review',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        ReviewAdded(state, action) {
            state.entities.push(action.payload)
        },
        ReviewUpdated(state, action) {
            const { id, reviewNumber, rating, content } = action.payload
            const existingReview = state.entities.find(
                (Review) => Review.id.toString() === id.toString()
            )
            if (existingReview) {
                existingReview.reviewNumber = reviewNumber
                existingReview.rating = rating
                existingReview.content = content
            }
        },
        ReviewDeleted(state, action) {
            const { id } = action.payload
            const existingReview = state.entities.find(
                (Review) => Review.id.toString() === id.toString()
            )
            if (existingReview) {
                state.entities = state.entities.filter(
                    (Review) => Review.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchReviewExtraReducer,
        ...addReviewExtraReducer,
        ...editReviewExtraReducer,
        ...deleteReviewExtraReducer,
    },
})

export const { ReviewAdded, ReviewUpdated, ReviewDeleted } = ReviewSlice.actions

export default ReviewSlice.reducer
