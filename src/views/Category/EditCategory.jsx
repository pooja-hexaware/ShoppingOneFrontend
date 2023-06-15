import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editCategory, fetchCategory } from './store/Category.action'
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

const EditCategory = () => {
    const { id: CategoryId } = useParams()

    const Category = useSelector((state) =>
        state.Category.entities.find(
            (Category) => Category.id.toString() === CategoryId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [categoryNumber, setCategoryNumber] = useState(
        Category.categoryNumber
    )

    const [categoryName, setCategoryName] = useState(Category.categoryName)

    const [description, setDescription] = useState(Category.description)

    const handleCategoryNumber = (e) =>
        setCategoryNumber(parseInt(e.target.value))
    const handleCategoryName = (e) => setCategoryName(e.target.value)
    const handleDescription = (e) => setDescription(e.target.value)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editCategory({
                id: CategoryId,
                categoryNumber,
                categoryName,
                description,
            })
        ).then(() => {
            dispatch(fetchCategory())
        })
        navigate('/Category')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditCategory', path: '/Category' },
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
                                name="categoryNumber"
                                id="categoryNumberInput"
                                onChange={handleCategoryNumber}
                                value={categoryNumber || ''}
                                validators={['required']}
                                label="CategoryNumber"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="categoryName"
                                id="categoryNameInput"
                                onChange={handleCategoryName}
                                value={categoryName}
                                validators={['required']}
                                label="CategoryName"
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

export default EditCategory
