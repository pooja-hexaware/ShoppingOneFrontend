import { createSlice } from '@reduxjs/toolkit'
import { fetchOrder } from './Order.action'
import { addOrder } from './Order.action'
import { editOrder } from './Order.action'
import { deleteOrder } from './Order.action'

const fetchOrderExtraReducer = {
    [fetchOrder.pending]: (state, action) => {
        state.loading = true
    },
    [fetchOrder.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchOrder.rejected]: (state, action) => {
        state.loading = false
    },
}

const addOrderExtraReducer = {
    [addOrder.pending]: (state, action) => {
        state.loading = true
    },
    [addOrder.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addOrder.rejected]: (state, action) => {
        state.loading = false
    },
}

const editOrderExtraReducer = {
    [editOrder.pending]: (state, action) => {
        state.loading = true
    },
    [editOrder.fulfilled]: (state, action) => {
        const { id, orderNumber, totalAmt, orderDate } = action.payload
        const existingOrder = state.entities.find(
            (Order) => Order?.id?.toString() === id?.toString()
        )
        if (existingOrder) {
            existingOrder.orderNumber = orderNumber
            existingOrder.totalAmt = totalAmt
            existingOrder.orderDate = orderDate
        }
        state.loading = false
    },
    [editOrder.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteOrderExtraReducer = {
    [deleteOrder.pending]: (state, action) => {
        state.loading = true
    },
    [deleteOrder.fulfilled]: (state, action) => {
        const id = action.payload
        const existingOrder = state.entities.find(
            (Order) => Order.id.toString() === id.toString()
        )
        if (existingOrder) {
            state.entities = state.entities.filter((Order) => Order.id !== id)
        }
        state.loading = false
    },
    [deleteOrder.rejected]: (state, action) => {
        state.loading = false
    },
}
const OrderSlice = createSlice({
    name: 'Order',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        OrderAdded(state, action) {
            state.entities.push(action.payload)
        },
        OrderUpdated(state, action) {
            const { id, orderNumber, totalAmt, orderDate } = action.payload
            const existingOrder = state.entities.find(
                (Order) => Order.id.toString() === id.toString()
            )
            if (existingOrder) {
                existingOrder.orderNumber = orderNumber
                existingOrder.totalAmt = totalAmt
                existingOrder.orderDate = orderDate
            }
        },
        OrderDeleted(state, action) {
            const { id } = action.payload
            const existingOrder = state.entities.find(
                (Order) => Order.id.toString() === id.toString()
            )
            if (existingOrder) {
                state.entities = state.entities.filter(
                    (Order) => Order.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchOrderExtraReducer,
        ...addOrderExtraReducer,
        ...editOrderExtraReducer,
        ...deleteOrderExtraReducer,
    },
})

export const { OrderAdded, OrderUpdated, OrderDeleted } = OrderSlice.actions

export default OrderSlice.reducer
