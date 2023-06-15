const {
    render,
    screen,
    fireEvent,
    within,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import EditReview from '../EditReview'
import { ReviewAdded } from '../store/ReviewSlice'
beforeAll(() => {
    store.dispatch(
        ReviewAdded({
            id: 1,
            reviewNumber: 90,
            rating: 100,
            content: 'content',
        })
    )
})

beforeEach(() => {
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Navigate to="Review/edit/1" replace />
                                }
                            />
                            <Route
                                path="Review/edit/:id"
                                element={<EditReview />}
                            />
                        </Routes>
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

describe('testing view of ReviewEdit Component', () => {
    test('should render EditReview and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveReviewButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const reviewNumberElement = screen.getByLabelText(/ReviewNumber/i)
        const ratingElement = screen.getByLabelText(/Rating/i)
        const contentElement = screen.getByLabelText(/Content/i)

        expect(saveReviewButtonElement).toBeInTheDocument()

        expect(reviewNumberElement).toBeInTheDocument()
        expect(ratingElement).toBeInTheDocument()
        expect(contentElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Review edit form', async () => {
        const reviewNumberElement = screen.getByLabelText(/ReviewNumber/i)
        const ratingElement = screen.getByLabelText(/Rating/i)
        const contentElement = screen.getByLabelText(/Content/i)

        fireEvent.change(reviewNumberElement, { target: { value: 14 } })
        fireEvent.change(ratingElement, { target: { value: 52 } })
        fireEvent.change(contentElement, { target: { value: 'content' } })

        expect(reviewNumberElement.value).toBe(14)
        expect(ratingElement.value).toBe(52)
        expect(contentElement.value).toBe('content')
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const reviewNumberElement = screen.getByLabelText(/ReviewNumber/i)
        const ratingElement = screen.getByLabelText(/Rating/i)
        const contentElement = screen.getByLabelText(/Content/i)

        fireEvent.change(reviewNumberElement, { target: { value: '' } })
        fireEvent.change(ratingElement, { target: { value: '' } })
        fireEvent.change(contentElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveReviewButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveReviewButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(3)
    })
})
