import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'store/store'
import {
    fetchComment,
    addComment,
    editComment,
    deleteComment,
} from '../comment.action'

const getCommentListResponse = [
    {
        id: 1,
        commentNumber: 94,
        content: 'content',
    },
]

const addCommentListResponse = (data) => {
    return { id: 2, ...data }
}
const editCommentListResponse = (data) => {
    return data
}

describe('should test Comment redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'comment'
    test('Should be able to fetch the comment list and update comment redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getCommentListResponse)
        const result = await store.dispatch(fetchComment())
        const commentList = result.payload
        expect(result.type).toBe('comment/fetchComment/fulfilled')
        expect(commentList).toEqual(getCommentListResponse)

        const state = store.getState().comment
        expect(state.entities).toEqual(commentList)
    })

    test('Should be able to add new comment to list and make post api and update comment redux store', async () => {
        const body = {
            commentNumber: 36,
            content: 'content',
        }
        mock.onPost(`/${endPoint}`, body).reply(
            201,
            addCommentListResponse(body)
        )
        const result = await store.dispatch(addComment(body))
        const commentItem = result.payload
        expect(result.type).toBe('comment/addComment/fulfilled')
        expect(commentItem).toEqual(addCommentListResponse(body))

        const state = store.getState().comment
        expect(state.entities).toContainEqual(addCommentListResponse(body))
    })

    test('Should be able to edit comment in list and make put api call and update comment redux store', async () => {
        const body = {
            id: 1,
            commentNumber: 26,
            content: 'content',
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editCommentListResponse(body)
        )
        const result = await store.dispatch(editComment(body))
        const commentItem = result.payload
        expect(result.type).toBe('comment/editComment/fulfilled')
        expect(commentItem).toEqual(editCommentListResponse(body))

        const state = store.getState().comment
        let changedComment = state.entities.find((p) => p.id === body.id)
        expect(changedComment.name).toEqual(body.name)
    })

    test('Should be able to delete comment in list and update comment redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().comment
        const initialLength = state.entities.length
        const result = await store.dispatch(deleteComment(input))
        const deletId = result.payload
        expect(result.type).toBe('comment/deleteComment/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().comment
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
