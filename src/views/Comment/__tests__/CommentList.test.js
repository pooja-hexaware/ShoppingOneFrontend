const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import CommentList from '../CommentList'
import axios from '../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Comment rows when api response has data', async () => {
    const endPoint = 'comment'
    const getCommentListResponse = [
        {
            id: 1,
            commentNumber: 81,
            content: 'content',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getCommentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <CommentList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const commentCommentNumberCell = await screen.findByText(/81/i)

    expect(commentCommentNumberCell).toHaveTextContent(/81/i)
    mock.reset()
})
