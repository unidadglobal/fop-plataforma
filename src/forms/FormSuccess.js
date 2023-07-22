import React from 'react';
import './Form.css';
import { FaCheckCircle } from 'react-icons/fa'
import { Container, Row, Col } from 'react-bootstrap'
const FormSuccess = () => {
  return (
    <div className='form-content-right d-flex justify-content-center align-items-center'>
      <Container style={{"height":"300px"}}>
      <Row>
        <Col className="text-center">
          <FaCheckCircle size={80}/>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <h1 className='form-success'>Recibimos tu Formulario!</h1>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <h1 className='form-success2'>Te avisaremos cuando estés listo/a para Crear Contenido.</h1>
        </Col>
      </Row>
      </Container>
    </div>
  );
};

export default FormSuccess;