const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import PostList from '../PostList'
import axios from '../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Post rows when api response has data', async () => {
    const endPoint = 'post'
    const getPostListResponse = [
        {
            id: 1,
            postNumber: 37,
            title: 'title',
            content: 'content',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getPostListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <PostList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const postPostNumberCell = await screen.findByText(/37/i)

    expect(postPostNumberCell).toHaveTextContent(/37/i)
    mock.reset()
})
