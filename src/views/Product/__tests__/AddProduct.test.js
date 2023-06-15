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
import AddProduct from '../AddProduct'

beforeEach(() => {
    const endPoint = 'Product'
    const getStudentListResponse = [
        {
            id: 1,
            productNumber: 74,
            productName: 'productName',
            description: true,
            price: 16.58,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddProduct />
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

describe('testing view ProductAdd Component', () => {
    test('should render AddProduct and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addProductButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const productNumberElement = screen.getByLabelText(/ProductNumber/i)
        const productNameElement = screen.getByLabelText(/ProductName/i)
        const descriptionElement = screen.getByLabelText(/Description/i)
        const priceElement = screen.getByLabelText(/Price/i)

        expect(addProductButtonElement).toBeInTheDocument()

        expect(productNumberElement).toBeInTheDocument()
        expect(productNameElement).toBeInTheDocument()
        expect(descriptionElement).toBeInTheDocument()
        expect(priceElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Product add form', async () => {
        const productNumberElement = screen.getByLabelText(/ProductNumber/i)
        const productNameElement = screen.getByLabelText(/ProductName/i)
        const descriptionElement = screen.getByLabelText(/Description/i)
        const priceElement = screen.getByLabelText(/Price/i)

        fireEvent.change(productNumberElement, { target: { value: 59 } })
        fireEvent.change(productNameElement, {
            target: { value: 'productName' },
        })
        fireEvent.change(priceElement, { target: { value: 20.71 } })

        fireEvent.mouseDown(descriptionElement)
        const descriptionlistbox = within(screen.getByRole('listbox'))
        fireEvent.click(descriptionlistbox.getByText(/True/))
        expect(descriptionElement).toHaveTextContent(/True/i)
    })

    test('should return error message when add Product button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addProductButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addProductButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(4)
    })
})
