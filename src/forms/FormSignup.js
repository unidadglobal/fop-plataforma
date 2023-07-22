import React from 'react';
import validate from './validateInfo';
import useForm from './useForm';
import './Form.css';

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Button, Col, Row } from 'react-bootstrap'

import es from 'date-fns/locale/es';
registerLocale('es', es)

const FormSignup = ({ submitForm }) => {
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );

  const getYear = (date) => {
    return date.getFullYear()
  }

  const getMonth = (date) => {
    return date.getMonth()
  }

  const range = (start, end) => {
    return new Array(end - start).fill().map((d, i) => i + start);
  }

  const years = range(1950, getYear(new Date()) + 1);
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  
  return (
    <Container className="form-content">
      <h1 className="form-h1">
          Para crear tu Canal, deberás completar este formulario y aguardar nuestra aprobación.
        </h1>
      <Row>
        <Col md={6}>
        <h5 className="text-muted text-center mb-4">DATOS PERSONALES</h5>
        <Form onSubmit={handleSubmit}>
        <Form.Row>
        
          <Form.Group as={Col} md={7} controlId="formNombre">
            <Form.Label className="label">Nombre y Apellido</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              placeholder='Ingresá tu Nombre'
              value={values.nombre}
              onChange={handleChange}
              maxLength="35"
              required
            />
            {errors.nombre && <p className='form-inputs'>{errors.nombre}</p>}
          </Form.Group>

          <Form.Group as={Col} md={5} controlId="formNacimiento">
            <Form.Label className="label">Fecha de Nacimiento</Form.Label>
            <br></br>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              className="form-control"
              locale="es"
              name="nacimiento"
              renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div
                  style={{
                    margin: 10,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <button onClick={(e) => {
                    e.preventDefault()
                    decreaseMonth()
                  }} disabled={prevMonthButtonDisabled}>
                    {"<"}
                  </button>
                  <select
                    value={getYear(date)}
                    onChange={({ target: { value } }) => changeYear(value)}
                  >
                    {years.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <select
                    value={months[getMonth(date)]}
                    onChange={({ target: { value } }) =>
                      changeMonth(months.indexOf(value))
                    }
                  >
                    {months.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <button onClick={(e) => {
                    e.preventDefault()
                    increaseMonth()
                  }} disabled={nextMonthButtonDisabled}>
                    {">"}
                  </button>
                </div>
              )}
              value={values.nacimiento}
              selected={values.nacimiento}
              onChange={(date) => {
                handleChange({
                  name: "nacimiento",
                  value: date
                })
              }}
            />
            {errors.nacimiento && <p className='form-inputs'>{errors.nacimiento}</p>}
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formNacionalidad">
          <Form.Label className="label">Nacionalidad</Form.Label>
          <Form.Control
            type="text"
            name="nacionalidad"
            maxLength="25"
            placeholder='Ingresá tu Nacionalidad'
            value={values.nacionalidad}
            onChange={handleChange}
            required
          />
          {errors.nacionalidad && <p className='form-inputs'>{errors.nacionalidad}</p>}
        </Form.Group>

        <Form.Group controlId="formDocumento">
          <Form.Label className="label">Nº de Documento</Form.Label>
          <Form.Control
            type="text"
            name="documento"
            placeholder='Ingresá tu Documento'
            value={values.documento}
            onChange={handleChange}
            maxLength="12"
            required
          />
          {errors.documento && <p className='form-inputs'>{errors.documento}</p>}
        </Form.Group>

        <Form.Group controlId="formWhatsapp">
          <Form.Label className="label">Nº de Whatsapp</Form.Label>
          <Form.Control
            type="text"
            name="whatsapp"
            maxLength="18"
            placeholder='Tu número sin 0 y sin 15'
            value={values.whatsapp}
            onChange={handleChange}
            required
          />
          {errors.whatsapp && <p className='form-inputs'>{errors.whatsapp}</p>}
        </Form.Group>
      </Form>
        </Col>
        <Col md={6}>
        <h5 className="text-muted text-center mb-4">DATOS DE TU CANAL</h5>
        <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="formNombreCanal">
            <Form.Label className="label">Nombre del Canal</Form.Label>
            <Form.Control
              type="text"
              name="nombrecanal"
              placeholder='Ingresá el Nombre del Canal'
              value={values.nombrecanal}
              maxLength="30"
              onChange={handleChange}
              required
            />
            {errors.nombrecanal && <p className='form-inputs'>{errors.nombrecanal}</p>}
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formTipoContenido">
          <Form.Label className="label">Tipo de Contenido</Form.Label>
          <Form.Control
            type="text"
            name="tipocontenido"
            maxLength="50"
            placeholder='Ej: Educativo, Entretenimiento, Religioso, Deportivo...'
            value={values.tipocontenido}
            onChange={handleChange}
            required
          />
          {errors.tipocontenido && <p className='form-inputs'>{errors.tipocontenido}</p>}
        </Form.Group>

        <Form.Group controlId="formDescripcion">
          <Form.Label className="label">Descripción del Canal</Form.Label>
          <Form.Control as="textarea" rows={3}
            name="descripcion"
            placeholder='Breve descripción acerca del contenido que tendrá tu Canal'
            value={values.descripcion}
            onChange={handleChange}
            maxLength="140"
            required
          />
          {errors.descripcion && <p className='form-inputs'>{errors.descripcion}</p>}
        </Form.Group>

        <Form.Group controlId="formLogo">
          <Form.Label className="label">Logo del Canal</Form.Label>
          <Form.Control 
            type="file"
            name="logo"
            accept="image/png, image/jpeg"
            value={values.logo.value}
            onChange={handleChange}
            required
          />
          {errors.logo && <p className='form-inputs'>{errors.logo}</p>}
        </Form.Group>

      </Form>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <Button variant="primary" className="btn-submit" onClick={handleSubmit}>ENVIAR FORMULARIO</Button>
        </Col>
      </Row>
    </Container>
  )
};

export default FormSignup;