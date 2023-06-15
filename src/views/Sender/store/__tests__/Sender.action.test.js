import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'store/store'
import {
    fetchSender,
    addSender,
    editSender,
    deleteSender,
} from '../sender.action'

const getSenderListResponse = [
    {
        id: 1,
        senderNumber: 79,
        userId: 63,
    },
]

const addSenderListResponse = (data) => {
    return { id: 2, ...data }
}
const editSenderListResponse = (data) => {
    return data
}

describe('should test Sender redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'sender'
    test('Should be able to fetch the sender list and update sender redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getSenderListResponse)
        const result = await store.dispatch(fetchSender())
        const senderList = result.payload
        expect(result.type).toBe('sender/fetchSender/fulfilled')
        expect(senderList).toEqual(getSenderListResponse)

        const state = store.getState().sender
        expect(state.entities).toEqual(senderList)
    })

    test('Should be able to add new sender to list and make post api and update sender redux store', async () => {
        const body = {
            senderNumber: 4,
            userId: 53,
        }
        mock.onPost(`/${endPoint}`, body).reply(
            201,
            addSenderListResponse(body)
        )
        const result = await store.dispatch(addSender(body))
        const senderItem = result.payload
        expect(result.type).toBe('sender/addSender/fulfilled')
        expect(senderItem).toEqual(addSenderListResponse(body))

        const state = store.getState().sender
        expect(state.entities).toContainEqual(addSenderListResponse(body))
    })

    test('Should be able to edit sender in list and make put api call and update sender redux store', async () => {
        const body = {
            id: 1,
            senderNumber: 31,
            userId: 79,
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editSenderListResponse(body)
        )
        const result = await store.dispatch(editSender(body))
        const senderItem = result.payload
        expect(result.type).toBe('sender/editSender/fulfilled')
        expect(senderItem).toEqual(editSenderListResponse(body))

        const state = store.getState().sender
        let changedSender = state.entities.find((p) => p.id === body.id)
        expect(changedSender.name).toEqual(body.name)
    })

    test('Should be able to delete sender in list and update sender redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().sender
        const initialLength = state.entities.length
        const result = await store.dispatch(deleteSender(input))
        const deletId = result.payload
        expect(result.type).toBe('sender/deleteSender/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().sender
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
