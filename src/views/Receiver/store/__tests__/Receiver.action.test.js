import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'store/store'
import {
    fetchReceiver,
    addReceiver,
    editReceiver,
    deleteReceiver,
} from '../receiver.action'

const getReceiverListResponse = [
    {
        id: 1,
        receiverNumber: 33,
        userId: 71,
    },
]

const addReceiverListResponse = (data) => {
    return { id: 2, ...data }
}
const editReceiverListResponse = (data) => {
    return data
}

describe('should test Receiver redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'receiver'
    test('Should be able to fetch the receiver list and update receiver redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getReceiverListResponse)
        const result = await store.dispatch(fetchReceiver())
        const receiverList = result.payload
        expect(result.type).toBe('receiver/fetchReceiver/fulfilled')
        expect(receiverList).toEqual(getReceiverListResponse)

        const state = store.getState().receiver
        expect(state.entities).toEqual(receiverList)
    })

    test('Should be able to add new receiver to list and make post api and update receiver redux store', async () => {
        const body = {
            receiverNumber: 7,
            userId: 68,
        }
        mock.onPost(`/${endPoint}`, body).reply(
            201,
            addReceiverListResponse(body)
        )
        const result = await store.dispatch(addReceiver(body))
        const receiverItem = result.payload
        expect(result.type).toBe('receiver/addReceiver/fulfilled')
        expect(receiverItem).toEqual(addReceiverListResponse(body))

        const state = store.getState().receiver
        expect(state.entities).toContainEqual(addReceiverListResponse(body))
    })

    test('Should be able to edit receiver in list and make put api call and update receiver redux store', async () => {
        const body = {
            id: 1,
            receiverNumber: 79,
            userId: 5,
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editReceiverListResponse(body)
        )
        const result = await store.dispatch(editReceiver(body))
        const receiverItem = result.payload
        expect(result.type).toBe('receiver/editReceiver/fulfilled')
        expect(receiverItem).toEqual(editReceiverListResponse(body))

        const state = store.getState().receiver
        let changedReceiver = state.entities.find((p) => p.id === body.id)
        expect(changedReceiver.name).toEqual(body.name)
    })

    test('Should be able to delete receiver in list and update receiver redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().receiver
        const initialLength = state.entities.length
        const result = await store.dispatch(deleteReceiver(input))
        const deletId = result.payload
        expect(result.type).toBe('receiver/deleteReceiver/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().receiver
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
