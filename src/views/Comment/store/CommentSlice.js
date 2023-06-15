import { createSlice } from '@reduxjs/toolkit'
import { fetchComment } from './Comment.action'
import { addComment } from './Comment.action'
import { editComment } from './Comment.action'
import { deleteComment } from './Comment.action'

const fetchCommentExtraReducer = {
    [fetchComment.pending]: (state, action) => {
        state.loading = true
    },
    [fetchComment.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchComment.rejected]: (state, action) => {
        state.loading = false
    },
}

const addCommentExtraReducer = {
    [addComment.pending]: (state, action) => {
        state.loading = true
    },
    [addComment.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addComment.rejected]: (state, action) => {
        state.loading = false
    },
}

const editCommentExtraReducer = {
    [editComment.pending]: (state, action) => {
        state.loading = true
    },
    [editComment.fulfilled]: (state, action) => {
        const { id, commentNumber, content } = action.payload
        const existingComment = state.entities.find(
            (Comment) => Comment?.id?.toString() === id?.toString()
        )
        if (existingComment) {
            existingComment.commentNumber = commentNumber
            existingComment.content = content
        }
        state.loading = false
    },
    [editComment.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteCommentExtraReducer = {
    [deleteComment.pending]: (state, action) => {
        state.loading = true
    },
    [deleteComment.fulfilled]: (state, action) => {
        const id = action.payload
        const existingComment = state.entities.find(
            (Comment) => Comment.id.toString() === id.toString()
        )
        if (existingComment) {
            state.entities = state.entities.filter(
                (Comment) => Comment.id !== id
            )
        }
        state.loading = false
    },
    [deleteComment.rejected]: (state, action) => {
        state.loading = false
    },
}
const CommentSlice = createSlice({
    name: 'Comment',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        CommentAdded(state, action) {
            state.entities.push(action.payload)
        },
        CommentUpdated(state, action) {
            const { id, commentNumber, content } = action.payload
            const existingComment = state.entities.find(
                (Comment) => Comment.id.toString() === id.toString()
            )
            if (existingComment) {
                existingComment.commentNumber = commentNumber
                existingComment.content = content
            }
        },
        CommentDeleted(state, action) {
            const { id } = action.payload
            const existingComment = state.entities.find(
                (Comment) => Comment.id.toString() === id.toString()
            )
            if (existingComment) {
                state.entities = state.entities.filter(
                    (Comment) => Comment.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchCommentExtraReducer,
        ...addCommentExtraReducer,
        ...editCommentExtraReducer,
        ...deleteCommentExtraReducer,
    },
})

export const { CommentAdded, CommentUpdated, CommentDeleted } =
    CommentSlice.actions

export default CommentSlice.reducer
