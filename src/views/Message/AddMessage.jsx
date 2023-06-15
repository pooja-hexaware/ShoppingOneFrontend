import { Breadcrumb, SimpleCard } from 'components'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addMessage, fetchMessage } from './store/Message.action'

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

const AddMessage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [messageNumber, setMessageNumber] = useState('')
    const [senderNumber, setSenderNumber] = useState('')
    const [receiverNumber, setReceiverNumber] = useState('')
    const [content, setContent] = useState('')

    const handleMessageNumber = (e) => setMessageNumber(e.target.value)
    const handleSenderNumber = (e) => setSenderNumber(e.target.value)
    const handleReceiverNumber = (e) => setReceiverNumber(e.target.value)
    const handleContent = (e) => setContent(e.target.value)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            addMessage({
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

    useEffect(() => {
        return () => {
            setMessageNumber('')
            setSenderNumber('')
            setReceiverNumber('')
            setContent('')
        }
    }, [])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'AddMessage', path: '/Message' },
                        { name: 'Form' },
                    ]}
                />
            </div>
            <SimpleCard title="Add Form">
                <ValidatorForm onSubmit={handleClick} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                type="text"
                                name="messageNumber"
                                id="messageNumberInput"
                                onChange={handleMessageNumber}
                                value={messageNumber}
                                label="MessageNumber"
                            />

                            <TextField
                                type="text"
                                name="senderNumber"
                                id="senderNumberInput"
                                onChange={handleSenderNumber}
                                value={senderNumber}
                                label="SenderNumber"
                            />

                            <TextField
                                type="text"
                                name="receiverNumber"
                                id="receiverNumberInput"
                                onChange={handleReceiverNumber}
                                value={receiverNumber}
                                label="ReceiverNumber"
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

export default AddMessage
