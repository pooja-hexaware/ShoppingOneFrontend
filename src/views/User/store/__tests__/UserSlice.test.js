import store from 'store/store'
import { userAdded, userDeleted, userUpdated } from '../userSlice'

describe('testing user redux store reducers', () => {
    test('add user to store test', () => {
        let state = store.getState().user
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            userId: 33,
            username: 'username',
            email: 73.63,
            password: 94,
            doj: 'Thu Jun 15 2023 08:00:02 GMT+0000 (Coordinated Universal Time)',
        }
        store.dispatch(userAdded(initialInput))
        state = store.getState().user
        expect(state.entities).toHaveLength(1)
    })

    test('update user from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            userId: 87,
            username: 'username',
            email: 22.95,
            password: 94,
            doj: 'Thu Jun 15 2023 08:00:02 GMT+0000 (Coordinated Universal Time)',
        }
        store.dispatch(userAdded(initialInput))
        let state = store.getState().user
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            userId: 34,
            username: 'username',
            email: 79.77,
            password: 52,
            doj: 'doj',
        }
        store.dispatch(userUpdated(updatedInput))
        state = store.getState().user
        let changedUser = state.entities.find((p) => p.id === 2)
        expect(changedUser).toStrictEqual(updatedInput)
    })

    test('delete user from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            userId: 19,
            username: 'username',
            email: 48.13,
            password: 68,
            doj: 'Thu Jun 15 2023 08:00:02 GMT+0000 (Coordinated Universal Time)',
        }
        store.dispatch(userAdded(initialInput))
        let state = store.getState().user
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            userDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().user
        expect(state.entities).toHaveLength(2)
    })
})
