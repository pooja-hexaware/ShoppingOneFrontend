import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'store/store'
import {
    fetchMessage,
    addMessage,
    editMessage,
    deleteMessage,
} from '../message.action'

const getMessageListResponse = [
    {
        id: 1,
        messageNumber: 'messageNumber',
        senderNumber: 'senderNumber',
        receiverNumber: 'receiverNumber',
        content: 'content',
    },
]

const addMessageListResponse = (data) => {
    return { id: 2, ...data }
}
const editMessageListResponse = (data) => {
    return data
}

describe('should test Message redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'message'
    test('Should be able to fetch the message list and update message redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getMessageListResponse)
        const result = await store.dispatch(fetchMessage())
        const messageList = result.payload
        expect(result.type).toBe('message/fetchMessage/fulfilled')
        expect(messageList).toEqual(getMessageListResponse)

        const state = store.getState().message
        expect(state.entities).toEqual(messageList)
    })

    test('Should be able to add new message to list and make post api and update message redux store', async () => {
        const body = {
            messageNumber: 'messageNumber',
            senderNumber: 'senderNumber',
            receiverNumber: 'receiverNumber',
            content: 'content',
        }
        mock.onPost(`/${endPoint}`, body).reply(
            201,
            addMessageListResponse(body)
        )
        const result = await store.dispatch(addMessage(body))
        const messageItem = result.payload
        expect(result.type).toBe('message/addMessage/fulfilled')
        expect(messageItem).toEqual(addMessageListResponse(body))

        const state = store.getState().message
        expect(state.entities).toContainEqual(addMessageListResponse(body))
    })

    test('Should be able to edit message in list and make put api call and update message redux store', async () => {
        const body = {
            id: 1,
            messageNumber: 'messageNumber',
            senderNumber: 'senderNumber',
            receiverNumber: 'receiverNumber',
            content: 'content',
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editMessageListResponse(body)
        )
        const result = await store.dispatch(editMessage(body))
        const messageItem = result.payload
        expect(result.type).toBe('message/editMessage/fulfilled')
        expect(messageItem).toEqual(editMessageListResponse(body))

        const state = store.getState().message
        let changedMessage = state.entities.find((p) => p.id === body.id)
        expect(changedMessage.name).toEqual(body.name)
    })

    test('Should be able to delete message in list and update message redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().message
        const initialLength = state.entities.length
        const result = await store.dispatch(deleteMessage(input))
        const deletId = result.payload
        expect(result.type).toBe('message/deleteMessage/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().message
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
