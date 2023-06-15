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
import AddReceiver from '../AddReceiver'

beforeEach(() => {
    const endPoint = 'Receiver'
    const getStudentListResponse = [
        {
            id: 1,
            receiverNumber: 87,
            userId: 34,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddReceiver />
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

describe('testing view ReceiverAdd Component', () => {
    test('should render AddReceiver and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addReceiverButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const receiverNumberElement = screen.getByLabelText(/ReceiverNumber/i)
        const userIdElement = screen.getByLabelText(/UserId/i)

        expect(addReceiverButtonElement).toBeInTheDocument()

        expect(receiverNumberElement).toBeInTheDocument()
        expect(userIdElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Receiver add form', async () => {
        const receiverNumberElement = screen.getByLabelText(/ReceiverNumber/i)
        const userIdElement = screen.getByLabelText(/UserId/i)

        fireEvent.change(receiverNumberElement, { target: { value: 63 } })
        fireEvent.change(userIdElement, { target: { value: 4 } })
    })

    test('should return error message when add Receiver button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addReceiverButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addReceiverButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(2)
    })
})
