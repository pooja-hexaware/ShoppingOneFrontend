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
import EditReceiver from '../EditReceiver'
import { ReceiverAdded } from '../store/ReceiverSlice'
beforeAll(() => {
    store.dispatch(
        ReceiverAdded({
            id: 1,
            receiverNumber: 60,
            userId: 73,
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
                                    <Navigate to="Receiver/edit/1" replace />
                                }
                            />
                            <Route
                                path="Receiver/edit/:id"
                                element={<EditReceiver />}
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

describe('testing view of ReceiverEdit Component', () => {
    test('should render EditReceiver and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveReceiverButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const receiverNumberElement = screen.getByLabelText(/ReceiverNumber/i)
        const userIdElement = screen.getByLabelText(/UserId/i)

        expect(saveReceiverButtonElement).toBeInTheDocument()

        expect(receiverNumberElement).toBeInTheDocument()
        expect(userIdElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Receiver edit form', async () => {
        const receiverNumberElement = screen.getByLabelText(/ReceiverNumber/i)
        const userIdElement = screen.getByLabelText(/UserId/i)

        fireEvent.change(receiverNumberElement, { target: { value: 36 } })
        fireEvent.change(userIdElement, { target: { value: 36 } })

        expect(receiverNumberElement.value).toBe(36)
        expect(userIdElement.value).toBe(36)
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const receiverNumberElement = screen.getByLabelText(/ReceiverNumber/i)
        const userIdElement = screen.getByLabelText(/UserId/i)

        fireEvent.change(receiverNumberElement, { target: { value: '' } })
        fireEvent.change(userIdElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveReceiverButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveReceiverButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(2)
    })
})
