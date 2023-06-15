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
import AddOrder from '../AddOrder'

beforeEach(() => {
    const endPoint = 'Order'
    const getStudentListResponse = [
        {
            id: 1,
            orderNumber: 6,
            totalAmt: 81.45,
            orderDate: 'orderDate',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddOrder />
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

describe('testing view OrderAdd Component', () => {
    test('should render AddOrder and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addOrderButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const orderNumberElement = screen.getByLabelText(/OrderNumber/i)
        const totalAmtElement = screen.getByLabelText(/TotalAmt/i)
        const orderDateElement = screen.getByLabelText(/OrderDate/i)

        expect(addOrderButtonElement).toBeInTheDocument()

        expect(orderNumberElement).toBeInTheDocument()
        expect(totalAmtElement).toBeInTheDocument()
        expect(orderDateElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Order add form', async () => {
        const orderNumberElement = screen.getByLabelText(/OrderNumber/i)
        const totalAmtElement = screen.getByLabelText(/TotalAmt/i)
        const orderDateElement = screen.getByLabelText(/OrderDate/i)

        fireEvent.change(orderNumberElement, { target: { value: 92 } })
        fireEvent.change(totalAmtElement, { target: { value: 49.35 } })
        fireEvent.change(orderDateElement, { target: { value: 'orderDate' } })
    })

    test('should return error message when add Order button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addOrderButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addOrderButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(3)
    })
})
