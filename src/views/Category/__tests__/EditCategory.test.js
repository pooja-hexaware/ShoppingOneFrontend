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
import EditCategory from '../EditCategory'
import { CategoryAdded } from '../store/CategorySlice'
beforeAll(() => {
    store.dispatch(
        CategoryAdded({
            id: 1,
            categoryNumber: 39,
            categoryName: 'categoryName',
            description: true,
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
                                    <Navigate to="Category/edit/1" replace />
                                }
                            />
                            <Route
                                path="Category/edit/:id"
                                element={<EditCategory />}
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

describe('testing view of CategoryEdit Component', () => {
    test('should render EditCategory and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveCategoryButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const categoryNumberElement = screen.getByLabelText(/CategoryNumber/i)
        const categoryNameElement = screen.getByLabelText(/CategoryName/i)
        const descriptionElement = screen.getByLabelText(/Description/i)

        expect(saveCategoryButtonElement).toBeInTheDocument()

        expect(categoryNumberElement).toBeInTheDocument()
        expect(categoryNameElement).toBeInTheDocument()
        expect(descriptionElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Category edit form', async () => {
        const categoryNumberElement = screen.getByLabelText(/CategoryNumber/i)
        const categoryNameElement = screen.getByLabelText(/CategoryName/i)
        const descriptionElement = screen.getByLabelText(/Description/i)

        fireEvent.change(categoryNumberElement, { target: { value: 42 } })
        fireEvent.change(categoryNameElement, {
            target: { value: 'categoryName' },
        })

        expect(categoryNumberElement.value).toBe(42)
        expect(categoryNameElement.value).toBe('categoryName')

        fireEvent.mouseDown(descriptionElement)
        const descriptionlistbox = within(screen.getByRole('listbox'))
        fireEvent.click(descriptionlistbox.getByText(/True/))
        expect(descriptionElement).toHaveTextContent(/True/i)
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const categoryNumberElement = screen.getByLabelText(/CategoryNumber/i)
        const categoryNameElement = screen.getByLabelText(/CategoryName/i)

        fireEvent.change(categoryNumberElement, { target: { value: '' } })
        fireEvent.change(categoryNameElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveCategoryButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveCategoryButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(2)
    })
})
