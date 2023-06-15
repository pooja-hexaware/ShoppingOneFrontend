const {
    render,
    screen,
    fireEvent,
    within,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import EditProduct from '../EditProduct'
import { ProductAdded } from '../store/ProductSlice'
beforeAll(() => {
    store.dispatch(
        ProductAdded({
            id: 1,
            productNumber: 55,
            productName: 'productName',
            description: true,
            price: 35.25,
        })
    )
})

beforeEach(() => {
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Navigate to="Product/edit/1" replace />
                                }
                            />
                            <Route
                                path="Product/edit/:id"
                                element={<EditProduct />}
                            />
                        </Routes>
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
})

const clickAndWait = async (element) => {
    await act(async () => {
        fireEvent.click(element)
    })

    await act(async () => {
        jest.runOnlyPendingTimers()
    })
}

afterEach(cleanup)

describe('testing view of ProductEdit Component', () => {
    test('should render EditProduct and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveProductButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const productNumberElement = screen.getByLabelText(/ProductNumber/i)
        const productNameElement = screen.getByLabelText(/ProductName/i)
        const descriptionElement = screen.getByLabelText(/Description/i)
        const priceElement = screen.getByLabelText(/Price/i)

        expect(saveProductButtonElement).toBeInTheDocument()

        expect(productNumberElement).toBeInTheDocument()
        expect(productNameElement).toBeInTheDocument()
        expect(descriptionElement).toBeInTheDocument()
        expect(priceElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Product edit form', async () => {
        const productNumberElement = screen.getByLabelText(/ProductNumber/i)
        const productNameElement = screen.getByLabelText(/ProductName/i)
        const descriptionElement = screen.getByLabelText(/Description/i)
        const priceElement = screen.getByLabelText(/Price/i)

        fireEvent.change(productNumberElement, { target: { value: 91 } })
        fireEvent.change(productNameElement, {
            target: { value: 'productName' },
        })
        fireEvent.change(priceElement, { target: { value: 15.19 } })

        expect(productNumberElement.value).toBe(91)
        expect(productNameElement.value).toBe('productName')

        expect(priceElement.value).toBe(15.19)

        fireEvent.mouseDown(descriptionElement)
        const descriptionlistbox = within(screen.getByRole('listbox'))
        fireEvent.click(descriptionlistbox.getByText(/True/))
        expect(descriptionElement).toHaveTextContent(/True/i)
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const productNumberElement = screen.getByLabelText(/ProductNumber/i)
        const productNameElement = screen.getByLabelText(/ProductName/i)
        const priceElement = screen.getByLabelText(/Price/i)

        fireEvent.change(productNumberElement, { target: { value: '' } })
        fireEvent.change(productNameElement, { target: { value: '' } })
        fireEvent.change(priceElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveProductButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveProductButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(3)
    })
})
