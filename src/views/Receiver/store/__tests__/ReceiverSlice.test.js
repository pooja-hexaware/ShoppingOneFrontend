import store from 'store/store'
import {
    receiverAdded,
    receiverDeleted,
    receiverUpdated,
} from '../receiverSlice'

describe('testing receiver redux store reducers', () => {
    test('add receiver to store test', () => {
        let state = store.getState().receiver
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            receiverNumber: 11,
            userId: 72,
        }
        store.dispatch(receiverAdded(initialInput))
        state = store.getState().receiver
        expect(state.entities).toHaveLength(1)
    })

    test('update receiver from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            receiverNumber: 82,
            userId: 11,
        }
        store.dispatch(receiverAdded(initialInput))
        let state = store.getState().receiver
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            receiverNumber: 41,
            userId: 51,
        }
        store.dispatch(receiverUpdated(updatedInput))
        state = store.getState().receiver
        let changedReceiver = state.entities.find((p) => p.id === 2)
        expect(changedReceiver).toStrictEqual(updatedInput)
    })

    test('delete receiver from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            receiverNumber: 37,
            userId: 18,
        }
        store.dispatch(receiverAdded(initialInput))
        let state = store.getState().receiver
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            receiverDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().receiver
        expect(state.entities).toHaveLength(2)
    })
})
