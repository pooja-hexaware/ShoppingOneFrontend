import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editSender, fetchSender } from './store/Sender.action'
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

const EditSender = () => {
    const { id: SenderId } = useParams()

    const Sender = useSelector((state) =>
        state.Sender.entities.find(
            (Sender) => Sender.id.toString() === SenderId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [senderNumber, setSenderNumber] = useState(Sender.senderNumber)

    const [userId, setUserId] = useState(Sender.userId)

    const handleSenderNumber = (e) => setSenderNumber(parseInt(e.target.value))
    const handleUserId = (e) => setUserId(parseInt(e.target.value))

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editSender({
                id: SenderId,
                senderNumber,
                userId,
            })
        ).then(() => {
            dispatch(fetchSender())
        })
        navigate('/Sender')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditSender', path: '/Sender' },
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
                                name="senderNumber"
                                id="senderNumberInput"
                                onChange={handleSenderNumber}
                                value={senderNumber || ''}
                                validators={['required']}
                                label="SenderNumber"
                                errorMessages={['this field is required']}
                            />
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

export default EditSender
