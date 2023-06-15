import { Breadcrumb, SimpleCard } from 'components'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addSender, fetchSender } from './store/Sender.action'

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

const AddSender = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [senderNumber, setSenderNumber] = useState('')
    const [userId, setUserId] = useState('')

    const handleSenderNumber = (e) => setSenderNumber(parseInt(e.target.value))
    const handleUserId = (e) => setUserId(parseInt(e.target.value))

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            addSender({
                senderNumber,
                userId,
            })
        ).then(() => {
            dispatch(fetchSender())
        })
        navigate('/Sender')
    }

    useEffect(() => {
        return () => {
            setSenderNumber('')
            setUserId('')
        }
    }, [])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'AddSender', path: '/Sender' },
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
                                name="senderNumber"
                                id="senderNumberInput"
                                onChange={handleSenderNumber}
                                value={senderNumber || ''}
                                label="SenderNumber"
                            />

                            <TextField
                                type="number"
                                name="userId"
                                id="userIdInput"
                                onChange={handleUserId}
                                value={userId || ''}
                                label="UserId"
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

export default AddSender
