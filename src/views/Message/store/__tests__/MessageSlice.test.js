import store from 'store/store'
import { messageAdded, messageDeleted, messageUpdated } from '../messageSlice'

describe('testing message redux store reducers', () => {
    test('add message to store test', () => {
        let state = store.getState().message
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            messageNumber: 'messageNumber',
            senderNumber: 'senderNumber',
            receiverNumber: 'receiverNumber',
            content: 'content',
        }
        store.dispatch(messageAdded(initialInput))
        state = store.getState().message
        expect(state.entities).toHaveLength(1)
    })

    test('update message from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            messageNumber: 'messageNumber',
            senderNumber: 'senderNumber',
            receiverNumber: 'receiverNumber',
            content: 'content',
        }
        store.dispatch(messageAdded(initialInput))
        let state = store.getState().message
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            messageNumber: 'messageNumber',
            senderNumber: 'senderNumber',
            receiverNumber: 'receiverNumber',
            content: 'content',
        }
        store.dispatch(messageUpdated(updatedInput))
        state = store.getState().message
        let changedMessage = state.entities.find((p) => p.id === 2)
        expect(changedMessage).toStrictEqual(updatedInput)
    })

    test('delete message from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            messageNumber: 'messageNumber',
            senderNumber: 'senderNumber',
            receiverNumber: 'receiverNumber',
            content: 'content',
        }
        store.dispatch(messageAdded(initialInput))
        let state = store.getState().message
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            messageDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().message
        expect(state.entities).toHaveLength(2)
    })
})
