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
import EditMessage from '../EditMessage'
import { MessageAdded } from '../store/MessageSlice'
beforeAll(() => {
    store.dispatch(
        MessageAdded({
            id: 1,
            messageNumber: 'messageNumber',
            senderNumber: 'senderNumber',
            receiverNumber: 'receiverNumber',
            content: 'content',
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
                                    <Navigate to="Message/edit/1" replace />
                                }
                            />
                            <Route
                                path="Message/edit/:id"
                                element={<EditMessage />}
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

describe('testing view of MessageEdit Component', () => {
    test('should render EditMessage and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveMessageButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const messageNumberElement = screen.getByLabelText(/MessageNumber/i)
        const senderNumberElement = screen.getByLabelText(/SenderNumber/i)
        const receiverNumberElement = screen.getByLabelText(/ReceiverNumber/i)
        const contentElement = screen.getByLabelText(/Content/i)

        expect(saveMessageButtonElement).toBeInTheDocument()

        expect(messageNumberElement).toBeInTheDocument()
        expect(senderNumberElement).toBeInTheDocument()
        expect(receiverNumberElement).toBeInTheDocument()
        expect(contentElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Message edit form', async () => {
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

        expect(messageNumberElement.value).toBe('messageNumber')

        expect(senderNumberElement.value).toBe('senderNumber')

        expect(receiverNumberElement.value).toBe('receiverNumber')

        expect(contentElement.value).toBe('content')
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const messageNumberElement = screen.getByLabelText(/MessageNumber/i)
        const senderNumberElement = screen.getByLabelText(/SenderNumber/i)
        const receiverNumberElement = screen.getByLabelText(/ReceiverNumber/i)
        const contentElement = screen.getByLabelText(/Content/i)

        fireEvent.change(messageNumberElement, { target: { value: '' } })
        fireEvent.change(senderNumberElement, { target: { value: '' } })
        fireEvent.change(receiverNumberElement, { target: { value: '' } })
        fireEvent.change(contentElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveMessageButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveMessageButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(4)
    })
})
