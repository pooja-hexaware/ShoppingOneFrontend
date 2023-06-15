import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editMessage, fetchMessage } from './store/Message.action'
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

const EditMessage = () => {
    const { id: MessageId } = useParams()

    const Message = useSelector((state) =>
        state.Message.entities.find(
            (Message) => Message.id.toString() === MessageId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [messageNumber, setMessageNumber] = useState(Message.messageNumber)

    const [senderNumber, setSenderNumber] = useState(Message.senderNumber)

    const [receiverNumber, setReceiverNumber] = useState(Message.receiverNumber)

    const [content, setContent] = useState(Message.content)

    const handleMessageNumber = (e) => setMessageNumber(e.target.value)
    const handleSenderNumber = (e) => setSenderNumber(e.target.value)
    const handleReceiverNumber = (e) => setReceiverNumber(e.target.value)
    const handleContent = (e) => setContent(e.target.value)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editMessage({
                id: MessageId,
                messageNumber,
                senderNumber,
                receiverNumber,
                content,
            })
        ).then(() => {
            dispatch(fetchMessage())
        })
        navigate('/Message')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditMessage', path: '/Message' },
                        { name: 'Form' },
                    ]}
                />
            </div>
            <SimpleCard title="Edit Form">
                <ValidatorForm onSubmit={handleClick} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                type="text"
                                name="messageNumber"
                                id="messageNumberInput"
                                onChange={handleMessageNumber}
                                value={messageNumber}
                                validators={['required']}
                                label="MessageNumber"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="senderNumber"
                                id="senderNumberInput"
                                onChange={handleSenderNumber}
                                value={senderNumber}
                                validators={['required']}
                                label="SenderNumber"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="receiverNumber"
                                id="receiverNumberInput"
                                onChange={handleReceiverNumber}
                                value={receiverNumber}
                                validators={['required']}
                                label="ReceiverNumber"
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

export default EditMessage
