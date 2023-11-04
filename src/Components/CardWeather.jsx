import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Col, Container, Row } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';

const CardWeather = () => {

    const [City, setCity] = useState('')
    const [WeatherInfo, setWeatherInfo] = useState(null)

    useEffect(() => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${City}&units=metric&APPID=eab8934730ab04055c1ebc62023b22a5`)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Problema nel recupero dei dati');
                }
            })
            .then((data) => {
                setWeatherInfo(data);
                console.log(data)
            })
            .catch((error) => {
                console.error('Errore nella fetch', error);
            });
    }, [City]);

    const ChangeCity = (event) => (
        setCity(event)
    )

    return (
        <>
            <Container fluid className='container'>
                <Row className='justify-content-center align-items-center'>
                    <Col className='col-12'>
                        <Form>
                            <Container className='d-flex flex-row align-content-center justify-content-center'>
                                <Form.Group className="mb-3">
                                    <Form.Label className='text-center'>Search by City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="City"
                                        value={City}
                                        onChange={e => (ChangeCity(e.target.value))}
                                    />
                                </Form.Group>
                            </Container>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <Container fluid className='container mt-3'>
                <Row className='justify-content-center align-items-center'>
                    {WeatherInfo !== null ? (
                        <Col className='col-12 col-mb-10'>
                            <Card className='greycard'>
                                <Card.Body>
                                    <Card.Title className='fs-2'>
                                        {WeatherInfo.name} <Image src={"http://openweathermap.org/img/w/" + WeatherInfo.weather[0].icon + ".png"} rounded />
                                    </Card.Title>
                                    <Card.Text>
                                        The weather in {WeatherInfo.name} is: {WeatherInfo ? WeatherInfo.weather[0].description : 'Today Weather'}
                                    </Card.Text>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item>Temp Max: {WeatherInfo.main.temp_max} °C</ListGroup.Item>
                                    <ListGroup.Item>Temp Min: {WeatherInfo.main.temp_min} °C</ListGroup.Item>
                                    <ListGroup.Item>Humidity: {WeatherInfo.main.humidity} %</ListGroup.Item>
                                    <ListGroup.Item>Wind: {WeatherInfo.wind.speed} Knots / {WeatherInfo.wind.deg}° </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    ) : (
                        <p></p>
                    )}
                </Row>
            </Container>
        </>
    );
};

export default CardWeather;