import React from 'react';
import './Form.css';
import FormSignup from './FormSignup';
import FormSuccess from './FormSuccess';
import { useSelector } from 'react-redux'
const Form = () => {
  
  const estado = useSelector(state => state.auth)

  return (
    <>
      <div className='form-container'>
        {!estado.esperando_aprobacion ? (
          <FormSignup/>
        ) : (
          <FormSuccess />
        )}
      </div>
    </>
  );
};

export default Form;