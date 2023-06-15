import { createSlice } from '@reduxjs/toolkit'
import { fetchSender } from './Sender.action'
import { addSender } from './Sender.action'
import { editSender } from './Sender.action'
import { deleteSender } from './Sender.action'

const fetchSenderExtraReducer = {
    [fetchSender.pending]: (state, action) => {
        state.loading = true
    },
    [fetchSender.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchSender.rejected]: (state, action) => {
        state.loading = false
    },
}

const addSenderExtraReducer = {
    [addSender.pending]: (state, action) => {
        state.loading = true
    },
    [addSender.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addSender.rejected]: (state, action) => {
        state.loading = false
    },
}

const editSenderExtraReducer = {
    [editSender.pending]: (state, action) => {
        state.loading = true
    },
    [editSender.fulfilled]: (state, action) => {
        const { id, senderNumber, userId } = action.payload
        const existingSender = state.entities.find(
            (Sender) => Sender?.id?.toString() === id?.toString()
        )
        if (existingSender) {
            existingSender.senderNumber = senderNumber
            existingSender.userId = userId
        }
        state.loading = false
    },
    [editSender.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteSenderExtraReducer = {
    [deleteSender.pending]: (state, action) => {
        state.loading = true
    },
    [deleteSender.fulfilled]: (state, action) => {
        const id = action.payload
        const existingSender = state.entities.find(
            (Sender) => Sender.id.toString() === id.toString()
        )
        if (existingSender) {
            state.entities = state.entities.filter((Sender) => Sender.id !== id)
        }
        state.loading = false
    },
    [deleteSender.rejected]: (state, action) => {
        state.loading = false
    },
}
const SenderSlice = createSlice({
    name: 'Sender',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        SenderAdded(state, action) {
            state.entities.push(action.payload)
        },
        SenderUpdated(state, action) {
            const { id, senderNumber, userId } = action.payload
            const existingSender = state.entities.find(
                (Sender) => Sender.id.toString() === id.toString()
            )
            if (existingSender) {
                existingSender.senderNumber = senderNumber
                existingSender.userId = userId
            }
        },
        SenderDeleted(state, action) {
            const { id } = action.payload
            const existingSender = state.entities.find(
                (Sender) => Sender.id.toString() === id.toString()
            )
            if (existingSender) {
                state.entities = state.entities.filter(
                    (Sender) => Sender.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchSenderExtraReducer,
        ...addSenderExtraReducer,
        ...editSenderExtraReducer,
        ...deleteSenderExtraReducer,
    },
})

export const { SenderAdded, SenderUpdated, SenderDeleted } = SenderSlice.actions

export default SenderSlice.reducer
