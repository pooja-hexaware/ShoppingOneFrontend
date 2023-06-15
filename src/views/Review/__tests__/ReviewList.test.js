const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import ReviewList from '../ReviewList'
import axios from '../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Review rows when api response has data', async () => {
    const endPoint = 'review'
    const getReviewListResponse = [
        {
            id: 1,
            reviewNumber: 17,
            rating: 99,
            content: 'content',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getReviewListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <ReviewList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const reviewReviewNumberCell = await screen.findByText(/17/i)

    expect(reviewReviewNumberCell).toHaveTextContent(/17/i)
    mock.reset()
})
