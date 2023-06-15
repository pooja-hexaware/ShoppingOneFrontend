import { Breadcrumb, SimpleCard } from 'components'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addOrder, fetchOrder } from './store/Order.action'

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

const AddOrder = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [orderNumber, setOrderNumber] = useState('')
    const [totalAmt, setTotalAmt] = useState('')
    const [orderDate, setOrderDate] = useState('')

    const handleOrderNumber = (e) => setOrderNumber(parseInt(e.target.value))
    const handleTotalAmt = (e) => setTotalAmt(parseFloat(e.target.value))
    const handleOrderDate = (e) => setOrderDate(e.target.value)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            addOrder({
                orderNumber,
                totalAmt,
                orderDate,
            })
        ).then(() => {
            dispatch(fetchOrder())
        })
        navigate('/Order')
    }

    useEffect(() => {
        return () => {
            setOrderNumber('')
            setTotalAmt('')
            setOrderDate('')
        }
    }, [])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'AddOrder', path: '/Order' },
                        { name: 'Form' },
                    ]}
                />
            </div>
            <SimpleCard title="Add Form">
                <ValidatorForm onSubmit={handleClick} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                type="number"
                                name="orderNumber"
                                id="orderNumberInput"
                                onChange={handleOrderNumber}
                                value={orderNumber || ''}
                                label="OrderNumber"
                            />

                            <TextField
                                type="number"
                                name="totalAmt"
                                id="totalAmtInput"
                                onChange={handleTotalAmt}
                                value={totalAmt || ''}
                                label="TotalAmt"
                            />

                            <TextField
                                type="date"
                                name="orderDate"
                                id="orderDateInput"
                                onChange={handleOrderDate}
                                value={orderDate || ''}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" color="primary" variant="contained">
                        <Icon>add</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Add
                        </Span>
                    </Button>
                </ValidatorForm>
            </SimpleCard>
        </Container>
    )
}

export default AddOrder
