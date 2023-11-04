import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Col, Container, Row } from 'react-bootstrap'
import CardWeather from './Components/CardWeather';


function App() {
  return (
    <div className="App">
      <Container fluid className='container'>
        <Row className='justify-content-center align-items-center'>
          <Col className='col-12'>
            <p className="titlemain">App Meteo</p>
          </Col>
        </Row>
      </Container>
      <CardWeather />


    </div>
  );
}

export default App;
