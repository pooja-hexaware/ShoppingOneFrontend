import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editReview, fetchReview } from './store/Review.action'
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

const EditReview = () => {
    const { id: ReviewId } = useParams()

    const Review = useSelector((state) =>
        state.Review.entities.find(
            (Review) => Review.id.toString() === ReviewId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [reviewNumber, setReviewNumber] = useState(Review.reviewNumber)

    const [rating, setRating] = useState(Review.rating)

    const [content, setContent] = useState(Review.content)

    const handleReviewNumber = (e) => setReviewNumber(parseInt(e.target.value))
    const handleRating = (e) => setRating(parseInt(e.target.value))
    const handleContent = (e) => setContent(e.target.value)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editReview({
                id: ReviewId,
                reviewNumber,
                rating,
                content,
            })
        ).then(() => {
            dispatch(fetchReview())
        })
        navigate('/Review')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditReview', path: '/Review' },
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
                                name="reviewNumber"
                                id="reviewNumberInput"
                                onChange={handleReviewNumber}
                                value={reviewNumber || ''}
                                validators={['required']}
                                label="ReviewNumber"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="number"
                                name="rating"
                                id="ratingInput"
                                onChange={handleRating}
                                value={rating || ''}
                                validators={['required']}
                                label="Rating"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="content"
                                id="contentInput"
                                onChange={handleContent}
                                value={content}
                                validators={['required']}
                                label="Content"
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

export default EditReview
