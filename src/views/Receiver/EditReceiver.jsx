import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editReceiver, fetchReceiver } from './store/Receiver.action'
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

const EditReceiver = () => {
    const { id: ReceiverId } = useParams()

    const Receiver = useSelector((state) =>
        state.Receiver.entities.find(
            (Receiver) => Receiver.id.toString() === ReceiverId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [receiverNumber, setReceiverNumber] = useState(
        Receiver.receiverNumber
    )

    const [userId, setUserId] = useState(Receiver.userId)

    const handleReceiverNumber = (e) =>
        setReceiverNumber(parseInt(e.target.value))
    const handleUserId = (e) => setUserId(parseInt(e.target.value))

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editReceiver({
                id: ReceiverId,
                receiverNumber,
                userId,
            })
        ).then(() => {
            dispatch(fetchReceiver())
        })
        navigate('/Receiver')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditReceiver', path: '/Receiver' },
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
                                name="receiverNumber"
                                id="receiverNumberInput"
                                onChange={handleReceiverNumber}
                                value={receiverNumber || ''}
                                validators={['required']}
                                label="ReceiverNumber"
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

export default EditReceiver
