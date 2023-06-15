import { createSlice } from '@reduxjs/toolkit'
import { fetchReceiver } from './Receiver.action'
import { addReceiver } from './Receiver.action'
import { editReceiver } from './Receiver.action'
import { deleteReceiver } from './Receiver.action'

const fetchReceiverExtraReducer = {
    [fetchReceiver.pending]: (state, action) => {
        state.loading = true
    },
    [fetchReceiver.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchReceiver.rejected]: (state, action) => {
        state.loading = false
    },
}

const addReceiverExtraReducer = {
    [addReceiver.pending]: (state, action) => {
        state.loading = true
    },
    [addReceiver.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addReceiver.rejected]: (state, action) => {
        state.loading = false
    },
}

const editReceiverExtraReducer = {
    [editReceiver.pending]: (state, action) => {
        state.loading = true
    },
    [editReceiver.fulfilled]: (state, action) => {
        const { id, receiverNumber, userId } = action.payload
        const existingReceiver = state.entities.find(
            (Receiver) => Receiver?.id?.toString() === id?.toString()
        )
        if (existingReceiver) {
            existingReceiver.receiverNumber = receiverNumber
            existingReceiver.userId = userId
        }
        state.loading = false
    },
    [editReceiver.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteReceiverExtraReducer = {
    [deleteReceiver.pending]: (state, action) => {
        state.loading = true
    },
    [deleteReceiver.fulfilled]: (state, action) => {
        const id = action.payload
        const existingReceiver = state.entities.find(
            (Receiver) => Receiver.id.toString() === id.toString()
        )
        if (existingReceiver) {
            state.entities = state.entities.filter(
                (Receiver) => Receiver.id !== id
            )
        }
        state.loading = false
    },
    [deleteReceiver.rejected]: (state, action) => {
        state.loading = false
    },
}
const ReceiverSlice = createSlice({
    name: 'Receiver',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        ReceiverAdded(state, action) {
            state.entities.push(action.payload)
        },
        ReceiverUpdated(state, action) {
            const { id, receiverNumber, userId } = action.payload
            const existingReceiver = state.entities.find(
                (Receiver) => Receiver.id.toString() === id.toString()
            )
            if (existingReceiver) {
                existingReceiver.receiverNumber = receiverNumber
                existingReceiver.userId = userId
            }
        },
        ReceiverDeleted(state, action) {
            const { id } = action.payload
            const existingReceiver = state.entities.find(
                (Receiver) => Receiver.id.toString() === id.toString()
            )
            if (existingReceiver) {
                state.entities = state.entities.filter(
                    (Receiver) => Receiver.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchReceiverExtraReducer,
        ...addReceiverExtraReducer,
        ...editReceiverExtraReducer,
        ...deleteReceiverExtraReducer,
    },
})

export const { ReceiverAdded, ReceiverUpdated, ReceiverDeleted } =
    ReceiverSlice.actions

export default ReceiverSlice.reducer
