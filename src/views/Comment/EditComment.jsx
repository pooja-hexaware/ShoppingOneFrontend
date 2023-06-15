import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editComment, fetchComment } from './store/Comment.action'
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

const EditComment = () => {
    const { id: CommentId } = useParams()

    const Comment = useSelector((state) =>
        state.Comment.entities.find(
            (Comment) => Comment.id.toString() === CommentId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [commentNumber, setCommentNumber] = useState(Comment.commentNumber)

    const [content, setContent] = useState(Comment.content)

    const handleCommentNumber = (e) =>
        setCommentNumber(parseInt(e.target.value))
    const handleContent = (e) => setContent(e.target.value)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editComment({
                id: CommentId,
                commentNumber,
                content,
            })
        ).then(() => {
            dispatch(fetchComment())
        })
        navigate('/Comment')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditComment', path: '/Comment' },
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
                                name="commentNumber"
                                id="commentNumberInput"
                                onChange={handleCommentNumber}
                                value={commentNumber || ''}
                                validators={['required']}
                                label="CommentNumber"
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

export default EditComment
