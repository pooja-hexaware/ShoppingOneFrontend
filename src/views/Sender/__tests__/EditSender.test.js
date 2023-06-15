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
import EditSender from '../EditSender'
import { SenderAdded } from '../store/SenderSlice'
beforeAll(() => {
    store.dispatch(
        SenderAdded({
            id: 1,
            senderNumber: 59,
            userId: 97,
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
                                    <Navigate to="Sender/edit/1" replace />
                                }
                            />
                            <Route
                                path="Sender/edit/:id"
                                element={<EditSender />}
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

describe('testing view of SenderEdit Component', () => {
    test('should render EditSender and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveSenderButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const senderNumberElement = screen.getByLabelText(/SenderNumber/i)
        const userIdElement = screen.getByLabelText(/UserId/i)

        expect(saveSenderButtonElement).toBeInTheDocument()

        expect(senderNumberElement).toBeInTheDocument()
        expect(userIdElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Sender edit form', async () => {
        const senderNumberElement = screen.getByLabelText(/SenderNumber/i)
        const userIdElement = screen.getByLabelText(/UserId/i)

        fireEvent.change(senderNumberElement, { target: { value: 26 } })
        fireEvent.change(userIdElement, { target: { value: 41 } })

        expect(senderNumberElement.value).toBe(26)
        expect(userIdElement.value).toBe(41)
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const senderNumberElement = screen.getByLabelText(/SenderNumber/i)
        const userIdElement = screen.getByLabelText(/UserId/i)

        fireEvent.change(senderNumberElement, { target: { value: '' } })
        fireEvent.change(userIdElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveSenderButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveSenderButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(2)
    })
})
