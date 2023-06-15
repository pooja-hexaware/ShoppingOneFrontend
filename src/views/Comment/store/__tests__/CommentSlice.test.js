import store from 'store/store'
import { commentAdded, commentDeleted, commentUpdated } from '../commentSlice'

describe('testing comment redux store reducers', () => {
    test('add comment to store test', () => {
        let state = store.getState().comment
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            commentNumber: 23,
            content: 'content',
        }
        store.dispatch(commentAdded(initialInput))
        state = store.getState().comment
        expect(state.entities).toHaveLength(1)
    })

    test('update comment from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            commentNumber: 93,
            content: 'content',
        }
        store.dispatch(commentAdded(initialInput))
        let state = store.getState().comment
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            commentNumber: 42,
            content: 'content',
        }
        store.dispatch(commentUpdated(updatedInput))
        state = store.getState().comment
        let changedComment = state.entities.find((p) => p.id === 2)
        expect(changedComment).toStrictEqual(updatedInput)
    })

    test('delete comment from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            commentNumber: 83,
            content: 'content',
        }
        store.dispatch(commentAdded(initialInput))
        let state = store.getState().comment
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            commentDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().comment
        expect(state.entities).toHaveLength(2)
    })
})
