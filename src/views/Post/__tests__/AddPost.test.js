const {
    render,
    screen,
    fireEvent,
    within,
    waitFor,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import axios from '../../../axios'
import MockAdapter from 'axios-mock-adapter'
import AddPost from '../AddPost'

beforeEach(() => {
    const endPoint = 'Post'
    const getStudentListResponse = [
        {
            id: 1,
            postNumber: 49,
            title: 'title',
            content: 'content',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddPost />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
})

const clickAndWait = async (element) => {
    await act(async () => {
        fireEvent.click(element)
    })

    await act(async () => {
        jest.runOnlyPendingTimers()
    })
}

afterEach(cleanup)

describe('testing view PostAdd Component', () => {
    test('should render AddPost and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addPostButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const postNumberElement = screen.getByLabelText(/PostNumber/i)
        const titleElement = screen.getByLabelText(/Title/i)
        const contentElement = screen.getByLabelText(/Content/i)

        expect(addPostButtonElement).toBeInTheDocument()

        expect(postNumberElement).toBeInTheDocument()
        expect(titleElement).toBeInTheDocument()
        expect(contentElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Post add form', async () => {
        const postNumberElement = screen.getByLabelText(/PostNumber/i)
        const titleElement = screen.getByLabelText(/Title/i)
        const contentElement = screen.getByLabelText(/Content/i)

        fireEvent.change(postNumberElement, { target: { value: 7 } })
        fireEvent.change(titleElement, { target: { value: 'title' } })
        fireEvent.change(contentElement, { target: { value: 'content' } })
    })

    test('should return error message when add Post button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addPostButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addPostButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(3)
    })
})
