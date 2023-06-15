import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editOrderItem, fetchOrderItem } from './store/OrderItem.action'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const EditOrderItem = () => {
    const { id: OrderItemId } = useParams()

    const OrderItem = useSelector((state) =>
        state.OrderItem.entities.find(
            (OrderItem) => OrderItem.id.toString() === OrderItemId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [productNumber, setProductNumber] = useState(OrderItem.productNumber)

    const [quantity, setQuantity] = useState(OrderItem.quantity)

    const [price, setPrice] = useState(OrderItem.price)

    const handleProductNumber = (e) => setProductNumber(e.target.value)
    const handleQuantity = (e) => setQuantity(parseInt(e.target.value))
    const handlePrice = (e) => setPrice(parseFloat(e.target.value))

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editOrderItem({
                id: OrderItemId,
                productNumber,
                quantity,
                price,
            })
        ).then(() => {
            dispatch(fetchOrderItem())
        })
        navigate('/OrderItem')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditOrderItem', path: '/OrderItem' },
                        { name: 'Form' },
                    ]}
                />
            </div>
            <SimpleCard title="Edit Form">
                <ValidatorForm onSubmit={handleClick} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                type="text"
                                name="productNumber"
                                id="productNumberInput"
                                onChange={handleProductNumber}
                                value={productNumber}
                                validators={['required']}
                                label="ProductNumber"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="number"
                                name="quantity"
                                id="quantityInput"
                                onChange={handleQuantity}
                                value={quantity || ''}
                                validators={['required']}
                                label="Quantity"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="number"
                                name="price"
                                id="priceInput"
                                onChange={handlePrice}
                                value={price || ''}
                                validators={['required']}
                                label="Price"
                                errorMessages={['this field is required']}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" color="primary" variant="contained">
                        <Icon>send</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Save
                        </Span>
                    </Button>
                </ValidatorForm>
            </SimpleCard>
        </Container>
    )
}

export default EditOrderItem
