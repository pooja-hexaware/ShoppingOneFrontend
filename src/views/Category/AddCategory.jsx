import { Breadcrumb, SimpleCard } from 'components'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addCategory, fetchCategory } from './store/Category.action'

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

const AddCategory = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [categoryNumber, setCategoryNumber] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const [description, setDescription] = useState('')

    const handleCategoryNumber = (e) =>
        setCategoryNumber(parseInt(e.target.value))
    const handleCategoryName = (e) => setCategoryName(e.target.value)
    const handleDescription = (e) => setDescription(e.target.value)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            addCategory({
                categoryNumber,
                categoryName,
                description,
            })
        ).then(() => {
            dispatch(fetchCategory())
        })
        navigate('/Category')
    }

    useEffect(() => {
        return () => {
            setCategoryNumber('')
            setCategoryName('')
            setDescription('')
        }
    }, [])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'AddCategory', path: '/Category' },
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
                                name="categoryNumber"
                                id="categoryNumberInput"
                                onChange={handleCategoryNumber}
                                value={categoryNumber || ''}
                                label="CategoryNumber"
                            />

                            <TextField
                                type="text"
                                name="categoryName"
                                id="categoryNameInput"
                                onChange={handleCategoryName}
                                value={categoryName}
                                label="CategoryName"
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

export default AddCategory
