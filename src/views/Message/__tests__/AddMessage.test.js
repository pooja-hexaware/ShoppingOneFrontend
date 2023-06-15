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
import AddMessage from '../AddMessage'

beforeEach(() => {
    const endPoint = 'Message'
    const getStudentListResponse = [
        {
            id: 1,
            messageNumber: 'messageNumber',
            senderNumber: 'senderNumber',
            receiverNumber: 'receiverNumber',
            content: 'content',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddMessage />
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

describe('testing view MessageAdd Component', () => {
    test('should render AddMessage and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addMessageButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const messageNumberElement = screen.getByLabelText(/MessageNumber/i)
        const senderNumberElement = screen.getByLabelText(/SenderNumber/i)
        const receiverNumberElement = screen.getByLabelText(/ReceiverNumber/i)
        const contentElement = screen.getByLabelText(/Content/i)

        expect(addMessageButtonElement).toBeInTheDocument()

        expect(messageNumberElement).toBeInTheDocument()
        expect(senderNumberElement).toBeInTheDocument()
        expect(receiverNumberElement).toBeInTheDocument()
        expect(contentElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Message add form', async () => {
        const messageNumberElement = screen.getByLabelText(/MessageNumber/i)
        const senderNumberElement = screen.getByLabelText(/SenderNumber/i)
        const receiverNumberElement = screen.getByLabelText(/ReceiverNumber/i)
        const contentElement = screen.getByLabelText(/Content/i)

        fireEvent.change(messageNumberElement, {
            target: { value: 'messageNumber' },
        })
        fireEvent.change(senderNumberElement, {
            target: { value: 'senderNumber' },
        })
        fireEvent.change(receiverNumberElement, {
            target: { value: 'receiverNumber' },
        })
        fireEvent.change(contentElement, { target: { value: 'content' } })
    })

    test('should return error message when add Message button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addMessageButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addMessageButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(4)
    })
})
