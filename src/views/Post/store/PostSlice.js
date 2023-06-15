import { createSlice } from '@reduxjs/toolkit'
import { fetchPost } from './Post.action'
import { addPost } from './Post.action'
import { editPost } from './Post.action'
import { deletePost } from './Post.action'

const fetchPostExtraReducer = {
    [fetchPost.pending]: (state, action) => {
        state.loading = true
    },
    [fetchPost.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchPost.rejected]: (state, action) => {
        state.loading = false
    },
}

const addPostExtraReducer = {
    [addPost.pending]: (state, action) => {
        state.loading = true
    },
    [addPost.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addPost.rejected]: (state, action) => {
        state.loading = false
    },
}

const editPostExtraReducer = {
    [editPost.pending]: (state, action) => {
        state.loading = true
    },
    [editPost.fulfilled]: (state, action) => {
        const { id, postNumber, title, content } = action.payload
        const existingPost = state.entities.find(
            (Post) => Post?.id?.toString() === id?.toString()
        )
        if (existingPost) {
            existingPost.postNumber = postNumber
            existingPost.title = title
            existingPost.content = content
        }
        state.loading = false
    },
    [editPost.rejected]: (state, action) => {
        state.loading = false
    },
}

const deletePostExtraReducer = {
    [deletePost.pending]: (state, action) => {
        state.loading = true
    },
    [deletePost.fulfilled]: (state, action) => {
        const id = action.payload
        const existingPost = state.entities.find(
            (Post) => Post.id.toString() === id.toString()
        )
        if (existingPost) {
            state.entities = state.entities.filter((Post) => Post.id !== id)
        }
        state.loading = false
    },
    [deletePost.rejected]: (state, action) => {
        state.loading = false
    },
}
const PostSlice = createSlice({
    name: 'Post',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        PostAdded(state, action) {
            state.entities.push(action.payload)
        },
        PostUpdated(state, action) {
            const { id, postNumber, title, content } = action.payload
            const existingPost = state.entities.find(
                (Post) => Post.id.toString() === id.toString()
            )
            if (existingPost) {
                existingPost.postNumber = postNumber
                existingPost.title = title
                existingPost.content = content
            }
        },
        PostDeleted(state, action) {
            const { id } = action.payload
            const existingPost = state.entities.find(
                (Post) => Post.id.toString() === id.toString()
            )
            if (existingPost) {
                state.entities = state.entities.filter((Post) => Post.id !== id)
            }
        },
    },
    extraReducers: {
        ...fetchPostExtraReducer,
        ...addPostExtraReducer,
        ...editPostExtraReducer,
        ...deletePostExtraReducer,
    },
})

export const { PostAdded, PostUpdated, PostDeleted } = PostSlice.actions

export default PostSlice.reducer
