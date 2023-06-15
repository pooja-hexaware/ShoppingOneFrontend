const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import UserList from '../UserList'
import axios from '../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render User rows when api response has data', async () => {
    const endPoint = 'user'
    const getUserListResponse = [
        {
            id: 1,
            userId: 66,
            username: 'username',
            email: 70.23,
            password: 3,
            doj: 'doj',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getUserListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <UserList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const userUserIdCell = await screen.findByText(/66/i)

    expect(userUserIdCell).toHaveTextContent(/66/i)
    mock.reset()
})
