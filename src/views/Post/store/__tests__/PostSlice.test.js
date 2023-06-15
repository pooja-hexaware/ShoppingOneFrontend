import store from 'store/store'
import { postAdded, postDeleted, postUpdated } from '../postSlice'

describe('testing post redux store reducers', () => {
    test('add post to store test', () => {
        let state = store.getState().post
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            postNumber: 98,
            title: 'title',
            content: 'content',
        }
        store.dispatch(postAdded(initialInput))
        state = store.getState().post
        expect(state.entities).toHaveLength(1)
    })

    test('update post from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            postNumber: 9,
            title: 'title',
            content: 'content',
        }
        store.dispatch(postAdded(initialInput))
        let state = store.getState().post
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            postNumber: 57,
            title: 'title',
            content: 'content',
        }
        store.dispatch(postUpdated(updatedInput))
        state = store.getState().post
        let changedPost = state.entities.find((p) => p.id === 2)
        expect(changedPost).toStrictEqual(updatedInput)
    })

    test('delete post from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            postNumber: 37,
            title: 'title',
            content: 'content',
        }
        store.dispatch(postAdded(initialInput))
        let state = store.getState().post
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            postDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().post
        expect(state.entities).toHaveLength(2)
    })
})
