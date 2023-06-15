import store from 'store/store'
import {
    categoryAdded,
    categoryDeleted,
    categoryUpdated,
} from '../categorySlice'

describe('testing category redux store reducers', () => {
    test('add category to store test', () => {
        let state = store.getState().category
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            categoryNumber: 77,
            categoryName: 'categoryName',
            description: true,
        }
        store.dispatch(categoryAdded(initialInput))
        state = store.getState().category
        expect(state.entities).toHaveLength(1)
    })

    test('update category from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            categoryNumber: 69,
            categoryName: 'categoryName',
            description: false,
        }
        store.dispatch(categoryAdded(initialInput))
        let state = store.getState().category
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            categoryNumber: 79,
            categoryName: 'categoryName',
            description: true,
        }
        store.dispatch(categoryUpdated(updatedInput))
        state = store.getState().category
        let changedCategory = state.entities.find((p) => p.id === 2)
        expect(changedCategory).toStrictEqual(updatedInput)
    })

    test('delete category from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            categoryNumber: 84,
            categoryName: 'categoryName',
            description: false,
        }
        store.dispatch(categoryAdded(initialInput))
        let state = store.getState().category
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            categoryDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().category
        expect(state.entities).toHaveLength(2)
    })
})
