import store from 'store/store'
import { orderAdded, orderDeleted, orderUpdated } from '../orderSlice'

describe('testing order redux store reducers', () => {
    test('add order to store test', () => {
        let state = store.getState().order
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            orderNumber: 75,
            totalAmt: 96.2,
            orderDate:
                'Thu Jun 15 2023 08:01:07 GMT+0000 (Coordinated Universal Time)',
        }
        store.dispatch(orderAdded(initialInput))
        state = store.getState().order
        expect(state.entities).toHaveLength(1)
    })

    test('update order from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            orderNumber: 48,
            totalAmt: 84.89,
            orderDate:
                'Thu Jun 15 2023 08:01:07 GMT+0000 (Coordinated Universal Time)',
        }
        store.dispatch(orderAdded(initialInput))
        let state = store.getState().order
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            orderNumber: 98,
            totalAmt: 3.24,
            orderDate: 'orderDate',
        }
        store.dispatch(orderUpdated(updatedInput))
        state = store.getState().order
        let changedOrder = state.entities.find((p) => p.id === 2)
        expect(changedOrder).toStrictEqual(updatedInput)
    })

    test('delete order from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            orderNumber: 91,
            totalAmt: 81.17,
            orderDate:
                'Thu Jun 15 2023 08:01:07 GMT+0000 (Coordinated Universal Time)',
        }
        store.dispatch(orderAdded(initialInput))
        let state = store.getState().order
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            orderDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().order
        expect(state.entities).toHaveLength(2)
    })
})
