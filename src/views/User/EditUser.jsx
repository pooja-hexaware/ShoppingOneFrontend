import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editUser, fetchUser } from './store/User.action'
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

const EditUser = () => {
    const { id: UserId } = useParams()

    const User = useSelector((state) =>
        state.User.entities.find(
            (User) => User.id.toString() === UserId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [userId, setUserId] = useState(User.userId)

    const [username, setUsername] = useState(User.username)

    const [email, setEmail] = useState(User.email)

    const [password, setPassword] = useState(User.password)

    const [doj, setDoj] = useState(User.doj.split('T')[0])

    const handleUserId = (e) => setUserId(parseInt(e.target.value))
    const handleUsername = (e) => setUsername(e.target.value)
    const handleEmail = (e) => setEmail(parseFloat(e.target.value))
    const handlePassword = (e) => setPassword(parseInt(e.target.value))
    const handleDoj = (e) => setDoj(e.target.value)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editUser({
                id: UserId,
                userId,
                username,
                email,
                password,
                doj,
            })
        ).then(() => {
            dispatch(fetchUser())
        })
        navigate('/User')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditUser', path: '/User' },
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
                                name="userId"
                                id="userIdInput"
                                onChange={handleUserId}
                                value={userId || ''}
                                validators={['required']}
                                label="UserId"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="username"
                                id="usernameInput"
                                onChange={handleUsername}
                                value={username}
                                validators={['required']}
                                label="Username"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="number"
                                name="email"
                                id="emailInput"
                                onChange={handleEmail}
                                value={email || ''}
                                validators={['required']}
                                label="Email"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="number"
                                name="password"
                                id="passwordInput"
                                onChange={handlePassword}
                                value={password || ''}
                                validators={['required']}
                                label="Password"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="date"
                                name="doj"
                                id="dojInput"
                                onChange={handleDoj}
                                value={doj}
                                validators={['required']}
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

export default EditUser
