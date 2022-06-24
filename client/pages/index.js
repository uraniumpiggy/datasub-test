import { useMutation } from '@apollo/client';
import { Button, Card, CardActions, CardContent, Container, TextField, Grid, CardHeader } from '@mui/material';
import React, { useState } from 'react';
import { ADD_NEW_CARD } from '../graphql/queries';
import { cardNumberFormatter } from '../utils/cardFormatter';
import { expDateFormatter } from '../utils/expDateFromatter';

const Index = () => {
    const [cardNumber, setCardNumber] = useState('')
    const [expDate, setExpDate] = useState('')
    const [isCardCorrect, setCardCorrect] = useState(false)
    const [isExpDateCorrect, setExpDateCorrect] = useState(false)
    const [isCvvCorrect, setCvvCorrect] = useState(false)
    const [isAmountCorrect, setAmountCorrect] = useState(false)
    const [addCard] = useMutation(ADD_NEW_CARD)

    const handleDataSending = (e) => {
        e.preventDefault()
        const data = {
            CardNumber: e.target.cardNumber.value,
            ExpDate: e.target.expDate.value,
            Cvv: e.target.cvv.value,
            Amount: e.target.amount.value,
        }

        addCard({
            variables: {
                input: data
            }
        }).catch(error => {
            console.log(error)
        }).then(data => {
            console.log(data)
        })
    }

    return (
        <Container
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh'
            }}
            component='form'
            onSubmit={handleDataSending}
            
        >
            <Card>
                <CardHeader title='Enter your card'/>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                className='textField'
                                fullWidth
                                placeholder='XXXX XXXX XXXX XXXX' 
                                label='Card Number' 
                                value={cardNumber} 
                                onChange={(e) => {
                                    cardNumberFormatter(e.target.value, cardNumber, setCardNumber, setCardCorrect)
                                }} 
                                inputProps={{ maxLength: 19 }}
                                name='cardNumber'
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                className='textField' 
                                fullWidth
                                placeholder='MM/YYYY' 
                                label='Expiration Date' 
                                value={expDate} 
                                onChange={(e) => {
                                    expDateFormatter(e.target.value, expDate, setExpDate, setExpDateCorrect)
                                }} 
                                inputProps={{ maxLength: 7 }}
                                name='expDate'
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                className='textField' 
                                fullWidth
                                placeholder='XXX' 
                                label='Cvv' 
                                type='number' 
                                onInput={(e)=>{ 
                                    if (e.target.value !== '' && !isNaN(e.target.value)) {
                                        e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,3)
                                    }
                                    if (e.target.value.length === 3) {
                                        setCvvCorrect(true)
                                    } else {
                                        setCvvCorrect(false)
                                    }
                                }}
                                name='cvv'
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        className='textField'
                        sx={{marginTop: '40px'}}
                        label='Amount' 
                        type='number' 
                        name='amount'
                        onInput={(e) => {
                            if (e.target.value[0] !== '0' && e.target.value.length > 0) {
                                setAmountCorrect(true)
                            } else {
                                setAmountCorrect(false)
                            }
                        }}
                    />
                </CardContent>
                <CardActions>
                    <Button
                        className='submitButton'
                        type='submit' 
                        disabled={!(isExpDateCorrect && isCvvCorrect && isCardCorrect && isAmountCorrect)}
                    >Send Data</Button>
                </CardActions>
            </Card>
        </Container>
    );
}

export default Index;
