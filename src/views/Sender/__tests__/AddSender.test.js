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
import AddSender from '../AddSender'

beforeEach(() => {
    const endPoint = 'Sender'
    const getStudentListResponse = [
        {
            id: 1,
            senderNumber: 68,
            userId: 16,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddSender />
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

describe('testing view SenderAdd Component', () => {
    test('should render AddSender and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addSenderButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const senderNumberElement = screen.getByLabelText(/SenderNumber/i)
        const userIdElement = screen.getByLabelText(/UserId/i)

        expect(addSenderButtonElement).toBeInTheDocument()

        expect(senderNumberElement).toBeInTheDocument()
        expect(userIdElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Sender add form', async () => {
        const senderNumberElement = screen.getByLabelText(/SenderNumber/i)
        const userIdElement = screen.getByLabelText(/UserId/i)

        fireEvent.change(senderNumberElement, { target: { value: 68 } })
        fireEvent.change(userIdElement, { target: { value: 52 } })
    })

    test('should return error message when add Sender button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addSenderButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addSenderButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(2)
    })
})
