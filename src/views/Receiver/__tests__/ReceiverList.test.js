const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import ReceiverList from '../ReceiverList'
import axios from '../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Receiver rows when api response has data', async () => {
    const endPoint = 'receiver'
    const getReceiverListResponse = [
        {
            id: 1,
            receiverNumber: 10,
            userId: 97,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getReceiverListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <ReceiverList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const receiverReceiverNumberCell = await screen.findByText(/10/i)

    expect(receiverReceiverNumberCell).toHaveTextContent(/10/i)
    mock.reset()
})
