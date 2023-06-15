import store from 'store/store'
import {
    orderItemAdded,
    orderItemDeleted,
    orderItemUpdated,
} from '../orderItemSlice'

describe('testing orderItem redux store reducers', () => {
    test('add orderItem to store test', () => {
        let state = store.getState().orderItem
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            productNumber: 'productNumber',
            quantity: 75,
            price: 20.52,
        }
        store.dispatch(orderItemAdded(initialInput))
        state = store.getState().orderItem
        expect(state.entities).toHaveLength(1)
    })

    test('update orderItem from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            productNumber: 'productNumber',
            quantity: 23,
            price: 88.26,
        }
        store.dispatch(orderItemAdded(initialInput))
        let state = store.getState().orderItem
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            productNumber: 'productNumber',
            quantity: 94,
            price: 16.01,
        }
        store.dispatch(orderItemUpdated(updatedInput))
        state = store.getState().orderItem
        let changedOrderItem = state.entities.find((p) => p.id === 2)
        expect(changedOrderItem).toStrictEqual(updatedInput)
    })

    test('delete orderItem from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            productNumber: 'productNumber',
            quantity: 67,
            price: 68.32,
        }
        store.dispatch(orderItemAdded(initialInput))
        let state = store.getState().orderItem
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            orderItemDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().orderItem
        expect(state.entities).toHaveLength(2)
    })
})
