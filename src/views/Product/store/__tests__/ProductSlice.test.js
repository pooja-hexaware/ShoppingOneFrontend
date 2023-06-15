import store from 'store/store'
import { productAdded, productDeleted, productUpdated } from '../productSlice'

describe('testing product redux store reducers', () => {
    test('add product to store test', () => {
        let state = store.getState().product
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            productNumber: 8,
            productName: 'productName',
            description: true,
            price: 75.75,
        }
        store.dispatch(productAdded(initialInput))
        state = store.getState().product
        expect(state.entities).toHaveLength(1)
    })

    test('update product from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            productNumber: 71,
            productName: 'productName',
            description: false,
            price: 19.93,
        }
        store.dispatch(productAdded(initialInput))
        let state = store.getState().product
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            productNumber: 72,
            productName: 'productName',
            description: false,
            price: 10.56,
        }
        store.dispatch(productUpdated(updatedInput))
        state = store.getState().product
        let changedProduct = state.entities.find((p) => p.id === 2)
        expect(changedProduct).toStrictEqual(updatedInput)
    })

    test('delete product from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            productNumber: 32,
            productName: 'productName',
            description: true,
            price: 53.88,
        }
        store.dispatch(productAdded(initialInput))
        let state = store.getState().product
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            productDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().product
        expect(state.entities).toHaveLength(2)
    })
})
