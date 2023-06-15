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
import EditUser from '../EditUser'
import { UserAdded } from '../store/UserSlice'
beforeAll(() => {
    store.dispatch(
        UserAdded({
            id: 1,
            userId: 85,
            username: 'username',
            email: 56.64,
            password: 47,
            doj: 'doj',
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
                                element={<Navigate to="User/edit/1" replace />}
                            />
                            <Route
                                path="User/edit/:id"
                                element={<EditUser />}
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

describe('testing view of UserEdit Component', () => {
    test('should render EditUser and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveUserButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const userIdElement = screen.getByLabelText(/UserId/i)
        const usernameElement = screen.getByLabelText(/Username/i)
        const emailElement = screen.getByLabelText(/Email/i)
        const passwordElement = screen.getByLabelText(/Password/i)
        const dojElement = screen.getByLabelText(/Doj/i)

        expect(saveUserButtonElement).toBeInTheDocument()

        expect(userIdElement).toBeInTheDocument()
        expect(usernameElement).toBeInTheDocument()
        expect(emailElement).toBeInTheDocument()
        expect(passwordElement).toBeInTheDocument()
        expect(dojElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of User edit form', async () => {
        const userIdElement = screen.getByLabelText(/UserId/i)
        const usernameElement = screen.getByLabelText(/Username/i)
        const emailElement = screen.getByLabelText(/Email/i)
        const passwordElement = screen.getByLabelText(/Password/i)
        const dojElement = screen.getByLabelText(/Doj/i)

        fireEvent.change(userIdElement, { target: { value: 61 } })
        fireEvent.change(usernameElement, { target: { value: 'username' } })
        fireEvent.change(emailElement, { target: { value: 75.64 } })
        fireEvent.change(passwordElement, { target: { value: 15 } })
        fireEvent.change(dojElement, { target: { value: 'doj' } })

        expect(userIdElement.value).toBe(61)
        expect(usernameElement.value).toBe('username')

        expect(emailElement.value).toBe(75.64)
        expect(passwordElement.value).toBe(15)
        expect(dojElement.value).toBe('doj')
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const userIdElement = screen.getByLabelText(/UserId/i)
        const usernameElement = screen.getByLabelText(/Username/i)
        const emailElement = screen.getByLabelText(/Email/i)
        const passwordElement = screen.getByLabelText(/Password/i)
        const dojElement = screen.getByLabelText(/Doj/i)

        fireEvent.change(userIdElement, { target: { value: '' } })
        fireEvent.change(usernameElement, { target: { value: '' } })
        fireEvent.change(emailElement, { target: { value: '' } })
        fireEvent.change(passwordElement, { target: { value: '' } })
        fireEvent.change(dojElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveUserButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveUserButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(5)
    })
})
