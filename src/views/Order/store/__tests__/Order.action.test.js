import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'store/store'
import { fetchOrder, addOrder, editOrder, deleteOrder } from '../order.action'

const getOrderListResponse = [
    {
        id: 1,
        orderNumber: 21,
        totalAmt: 76.66,
        orderDate: 'orderDate',
    },
]

const addOrderListResponse = (data) => {
    return { id: 2, ...data }
}
const editOrderListResponse = (data) => {
    return data
}

describe('should test Order redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'order'
    test('Should be able to fetch the order list and update order redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getOrderListResponse)
        const result = await store.dispatch(fetchOrder())
        const orderList = result.payload
        expect(result.type).toBe('order/fetchOrder/fulfilled')
        expect(orderList).toEqual(getOrderListResponse)

        const state = store.getState().order
        expect(state.entities).toEqual(orderList)
    })

    test('Should be able to add new order to list and make post api and update order redux store', async () => {
        const body = {
            orderNumber: 63,
            totalAmt: 73.11,
            orderDate: 'orderDate',
        }
        mock.onPost(`/${endPoint}`, body).reply(201, addOrderListResponse(body))
        const result = await store.dispatch(addOrder(body))
        const orderItem = result.payload
        expect(result.type).toBe('order/addOrder/fulfilled')
        expect(orderItem).toEqual(addOrderListResponse(body))

        const state = store.getState().order
        expect(state.entities).toContainEqual(addOrderListResponse(body))
    })

    test('Should be able to edit order in list and make put api call and update order redux store', async () => {
        const body = {
            id: 1,
            orderNumber: 43,
            totalAmt: 97.34,
            orderDate: 'orderDate',
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editOrderListResponse(body)
        )
        const result = await store.dispatch(editOrder(body))
        const orderItem = result.payload
        expect(result.type).toBe('order/editOrder/fulfilled')
        expect(orderItem).toEqual(editOrderListResponse(body))

        const state = store.getState().order
        let changedOrder = state.entities.find((p) => p.id === body.id)
        expect(changedOrder.name).toEqual(body.name)
    })

    test('Should be able to delete order in list and update order redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().order
        const initialLength = state.entities.length
        const result = await store.dispatch(deleteOrder(input))
        const deletId = result.payload
        expect(result.type).toBe('order/deleteOrder/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().order
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
