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
import AddCategory from '../AddCategory'

beforeEach(() => {
    const endPoint = 'Category'
    const getStudentListResponse = [
        {
            id: 1,
            categoryNumber: 60,
            categoryName: 'categoryName',
            description: true,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddCategory />
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

describe('testing view CategoryAdd Component', () => {
    test('should render AddCategory and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addCategoryButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const categoryNumberElement = screen.getByLabelText(/CategoryNumber/i)
        const categoryNameElement = screen.getByLabelText(/CategoryName/i)
        const descriptionElement = screen.getByLabelText(/Description/i)

        expect(addCategoryButtonElement).toBeInTheDocument()

        expect(categoryNumberElement).toBeInTheDocument()
        expect(categoryNameElement).toBeInTheDocument()
        expect(descriptionElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Category add form', async () => {
        const categoryNumberElement = screen.getByLabelText(/CategoryNumber/i)
        const categoryNameElement = screen.getByLabelText(/CategoryName/i)
        const descriptionElement = screen.getByLabelText(/Description/i)

        fireEvent.change(categoryNumberElement, { target: { value: 13 } })
        fireEvent.change(categoryNameElement, {
            target: { value: 'categoryName' },
        })

        fireEvent.mouseDown(descriptionElement)
        const descriptionlistbox = within(screen.getByRole('listbox'))
        fireEvent.click(descriptionlistbox.getByText(/True/))
        expect(descriptionElement).toHaveTextContent(/True/i)
    })

    test('should return error message when add Category button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addCategoryButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addCategoryButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(3)
    })
})
