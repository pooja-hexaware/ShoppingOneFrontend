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
import EditPost from '../EditPost'
import { PostAdded } from '../store/PostSlice'
beforeAll(() => {
    store.dispatch(
        PostAdded({
            id: 1,
            postNumber: 100,
            title: 'title',
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
                                element={<Navigate to="Post/edit/1" replace />}
                            />
                            <Route
                                path="Post/edit/:id"
                                element={<EditPost />}
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

describe('testing view of PostEdit Component', () => {
    test('should render EditPost and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const savePostButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const postNumberElement = screen.getByLabelText(/PostNumber/i)
        const titleElement = screen.getByLabelText(/Title/i)
        const contentElement = screen.getByLabelText(/Content/i)

        expect(savePostButtonElement).toBeInTheDocument()

        expect(postNumberElement).toBeInTheDocument()
        expect(titleElement).toBeInTheDocument()
        expect(contentElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Post edit form', async () => {
        const postNumberElement = screen.getByLabelText(/PostNumber/i)
        const titleElement = screen.getByLabelText(/Title/i)
        const contentElement = screen.getByLabelText(/Content/i)

        fireEvent.change(postNumberElement, { target: { value: 5 } })
        fireEvent.change(titleElement, { target: { value: 'title' } })
        fireEvent.change(contentElement, { target: { value: 'content' } })

        expect(postNumberElement.value).toBe(5)
        expect(titleElement.value).toBe('title')

        expect(contentElement.value).toBe('content')
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const postNumberElement = screen.getByLabelText(/PostNumber/i)
        const titleElement = screen.getByLabelText(/Title/i)
        const contentElement = screen.getByLabelText(/Content/i)

        fireEvent.change(postNumberElement, { target: { value: '' } })
        fireEvent.change(titleElement, { target: { value: '' } })
        fireEvent.change(contentElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const savePostButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(savePostButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(3)
    })
})
