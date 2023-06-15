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
import AddOrderItem from '../AddOrderItem'

beforeEach(() => {
    const endPoint = 'OrderItem'
    const getStudentListResponse = [
        {
            id: 1,
            productNumber: 'productNumber',
            quantity: 24,
            price: 49.57,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddOrderItem />
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

describe('testing view OrderItemAdd Component', () => {
    test('should render AddOrderItem and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addOrderItemButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const productNumberElement = screen.getByLabelText(/ProductNumber/i)
        const quantityElement = screen.getByLabelText(/Quantity/i)
        const priceElement = screen.getByLabelText(/Price/i)

        expect(addOrderItemButtonElement).toBeInTheDocument()

        expect(productNumberElement).toBeInTheDocument()
        expect(quantityElement).toBeInTheDocument()
        expect(priceElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of OrderItem add form', async () => {
        const productNumberElement = screen.getByLabelText(/ProductNumber/i)
        const quantityElement = screen.getByLabelText(/Quantity/i)
        const priceElement = screen.getByLabelText(/Price/i)

        fireEvent.change(productNumberElement, {
            target: { value: 'productNumber' },
        })
        fireEvent.change(quantityElement, { target: { value: 33 } })
        fireEvent.change(priceElement, { target: { value: 78.42 } })
    })

    test('should return error message when add OrderItem button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addOrderItemButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addOrderItemButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(3)
    })
})
