import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editProduct, fetchProduct } from './store/Product.action'
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

const EditProduct = () => {
    const { id: ProductId } = useParams()

    const Product = useSelector((state) =>
        state.Product.entities.find(
            (Product) => Product.id.toString() === ProductId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [productNumber, setProductNumber] = useState(Product.productNumber)

    const [productName, setProductName] = useState(Product.productName)

    const [description, setDescription] = useState(Product.description)

    const [price, setPrice] = useState(Product.price)

    const handleProductNumber = (e) =>
        setProductNumber(parseInt(e.target.value))
    const handleProductName = (e) => setProductName(e.target.value)
    const handleDescription = (e) => setDescription(e.target.value)
    const handlePrice = (e) => setPrice(parseFloat(e.target.value))

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editProduct({
                id: ProductId,
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

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditProduct', path: '/Product' },
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
                                name="productNumber"
                                id="productNumberInput"
                                onChange={handleProductNumber}
                                value={productNumber || ''}
                                validators={['required']}
                                label="ProductNumber"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="productName"
                                id="productNameInput"
                                onChange={handleProductName}
                                value={productName}
                                validators={['required']}
                                label="ProductName"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                value={description}
                                onChange={handleDescription}
                                select
                                id="descriptionInput"
                                label="Description"
                                validators={['required']}
                                errorMessages={['this field is required']}
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

export default EditProduct
