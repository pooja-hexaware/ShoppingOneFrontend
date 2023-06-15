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
import EditOrderItem from '../EditOrderItem'
import { OrderItemAdded } from '../store/OrderItemSlice'
beforeAll(() => {
    store.dispatch(
        OrderItemAdded({
            id: 1,
            productNumber: 'productNumber',
            quantity: 93,
            price: 89.89,
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
                                    <Navigate to="OrderItem/edit/1" replace />
                                }
                            />
                            <Route
                                path="OrderItem/edit/:id"
                                element={<EditOrderItem />}
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

describe('testing view of OrderItemEdit Component', () => {
    test('should render EditOrderItem and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveOrderItemButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const productNumberElement = screen.getByLabelText(/ProductNumber/i)
        const quantityElement = screen.getByLabelText(/Quantity/i)
        const priceElement = screen.getByLabelText(/Price/i)

        expect(saveOrderItemButtonElement).toBeInTheDocument()

        expect(productNumberElement).toBeInTheDocument()
        expect(quantityElement).toBeInTheDocument()
        expect(priceElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of OrderItem edit form', async () => {
        const productNumberElement = screen.getByLabelText(/ProductNumber/i)
        const quantityElement = screen.getByLabelText(/Quantity/i)
        const priceElement = screen.getByLabelText(/Price/i)

        fireEvent.change(productNumberElement, {
            target: { value: 'productNumber' },
        })
        fireEvent.change(quantityElement, { target: { value: 57 } })
        fireEvent.change(priceElement, { target: { value: 45.68 } })

        expect(productNumberElement.value).toBe('productNumber')

        expect(quantityElement.value).toBe(57)
        expect(priceElement.value).toBe(45.68)
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const productNumberElement = screen.getByLabelText(/ProductNumber/i)
        const quantityElement = screen.getByLabelText(/Quantity/i)
        const priceElement = screen.getByLabelText(/Price/i)

        fireEvent.change(productNumberElement, { target: { value: '' } })
        fireEvent.change(quantityElement, { target: { value: '' } })
        fireEvent.change(priceElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveOrderItemButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveOrderItemButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(3)
    })
})
