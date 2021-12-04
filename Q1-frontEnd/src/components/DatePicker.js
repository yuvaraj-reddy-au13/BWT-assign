import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

import { Container, Card, Button } from 'react-bootstrap'

import axios from 'axios'

const DatePick = () => {
    const [startDate, setStartDate] = useState(new Date());

    const [date, setDate] = useState('')
    const [data, setData] = useState('')

    const onchangeHandler = async () => {
        const mainValue = moment(startDate).format('YYYY-MM-DD')
        setDate(JSON.stringify(mainValue))
        console.log(date, "date string")

        const resData = await axios.get('https://www.gov.uk/bank-holidays.json')
        setData(resData)
        console.log(resData)

    }

    
    

    return (
        <div style={{marginTop : '0.5rem'}}>
            <Container>
                <label> <strong> Select Date : </strong> </label>
                <DatePicker
                    className='DatePicker'
                    selected={startDate}
                    onChange={(date) => {
                        setStartDate(date)  
                        
                    }}
                />
                <Button className='submit-btn' onClick = {onchangeHandler}>Submit</Button>
            </Container>

            

            <div>
                {data.data && data.data["england-and-wales"].events.map((result) => (
                     (JSON.stringify(result.date) === date) && (
                            <Container>
                                <Card className='england'>
                                    <Card.Body>
                                        <Card.Title>Division : england-and-wales</Card.Title>
                                        <h1>Event Title : {result.title} </h1>
                                        <h3>Date : {result.date}</h3>
                                        <h3>{result.notes && <p> <span>Notes : </span> {result.notes}</p>}</h3>
                                    </Card.Body>
                                </Card>
                            </Container>
                        )
                        
                ))}
            </div>
            <div className='middleDiv'>
                {data.data && data.data["northern-ireland"].events.map((result) => (
                     (JSON.stringify(result.date) === date) && (
                            <Container>
                                <Card className='ireland'>
                                    <Card.Body>
                                        <Card.Title>Division : northern-ireland</Card.Title>
                                        <h1>Event Title : {result.title} </h1>
                                        <h3>Date : {result.date}</h3>
                                        <h3>{result.notes && <p> <span>Notes : </span> {result.notes}</p>}</h3>
                                    </Card.Body>
                                </Card>
                            </Container>
                        )
                        
                ))}
            </div>

            <div>
                {data.data && data.data.scotland.events.map((result) => (
                     (JSON.stringify(result.date) === date) && (
                            <Container>
                                <Card className='scotland'>
                                    <Card.Body>
                                        <Card.Title>Division : scotland</Card.Title>
                                        <h1>Event Title : {result.title} </h1>
                                        <h3>Date : {result.date}</h3>
                                        <h3>{result.notes && <p> <span>Notes : </span> {result.notes}</p>}</h3>
                                    </Card.Body>
                                </Card>
                            </Container>
                        )
                        
                ))}
            </div>

      </div>
    );
  };


export default DatePick;