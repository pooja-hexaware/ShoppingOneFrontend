import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editOrder, fetchOrder } from './store/Order.action'
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

const EditOrder = () => {
    const { id: OrderId } = useParams()

    const Order = useSelector((state) =>
        state.Order.entities.find(
            (Order) => Order.id.toString() === OrderId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [orderNumber, setOrderNumber] = useState(Order.orderNumber)

    const [totalAmt, setTotalAmt] = useState(Order.totalAmt)

    const [orderDate, setOrderDate] = useState(Order.orderDate.split('T')[0])

    const handleOrderNumber = (e) => setOrderNumber(parseInt(e.target.value))
    const handleTotalAmt = (e) => setTotalAmt(parseFloat(e.target.value))
    const handleOrderDate = (e) => setOrderDate(e.target.value)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editOrder({
                id: OrderId,
                orderNumber,
                totalAmt,
                orderDate,
            })
        ).then(() => {
            dispatch(fetchOrder())
        })
        navigate('/Order')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditOrder', path: '/Order' },
                        { name: 'Form' },
                    ]}
                />
            </div>
            <SimpleCard title="Edit Form">
                <ValidatorForm onSubmit={handleClick} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                type="number"
                                name="orderNumber"
                                id="orderNumberInput"
                                onChange={handleOrderNumber}
                                value={orderNumber || ''}
                                validators={['required']}
                                label="OrderNumber"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="number"
                                name="totalAmt"
                                id="totalAmtInput"
                                onChange={handleTotalAmt}
                                value={totalAmt || ''}
                                validators={['required']}
                                label="TotalAmt"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="date"
                                name="orderDate"
                                id="orderDateInput"
                                onChange={handleOrderDate}
                                value={orderDate}
                                validators={['required']}
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

export default EditOrder
