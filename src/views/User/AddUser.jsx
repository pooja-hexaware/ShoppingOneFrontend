import { Breadcrumb, SimpleCard } from 'components'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addUser, fetchUser } from './store/User.action'

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

const AddUser = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [userId, setUserId] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [doj, setDoj] = useState('')

    const handleUserId = (e) => setUserId(parseInt(e.target.value))
    const handleUsername = (e) => setUsername(e.target.value)
    const handleEmail = (e) => setEmail(parseFloat(e.target.value))
    const handlePassword = (e) => setPassword(parseInt(e.target.value))
    const handleDoj = (e) => setDoj(e.target.value)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            addUser({
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

    useEffect(() => {
        return () => {
            setUserId('')
            setUsername('')
            setEmail('')
            setPassword('')
            setDoj('')
        }
    }, [])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'AddUser', path: '/User' },
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
                                name="userId"
                                id="userIdInput"
                                onChange={handleUserId}
                                value={userId || ''}
                                label="UserId"
                            />

                            <TextField
                                type="text"
                                name="username"
                                id="usernameInput"
                                onChange={handleUsername}
                                value={username}
                                label="Username"
                            />

                            <TextField
                                type="number"
                                name="email"
                                id="emailInput"
                                onChange={handleEmail}
                                value={email || ''}
                                label="Email"
                            />

                            <TextField
                                type="number"
                                name="password"
                                id="passwordInput"
                                onChange={handlePassword}
                                value={password || ''}
                                label="Password"
                            />

                            <TextField
                                type="date"
                                name="doj"
                                id="dojInput"
                                onChange={handleDoj}
                                value={doj || ''}
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

export default AddUser
