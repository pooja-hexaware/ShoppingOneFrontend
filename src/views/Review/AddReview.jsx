import { Breadcrumb, SimpleCard } from 'components'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addReview, fetchReview } from './store/Review.action'

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

const AddReview = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [reviewNumber, setReviewNumber] = useState('')
    const [rating, setRating] = useState('')
    const [content, setContent] = useState('')

    const handleReviewNumber = (e) => setReviewNumber(parseInt(e.target.value))
    const handleRating = (e) => setRating(parseInt(e.target.value))
    const handleContent = (e) => setContent(e.target.value)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            addReview({
                reviewNumber,
                rating,
                content,
            })
        ).then(() => {
            dispatch(fetchReview())
        })
        navigate('/Review')
    }

    useEffect(() => {
        return () => {
            setReviewNumber('')
            setRating('')
            setContent('')
        }
    }, [])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'AddReview', path: '/Review' },
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
                                name="reviewNumber"
                                id="reviewNumberInput"
                                onChange={handleReviewNumber}
                                value={reviewNumber || ''}
                                label="ReviewNumber"
                            />

                            <TextField
                                type="number"
                                name="rating"
                                id="ratingInput"
                                onChange={handleRating}
                                value={rating || ''}
                                label="Rating"
                            />

                            <TextField
                                type="text"
                                name="content"
                                id="contentInput"
                                onChange={handleContent}
                                value={content}
                                label="Content"
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

export default AddReview
