import { Breadcrumb, SimpleCard } from 'components'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addPost, fetchPost } from './store/Post.action'

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

const AddPost = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [postNumber, setPostNumber] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const handlePostNumber = (e) => setPostNumber(parseInt(e.target.value))
    const handleTitle = (e) => setTitle(e.target.value)
    const handleContent = (e) => setContent(e.target.value)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            addPost({
                postNumber,
                title,
                content,
            })
        ).then(() => {
            dispatch(fetchPost())
        })
        navigate('/Post')
    }

    useEffect(() => {
        return () => {
            setPostNumber('')
            setTitle('')
            setContent('')
        }
    }, [])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'AddPost', path: '/Post' },
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
                                name="postNumber"
                                id="postNumberInput"
                                onChange={handlePostNumber}
                                value={postNumber || ''}
                                label="PostNumber"
                            />

                            <TextField
                                type="text"
                                name="title"
                                id="titleInput"
                                onChange={handleTitle}
                                value={title}
                                label="Title"
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

export default AddPost
