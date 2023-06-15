const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import ProductList from '../ProductList'
import axios from '../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Product rows when api response has data', async () => {
    const endPoint = 'product'
    const getProductListResponse = [
        {
            id: 1,
            productNumber: 62,
            productName: 'productName',
            description: false,
            price: 76.66,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getProductListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <ProductList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const productProductNumberCell = await screen.findByText(/62/i)

    expect(productProductNumberCell).toHaveTextContent(/62/i)
    mock.reset()
})
