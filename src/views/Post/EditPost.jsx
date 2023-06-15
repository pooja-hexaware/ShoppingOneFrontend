import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editPost, fetchPost } from './store/Post.action'
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

const EditPost = () => {
    const { id: PostId } = useParams()

    const Post = useSelector((state) =>
        state.Post.entities.find(
            (Post) => Post.id.toString() === PostId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [postNumber, setPostNumber] = useState(Post.postNumber)

    const [title, setTitle] = useState(Post.title)

    const [content, setContent] = useState(Post.content)

    const handlePostNumber = (e) => setPostNumber(parseInt(e.target.value))
    const handleTitle = (e) => setTitle(e.target.value)
    const handleContent = (e) => setContent(e.target.value)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editPost({
                id: PostId,
                postNumber,
                title,
                content,
            })
        ).then(() => {
            dispatch(fetchPost())
        })
        navigate('/Post')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditPost', path: '/Post' },
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
                                name="postNumber"
                                id="postNumberInput"
                                onChange={handlePostNumber}
                                value={postNumber || ''}
                                validators={['required']}
                                label="PostNumber"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="title"
                                id="titleInput"
                                onChange={handleTitle}
                                value={title}
                                validators={['required']}
                                label="Title"
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

export default EditPost
