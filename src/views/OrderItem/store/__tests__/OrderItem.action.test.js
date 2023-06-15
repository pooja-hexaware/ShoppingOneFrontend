import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'store/store'
import {
    fetchOrderItem,
    addOrderItem,
    editOrderItem,
    deleteOrderItem,
} from '../orderItem.action'

const getOrderItemListResponse = [
    {
        id: 1,
        productNumber: 'productNumber',
        quantity: 65,
        price: 89.89,
    },
]

const addOrderItemListResponse = (data) => {
    return { id: 2, ...data }
}
const editOrderItemListResponse = (data) => {
    return data
}

describe('should test OrderItem redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'orderItem'
    test('Should be able to fetch the orderItem list and update orderItem redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getOrderItemListResponse)
        const result = await store.dispatch(fetchOrderItem())
        const orderItemList = result.payload
        expect(result.type).toBe('orderItem/fetchOrderItem/fulfilled')
        expect(orderItemList).toEqual(getOrderItemListResponse)

        const state = store.getState().orderItem
        expect(state.entities).toEqual(orderItemList)
    })

    test('Should be able to add new orderItem to list and make post api and update orderItem redux store', async () => {
        const body = {
            productNumber: 'productNumber',
            quantity: 18,
            price: 57.85,
        }
        mock.onPost(`/${endPoint}`, body).reply(
            201,
            addOrderItemListResponse(body)
        )
        const result = await store.dispatch(addOrderItem(body))
        const orderItemItem = result.payload
        expect(result.type).toBe('orderItem/addOrderItem/fulfilled')
        expect(orderItemItem).toEqual(addOrderItemListResponse(body))

        const state = store.getState().orderItem
        expect(state.entities).toContainEqual(addOrderItemListResponse(body))
    })

    test('Should be able to edit orderItem in list and make put api call and update orderItem redux store', async () => {
        const body = {
            id: 1,
            productNumber: 'productNumber',
            quantity: 29,
            price: 57.37,
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editOrderItemListResponse(body)
        )
        const result = await store.dispatch(editOrderItem(body))
        const orderItemItem = result.payload
        expect(result.type).toBe('orderItem/editOrderItem/fulfilled')
        expect(orderItemItem).toEqual(editOrderItemListResponse(body))

        const state = store.getState().orderItem
        let changedOrderItem = state.entities.find((p) => p.id === body.id)
        expect(changedOrderItem.name).toEqual(body.name)
    })

    test('Should be able to delete orderItem in list and update orderItem redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().orderItem
        const initialLength = state.entities.length
        const result = await store.dispatch(deleteOrderItem(input))
        const deletId = result.payload
        expect(result.type).toBe('orderItem/deleteOrderItem/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().orderItem
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
