const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import SenderList from '../SenderList'
import axios from '../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Sender rows when api response has data', async () => {
    const endPoint = 'sender'
    const getSenderListResponse = [
        {
            id: 1,
            senderNumber: 56,
            userId: 39,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getSenderListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <SenderList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const senderSenderNumberCell = await screen.findByText(/56/i)

    expect(senderSenderNumberCell).toHaveTextContent(/56/i)
    mock.reset()
})
