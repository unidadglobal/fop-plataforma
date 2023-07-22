export default function validateInfo(values) {
    let errors = {};
  
    if (!values.nombre.trim()) {
      errors.nombre = 'Completá tu Nombre y Apellido';
    }
    else if (values.nombre.trim().length >= 35) {
      errors.nombre = 'El nombre ingresado es muy largo';
    }
    else if (!/^[A-Za-záéíóúÁÉÍÓÚäëïöüÄËÏÖÜñÑ' `]+$/.test(values.nombre.trim())) {
      errors.nombre = 'Tu Nombre sólo puede contener letras';
    }

    if (!values.nacionalidad.trim()) {
      errors.nacionalidad = 'Completá tu Nacionalidad';
    }
    else if (values.nacionalidad.trim().length >= 25) {
      errors.nacionalidad = 'La nacionalidad ingresada es muy larga';
    }
    else if (!/^[A-Za-záéíóúÁÉÍÓÚäëïöüÄËÏÖÜñÑ' `]+$/.test(values.nacionalidad.trim())) {
      errors.nacionalidad = 'Tu Nacionalidad sólo puede contener letras';
    }

    if (!values.documento.trim()) {
      errors.documento = 'Completá tu Nº de Documento';
    }
    else if (values.documento.trim().length >= 12) {
      errors.documento = 'El DNI ingresado es muy largo';
    }
    else if (!/^[0-9]+$/.test(values.documento.trim())) {
      errors.documento = 'Tu DNI sólo puede contener números';
    }

    if (!values.whatsapp.trim()) {
      errors.whatsapp = 'Completá tu Whatsapp';
    }
    else if (values.whatsapp.trim().length >= 18) {
      errors.whatsapp = 'El Whatsapp ingresado es muy largo';
    }
    else if (!/^[0-9]+$/.test(values.whatsapp.trim())) {
      errors.whatsapp = 'Tu Whatsapp sólo puede contener números';
    }

    if (calcularFecha(values.nacimiento) < 10){
      errors.nacimiento = "Debés tener mas de 10 años para crear tu Canal"
    }

    if (!values.nombrecanal.trim()) {
      errors.nombrecanal = 'Completá el Nombre del Canal';
    }
    else if (values.nombrecanal.trim().length >= 30) {
      errors.nombrecanal = 'El nombre ingresado es muy largo';
    }
    else if (!/^[A-Za-z0-9áéíóúÁÉÍÓÚäëïöüÄËÏÖÜñÑ'-_,./& `]+$/.test(values.nombre.trim())) {
      errors.nombrecanal = 'No se aceptan caracteres especiales';
    }

    if (!values.tipocontenido.trim()) {
      errors.tipocontenido = 'Completá el Tipo de Contenido';
    }
    else if (values.tipocontenido.trim().length > 50) {
      errors.tipocontenido = 'El texto ingresado es muy largo';
    }
    

    if (!values.descripcion.trim()) {
      errors.descripcion = 'Completá la Descripción de tu Canal';
    }
    else if (values.descripcion.trim().length > 140) {
      errors.descripcion = 'La descripción es demasiado larga';
    }

    if (!values.logo.value || !values.logo.value.trim()) {
      errors.logo = 'Subí una imagen que represente a tu Canal';
    }
    else if (
      !values.logo.value.trim().endsWith(".jpg") &&
      !values.logo.value.trim().endsWith(".jpeg") &&
      !values.logo.value.trim().endsWith(".png")
    ){
      errors.logo = 'Solo aceptamos imágenes JPG o PNG'
    }
    else if (values.logo.size > 3000000){
      errors.logo = 'El logo no puede pesar más de 3 MB'
    }

    return errors;
}

function calcularFecha(fecha) {
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  var currentMonth = currentDate.getMonth();
  var currentDay = currentDate.getDate(); 

  var birthYear = fecha.getFullYear();
  var birthMonth = fecha.getMonth();
  var birthDay = fecha.getDate(); 

  var calculatedAge = currentYear - birthYear;

  if (currentMonth < birthMonth - 1) {
      calculatedAge--;
  }
  if (birthMonth - 1 === currentMonth && currentDay < birthDay) {
      calculatedAge--;
  }
  return calculatedAge;
}