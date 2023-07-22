import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import {
  sendForm
} from '../redux/actions/auth.action'

const useForm = (callback, validate) => {
  const dispatch = useDispatch()
  const [values, setValues] = useState({
    nombre: '',
    nacimiento: new Date(),
    nacionalidad: '',
    documento: '',
    whatsapp: '',
    nombrecanal: '',
    tipocontenido: '',
    descripcion: '',
    logo: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    if (e.target && e.target.type === "file"){
      const { name, value} = e.target;
      const size = e.target.files[0] ? e.target.files[0].size : null;
      const file = e.target.files[0];
      setValues({
        ...values,
        [name]: {
          value,
          size,
          file
        }
      });
      
    }
    else{
      const { name, value } = !e.target ? e : e.target;
      setValues({
        ...values,
        [name]: value
      });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
    
  };

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        dispatch(sendForm(values));
      }
    },
    [errors]
  );

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;