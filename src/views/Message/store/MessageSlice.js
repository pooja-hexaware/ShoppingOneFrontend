import { createSlice } from '@reduxjs/toolkit'
import { fetchMessage } from './Message.action'
import { addMessage } from './Message.action'
import { editMessage } from './Message.action'
import { deleteMessage } from './Message.action'

const fetchMessageExtraReducer = {
    [fetchMessage.pending]: (state, action) => {
        state.loading = true
    },
    [fetchMessage.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchMessage.rejected]: (state, action) => {
        state.loading = false
    },
}

const addMessageExtraReducer = {
    [addMessage.pending]: (state, action) => {
        state.loading = true
    },
    [addMessage.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addMessage.rejected]: (state, action) => {
        state.loading = false
    },
}

const editMessageExtraReducer = {
    [editMessage.pending]: (state, action) => {
        state.loading = true
    },
    [editMessage.fulfilled]: (state, action) => {
        const { id, messageNumber, senderNumber, receiverNumber, content } =
            action.payload
        const existingMessage = state.entities.find(
            (Message) => Message?.id?.toString() === id?.toString()
        )
        if (existingMessage) {
            existingMessage.messageNumber = messageNumber
            existingMessage.senderNumber = senderNumber
            existingMessage.receiverNumber = receiverNumber
            existingMessage.content = content
        }
        state.loading = false
    },
    [editMessage.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteMessageExtraReducer = {
    [deleteMessage.pending]: (state, action) => {
        state.loading = true
    },
    [deleteMessage.fulfilled]: (state, action) => {
        const id = action.payload
        const existingMessage = state.entities.find(
            (Message) => Message.id.toString() === id.toString()
        )
        if (existingMessage) {
            state.entities = state.entities.filter(
                (Message) => Message.id !== id
            )
        }
        state.loading = false
    },
    [deleteMessage.rejected]: (state, action) => {
        state.loading = false
    },
}
const MessageSlice = createSlice({
    name: 'Message',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        MessageAdded(state, action) {
            state.entities.push(action.payload)
        },
        MessageUpdated(state, action) {
            const { id, messageNumber, senderNumber, receiverNumber, content } =
                action.payload
            const existingMessage = state.entities.find(
                (Message) => Message.id.toString() === id.toString()
            )
            if (existingMessage) {
                existingMessage.messageNumber = messageNumber
                existingMessage.senderNumber = senderNumber
                existingMessage.receiverNumber = receiverNumber
                existingMessage.content = content
            }
        },
        MessageDeleted(state, action) {
            const { id } = action.payload
            const existingMessage = state.entities.find(
                (Message) => Message.id.toString() === id.toString()
            )
            if (existingMessage) {
                state.entities = state.entities.filter(
                    (Message) => Message.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchMessageExtraReducer,
        ...addMessageExtraReducer,
        ...editMessageExtraReducer,
        ...deleteMessageExtraReducer,
    },
})

export const { MessageAdded, MessageUpdated, MessageDeleted } =
    MessageSlice.actions

export default MessageSlice.reducer
