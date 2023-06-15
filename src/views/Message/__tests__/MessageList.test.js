const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import MessageList from '../MessageList'
import axios from '../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Message rows when api response has data', async () => {
    const endPoint = 'message'
    const getMessageListResponse = [
        {
            id: 1,
            messageNumber: 'messageNumber',
            senderNumber: 'senderNumber',
            receiverNumber: 'receiverNumber',
            content: 'content',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getMessageListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <MessageList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const messageMessageNumberCell = await screen.findByText(/messageNumber/i)

    expect(messageMessageNumberCell).toHaveTextContent(/messageNumber/i)
    mock.reset()
})
