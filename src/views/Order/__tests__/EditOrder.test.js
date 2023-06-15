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
import EditOrder from '../EditOrder'
import { OrderAdded } from '../store/OrderSlice'
beforeAll(() => {
    store.dispatch(
        OrderAdded({
            id: 1,
            orderNumber: 24,
            totalAmt: 8.48,
            orderDate: 'orderDate',
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
                                element={<Navigate to="Order/edit/1" replace />}
                            />
                            <Route
                                path="Order/edit/:id"
                                element={<EditOrder />}
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

describe('testing view of OrderEdit Component', () => {
    test('should render EditOrder and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveOrderButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const orderNumberElement = screen.getByLabelText(/OrderNumber/i)
        const totalAmtElement = screen.getByLabelText(/TotalAmt/i)
        const orderDateElement = screen.getByLabelText(/OrderDate/i)

        expect(saveOrderButtonElement).toBeInTheDocument()

        expect(orderNumberElement).toBeInTheDocument()
        expect(totalAmtElement).toBeInTheDocument()
        expect(orderDateElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Order edit form', async () => {
        const orderNumberElement = screen.getByLabelText(/OrderNumber/i)
        const totalAmtElement = screen.getByLabelText(/TotalAmt/i)
        const orderDateElement = screen.getByLabelText(/OrderDate/i)

        fireEvent.change(orderNumberElement, { target: { value: 93 } })
        fireEvent.change(totalAmtElement, { target: { value: 82.01 } })
        fireEvent.change(orderDateElement, { target: { value: 'orderDate' } })

        expect(orderNumberElement.value).toBe(93)
        expect(totalAmtElement.value).toBe(82.01)
        expect(orderDateElement.value).toBe('orderDate')
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const orderNumberElement = screen.getByLabelText(/OrderNumber/i)
        const totalAmtElement = screen.getByLabelText(/TotalAmt/i)
        const orderDateElement = screen.getByLabelText(/OrderDate/i)

        fireEvent.change(orderNumberElement, { target: { value: '' } })
        fireEvent.change(totalAmtElement, { target: { value: '' } })
        fireEvent.change(orderDateElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveOrderButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveOrderButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(3)
    })
})
