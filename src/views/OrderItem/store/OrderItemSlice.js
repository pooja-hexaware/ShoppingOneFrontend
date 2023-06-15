import { createSlice } from '@reduxjs/toolkit'
import { fetchOrderItem } from './OrderItem.action'
import { addOrderItem } from './OrderItem.action'
import { editOrderItem } from './OrderItem.action'
import { deleteOrderItem } from './OrderItem.action'

const fetchOrderItemExtraReducer = {
    [fetchOrderItem.pending]: (state, action) => {
        state.loading = true
    },
    [fetchOrderItem.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchOrderItem.rejected]: (state, action) => {
        state.loading = false
    },
}

const addOrderItemExtraReducer = {
    [addOrderItem.pending]: (state, action) => {
        state.loading = true
    },
    [addOrderItem.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addOrderItem.rejected]: (state, action) => {
        state.loading = false
    },
}

const editOrderItemExtraReducer = {
    [editOrderItem.pending]: (state, action) => {
        state.loading = true
    },
    [editOrderItem.fulfilled]: (state, action) => {
        const { id, productNumber, quantity, price } = action.payload
        const existingOrderItem = state.entities.find(
            (OrderItem) => OrderItem?.id?.toString() === id?.toString()
        )
        if (existingOrderItem) {
            existingOrderItem.productNumber = productNumber
            existingOrderItem.quantity = quantity
            existingOrderItem.price = price
        }
        state.loading = false
    },
    [editOrderItem.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteOrderItemExtraReducer = {
    [deleteOrderItem.pending]: (state, action) => {
        state.loading = true
    },
    [deleteOrderItem.fulfilled]: (state, action) => {
        const id = action.payload
        const existingOrderItem = state.entities.find(
            (OrderItem) => OrderItem.id.toString() === id.toString()
        )
        if (existingOrderItem) {
            state.entities = state.entities.filter(
                (OrderItem) => OrderItem.id !== id
            )
        }
        state.loading = false
    },
    [deleteOrderItem.rejected]: (state, action) => {
        state.loading = false
    },
}
const OrderItemSlice = createSlice({
    name: 'OrderItem',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        OrderItemAdded(state, action) {
            state.entities.push(action.payload)
        },
        OrderItemUpdated(state, action) {
            const { id, productNumber, quantity, price } = action.payload
            const existingOrderItem = state.entities.find(
                (OrderItem) => OrderItem.id.toString() === id.toString()
            )
            if (existingOrderItem) {
                existingOrderItem.productNumber = productNumber
                existingOrderItem.quantity = quantity
                existingOrderItem.price = price
            }
        },
        OrderItemDeleted(state, action) {
            const { id } = action.payload
            const existingOrderItem = state.entities.find(
                (OrderItem) => OrderItem.id.toString() === id.toString()
            )
            if (existingOrderItem) {
                state.entities = state.entities.filter(
                    (OrderItem) => OrderItem.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchOrderItemExtraReducer,
        ...addOrderItemExtraReducer,
        ...editOrderItemExtraReducer,
        ...deleteOrderItemExtraReducer,
    },
})

export const { OrderItemAdded, OrderItemUpdated, OrderItemDeleted } =
    OrderItemSlice.actions

export default OrderItemSlice.reducer
