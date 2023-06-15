import store from 'store/store'
import { reviewAdded, reviewDeleted, reviewUpdated } from '../reviewSlice'

describe('testing review redux store reducers', () => {
    test('add review to store test', () => {
        let state = store.getState().review
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            reviewNumber: 89,
            rating: 95,
            content: 'content',
        }
        store.dispatch(reviewAdded(initialInput))
        state = store.getState().review
        expect(state.entities).toHaveLength(1)
    })

    test('update review from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            reviewNumber: 20,
            rating: 58,
            content: 'content',
        }
        store.dispatch(reviewAdded(initialInput))
        let state = store.getState().review
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            reviewNumber: 79,
            rating: 47,
            content: 'content',
        }
        store.dispatch(reviewUpdated(updatedInput))
        state = store.getState().review
        let changedReview = state.entities.find((p) => p.id === 2)
        expect(changedReview).toStrictEqual(updatedInput)
    })

    test('delete review from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            reviewNumber: 80,
            rating: 8,
            content: 'content',
        }
        store.dispatch(reviewAdded(initialInput))
        let state = store.getState().review
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            reviewDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().review
        expect(state.entities).toHaveLength(2)
    })
})
