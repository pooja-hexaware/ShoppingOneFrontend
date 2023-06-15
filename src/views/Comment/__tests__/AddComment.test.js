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
import AddComment from '../AddComment'

beforeEach(() => {
    const endPoint = 'Comment'
    const getStudentListResponse = [
        {
            id: 1,
            commentNumber: 50,
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
                        <AddComment />
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

describe('testing view CommentAdd Component', () => {
    test('should render AddComment and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addCommentButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const commentNumberElement = screen.getByLabelText(/CommentNumber/i)
        const contentElement = screen.getByLabelText(/Content/i)

        expect(addCommentButtonElement).toBeInTheDocument()

        expect(commentNumberElement).toBeInTheDocument()
        expect(contentElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Comment add form', async () => {
        const commentNumberElement = screen.getByLabelText(/CommentNumber/i)
        const contentElement = screen.getByLabelText(/Content/i)

        fireEvent.change(commentNumberElement, { target: { value: 55 } })
        fireEvent.change(contentElement, { target: { value: 'content' } })
    })

    test('should return error message when add Comment button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addCommentButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addCommentButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(2)
    })
})
