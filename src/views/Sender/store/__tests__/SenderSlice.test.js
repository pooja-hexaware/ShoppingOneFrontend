import store from 'store/store'
import { senderAdded, senderDeleted, senderUpdated } from '../senderSlice'

describe('testing sender redux store reducers', () => {
    test('add sender to store test', () => {
        let state = store.getState().sender
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            senderNumber: 89,
            userId: 27,
        }
        store.dispatch(senderAdded(initialInput))
        state = store.getState().sender
        expect(state.entities).toHaveLength(1)
    })

    test('update sender from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            senderNumber: 66,
            userId: 63,
        }
        store.dispatch(senderAdded(initialInput))
        let state = store.getState().sender
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            senderNumber: 47,
            userId: 49,
        }
        store.dispatch(senderUpdated(updatedInput))
        state = store.getState().sender
        let changedSender = state.entities.find((p) => p.id === 2)
        expect(changedSender).toStrictEqual(updatedInput)
    })

    test('delete sender from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            senderNumber: 46,
            userId: 68,
        }
        store.dispatch(senderAdded(initialInput))
        let state = store.getState().sender
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            senderDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().sender
        expect(state.entities).toHaveLength(2)
    })
})
