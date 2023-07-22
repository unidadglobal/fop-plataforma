import {
   LOAD_PROFILE,
   LOGIN_FAIL,
   LOGIN_REQUEST,
   LOGIN_SUCCESS,
   LOG_OUT,
   AUTH_CHECKING,
   AUTH_CHECKED,
   AUTH_FAILED,
   AUTH_DENIED,
   AUTH_AWAITING_APPROVAL,
   AUTH_SENDING_FORM
} from '../actionType'

const initialState = {
   accessToken: localStorage.getItem('ytc-access-token')
      ? localStorage.getItem('ytc-access-token')
      : null,
   user: localStorage.getItem('ytc-user')
      ? JSON.parse(localStorage.getItem('ytc-user'))
      : null,
   loading: false,
}

export const authReducer = (prevState = initialState, action) => {
   const { type, payload } = action

   switch (type) {
      case LOGIN_REQUEST:
         return {
            ...prevState,
            loading: true,
         }

      case LOGIN_SUCCESS:
         return {
            ...prevState,
            accessToken: payload,
            loading: false,
         }
      case LOGIN_FAIL:
         return {
            ...prevState,
            accessToken: null,
            loading: false,
            error: payload,
         }
      case LOAD_PROFILE:
         return {
            ...prevState,
            user: payload,
         }

      case LOG_OUT:
         return {
            ...prevState,
            accessToken: null,
            user: null,
         }

      case AUTH_CHECKING:
         return {
            ...prevState,
            loading: true,
         }

      case AUTH_CHECKED:
         return {
            ...prevState,
            autorizado: true,
            loading: false,
         }

      case AUTH_FAILED:
         return {
            ...prevState,
            autorizado: payload,
            loading: false
         }

      case AUTH_DENIED:
         return {
            ...prevState,
            autorizado: false,
            loading: false
         }

      case AUTH_AWAITING_APPROVAL:
         return {
            ...prevState,
            autorizado: false,
            loading: false,
            esperando_aprobacion: true
         }

      case AUTH_SENDING_FORM:
         return {
            ...prevState,
            enviando: true,
            loading: true
         }

      
      default:
         return prevState
   }
}
