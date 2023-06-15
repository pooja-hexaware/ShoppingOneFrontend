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
import EditComment from '../EditComment'
import { CommentAdded } from '../store/CommentSlice'
beforeAll(() => {
    store.dispatch(
        CommentAdded({
            id: 1,
            commentNumber: 12,
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
                                    <Navigate to="Comment/edit/1" replace />
                                }
                            />
                            <Route
                                path="Comment/edit/:id"
                                element={<EditComment />}
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

describe('testing view of CommentEdit Component', () => {
    test('should render EditComment and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveCommentButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const commentNumberElement = screen.getByLabelText(/CommentNumber/i)
        const contentElement = screen.getByLabelText(/Content/i)

        expect(saveCommentButtonElement).toBeInTheDocument()

        expect(commentNumberElement).toBeInTheDocument()
        expect(contentElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Comment edit form', async () => {
        const commentNumberElement = screen.getByLabelText(/CommentNumber/i)
        const contentElement = screen.getByLabelText(/Content/i)

        fireEvent.change(commentNumberElement, { target: { value: 72 } })
        fireEvent.change(contentElement, { target: { value: 'content' } })

        expect(commentNumberElement.value).toBe(72)
        expect(contentElement.value).toBe('content')
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const commentNumberElement = screen.getByLabelText(/CommentNumber/i)
        const contentElement = screen.getByLabelText(/Content/i)

        fireEvent.change(commentNumberElement, { target: { value: '' } })
        fireEvent.change(contentElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveCommentButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveCommentButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(2)
    })
})
