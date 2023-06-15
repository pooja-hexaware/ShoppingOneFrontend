import { Breadcrumb, SimpleCard } from 'components'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addProduct, fetchProduct } from './store/Product.action'

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

const AddProduct = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [productNumber, setProductNumber] = useState('')
    const [productName, setProductName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')

    const handleProductNumber = (e) =>
        setProductNumber(parseInt(e.target.value))
    const handleProductName = (e) => setProductName(e.target.value)
    const handleDescription = (e) => setDescription(e.target.value)
    const handlePrice = (e) => setPrice(parseFloat(e.target.value))

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            addProduct({
                productNumber,
                productName,
                description,
                price,
            })
        ).then(() => {
            dispatch(fetchProduct())
        })
        navigate('/Product')
    }

    useEffect(() => {
        return () => {
            setProductNumber('')
            setProductName('')
            setDescription('')
            setPrice('')
        }
    }, [])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'AddProduct', path: '/Product' },
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
                                name="productNumber"
                                id="productNumberInput"
                                onChange={handleProductNumber}
                                value={productNumber || ''}
                                label="ProductNumber"
                            />

                            <TextField
                                type="text"
                                name="productName"
                                id="productNameInput"
                                onChange={handleProductName}
                                value={productName}
                                label="ProductName"
                            />

                            <TextField
                                value={description}
                                onChange={handleDescription}
                                select
                                id="descriptionInput"
                                label="Description"
                            >
                                <MenuItem value={true}>True</MenuItem>
                                <MenuItem value={false}>False</MenuItem>
                            </TextField>

                            <TextField
                                type="number"
                                name="price"
                                id="priceInput"
                                onChange={handlePrice}
                                value={price || ''}
                                label="Price"
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

export default AddProduct
