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
import AddReview from '../AddReview'

beforeEach(() => {
    const endPoint = 'Review'
    const getStudentListResponse = [
        {
            id: 1,
            reviewNumber: 35,
            rating: 59,
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
                        <AddReview />
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

describe('testing view ReviewAdd Component', () => {
    test('should render AddReview and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addReviewButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const reviewNumberElement = screen.getByLabelText(/ReviewNumber/i)
        const ratingElement = screen.getByLabelText(/Rating/i)
        const contentElement = screen.getByLabelText(/Content/i)

        expect(addReviewButtonElement).toBeInTheDocument()

        expect(reviewNumberElement).toBeInTheDocument()
        expect(ratingElement).toBeInTheDocument()
        expect(contentElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Review add form', async () => {
        const reviewNumberElement = screen.getByLabelText(/ReviewNumber/i)
        const ratingElement = screen.getByLabelText(/Rating/i)
        const contentElement = screen.getByLabelText(/Content/i)

        fireEvent.change(reviewNumberElement, { target: { value: 22 } })
        fireEvent.change(ratingElement, { target: { value: 12 } })
        fireEvent.change(contentElement, { target: { value: 'content' } })
    })

    test('should return error message when add Review button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addReviewButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addReviewButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(3)
    })
})
