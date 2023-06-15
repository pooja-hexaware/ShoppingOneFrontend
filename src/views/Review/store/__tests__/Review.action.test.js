import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'store/store'
import {
    fetchReview,
    addReview,
    editReview,
    deleteReview,
} from '../review.action'

const getReviewListResponse = [
    {
        id: 1,
        reviewNumber: 5,
        rating: 14,
        content: 'content',
    },
]

const addReviewListResponse = (data) => {
    return { id: 2, ...data }
}
const editReviewListResponse = (data) => {
    return data
}

describe('should test Review redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'review'
    test('Should be able to fetch the review list and update review redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getReviewListResponse)
        const result = await store.dispatch(fetchReview())
        const reviewList = result.payload
        expect(result.type).toBe('review/fetchReview/fulfilled')
        expect(reviewList).toEqual(getReviewListResponse)

        const state = store.getState().review
        expect(state.entities).toEqual(reviewList)
    })

    test('Should be able to add new review to list and make post api and update review redux store', async () => {
        const body = {
            reviewNumber: 25,
            rating: 23,
            content: 'content',
        }
        mock.onPost(`/${endPoint}`, body).reply(
            201,
            addReviewListResponse(body)
        )
        const result = await store.dispatch(addReview(body))
        const reviewItem = result.payload
        expect(result.type).toBe('review/addReview/fulfilled')
        expect(reviewItem).toEqual(addReviewListResponse(body))

        const state = store.getState().review
        expect(state.entities).toContainEqual(addReviewListResponse(body))
    })

    test('Should be able to edit review in list and make put api call and update review redux store', async () => {
        const body = {
            id: 1,
            reviewNumber: 29,
            rating: 41,
            content: 'content',
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editReviewListResponse(body)
        )
        const result = await store.dispatch(editReview(body))
        const reviewItem = result.payload
        expect(result.type).toBe('review/editReview/fulfilled')
        expect(reviewItem).toEqual(editReviewListResponse(body))

        const state = store.getState().review
        let changedReview = state.entities.find((p) => p.id === body.id)
        expect(changedReview.name).toEqual(body.name)
    })

    test('Should be able to delete review in list and update review redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().review
        const initialLength = state.entities.length
        const result = await store.dispatch(deleteReview(input))
        const deletId = result.payload
        expect(result.type).toBe('review/deleteReview/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().review
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
