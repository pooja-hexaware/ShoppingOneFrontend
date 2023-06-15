const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import CategoryList from '../CategoryList'
import axios from '../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Category rows when api response has data', async () => {
    const endPoint = 'category'
    const getCategoryListResponse = [
        {
            id: 1,
            categoryNumber: 56,
            categoryName: 'categoryName',
            description: false,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getCategoryListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <CategoryList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const categoryCategoryNumberCell = await screen.findByText(/56/i)

    expect(categoryCategoryNumberCell).toHaveTextContent(/56/i)
    mock.reset()
})
