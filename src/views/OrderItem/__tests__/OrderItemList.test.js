const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import OrderItemList from '../OrderItemList'
import axios from '../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render OrderItem rows when api response has data', async () => {
    const endPoint = 'orderItem'
    const getOrderItemListResponse = [
        {
            id: 1,
            productNumber: 'productNumber',
            quantity: 95,
            price: 95.65,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getOrderItemListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <OrderItemList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const orderItemProductNumberCell = await screen.findByText(/productNumber/i)

    expect(orderItemProductNumberCell).toHaveTextContent(/productNumber/i)
    mock.reset()
})
