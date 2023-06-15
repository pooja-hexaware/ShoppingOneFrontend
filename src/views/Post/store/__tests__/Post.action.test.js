import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'store/store'
import { fetchPost, addPost, editPost, deletePost } from '../post.action'

const getPostListResponse = [
    {
        id: 1,
        postNumber: 58,
        title: 'title',
        content: 'content',
    },
]

const addPostListResponse = (data) => {
    return { id: 2, ...data }
}
const editPostListResponse = (data) => {
    return data
}

describe('should test Post redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'post'
    test('Should be able to fetch the post list and update post redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getPostListResponse)
        const result = await store.dispatch(fetchPost())
        const postList = result.payload
        expect(result.type).toBe('post/fetchPost/fulfilled')
        expect(postList).toEqual(getPostListResponse)

        const state = store.getState().post
        expect(state.entities).toEqual(postList)
    })

    test('Should be able to add new post to list and make post api and update post redux store', async () => {
        const body = {
            postNumber: 8,
            title: 'title',
            content: 'content',
        }
        mock.onPost(`/${endPoint}`, body).reply(201, addPostListResponse(body))
        const result = await store.dispatch(addPost(body))
        const postItem = result.payload
        expect(result.type).toBe('post/addPost/fulfilled')
        expect(postItem).toEqual(addPostListResponse(body))

        const state = store.getState().post
        expect(state.entities).toContainEqual(addPostListResponse(body))
    })

    test('Should be able to edit post in list and make put api call and update post redux store', async () => {
        const body = {
            id: 1,
            postNumber: 65,
            title: 'title',
            content: 'content',
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editPostListResponse(body)
        )
        const result = await store.dispatch(editPost(body))
        const postItem = result.payload
        expect(result.type).toBe('post/editPost/fulfilled')
        expect(postItem).toEqual(editPostListResponse(body))

        const state = store.getState().post
        let changedPost = state.entities.find((p) => p.id === body.id)
        expect(changedPost.name).toEqual(body.name)
    })

    test('Should be able to delete post in list and update post redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().post
        const initialLength = state.entities.length
        const result = await store.dispatch(deletePost(input))
        const deletId = result.payload
        expect(result.type).toBe('post/deletePost/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().post
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
