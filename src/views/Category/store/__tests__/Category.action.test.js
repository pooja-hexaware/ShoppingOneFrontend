import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'store/store'
import {
    fetchCategory,
    addCategory,
    editCategory,
    deleteCategory,
} from '../category.action'

const getCategoryListResponse = [
    {
        id: 1,
        categoryNumber: 98,
        categoryName: 'categoryName',
        description: false,
    },
]

const addCategoryListResponse = (data) => {
    return { id: 2, ...data }
}
const editCategoryListResponse = (data) => {
    return data
}

describe('should test Category redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'category'
    test('Should be able to fetch the category list and update category redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getCategoryListResponse)
        const result = await store.dispatch(fetchCategory())
        const categoryList = result.payload
        expect(result.type).toBe('category/fetchCategory/fulfilled')
        expect(categoryList).toEqual(getCategoryListResponse)

        const state = store.getState().category
        expect(state.entities).toEqual(categoryList)
    })

    test('Should be able to add new category to list and make post api and update category redux store', async () => {
        const body = {
            categoryNumber: 62,
            categoryName: 'categoryName',
            description: true,
        }
        mock.onPost(`/${endPoint}`, body).reply(
            201,
            addCategoryListResponse(body)
        )
        const result = await store.dispatch(addCategory(body))
        const categoryItem = result.payload
        expect(result.type).toBe('category/addCategory/fulfilled')
        expect(categoryItem).toEqual(addCategoryListResponse(body))

        const state = store.getState().category
        expect(state.entities).toContainEqual(addCategoryListResponse(body))
    })

    test('Should be able to edit category in list and make put api call and update category redux store', async () => {
        const body = {
            id: 1,
            categoryNumber: 29,
            categoryName: 'categoryName',
            description: true,
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editCategoryListResponse(body)
        )
        const result = await store.dispatch(editCategory(body))
        const categoryItem = result.payload
        expect(result.type).toBe('category/editCategory/fulfilled')
        expect(categoryItem).toEqual(editCategoryListResponse(body))

        const state = store.getState().category
        let changedCategory = state.entities.find((p) => p.id === body.id)
        expect(changedCategory.name).toEqual(body.name)
    })

    test('Should be able to delete category in list and update category redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().category
        const initialLength = state.entities.length
        const result = await store.dispatch(deleteCategory(input))
        const deletId = result.payload
        expect(result.type).toBe('category/deleteCategory/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().category
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
