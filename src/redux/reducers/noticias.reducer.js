import {
   GET_CATEGORIAS_REQUEST,
   GET_CATEGORIAS_SUCCESS,
   GET_CATEGORIAS_FAIL,
   GET_NOTICIAS_REQUEST,
   GET_NOTICIAS_SUCCESS,
   GET_NOTICIAS_EMPTY,
   GET_NOTICIAS_FAIL,
   GET_NOTA_REQUEST,
   GET_NOTA_SUCCESS,
   GET_NOTA_FAIL

} from '../actionType'

export const noticiasReducer = (
   state = {
      loading: true,
      categorias: [],
   },
   action
) => {
   const { payload, type } = action

   switch (type) {
      case GET_CATEGORIAS_REQUEST:
         return {
            ...state,
            loading: true,
         }
      case GET_CATEGORIAS_SUCCESS:
         return {
            ...state,
            categorias: payload,
            loading: false,
         }
      case GET_CATEGORIAS_FAIL:
         return {
            ...state,
            loading: false,
            error: payload,
         }
      case GET_NOTICIAS_REQUEST:
         return {
            ...state,
            noticias: null,
            loading: true,
         }
      case GET_NOTICIAS_SUCCESS:
         return {
            ...state,
            noticias: payload,
            loading: false,
         }
      case GET_NOTICIAS_FAIL:
         return {
            ...state,
            loading: false,
            error: payload,
         }
      case GET_NOTICIAS_EMPTY:
         return {
            ...state,
            noticias: null,
            loading: false,
         }
      case GET_NOTA_REQUEST:
         return {
            ...state,
            noticias: null,
            loading: true,
         }
      case GET_NOTA_SUCCESS:
         return {
            ...state,
            nota: payload,
            loading: false,
         }
      case GET_NOTA_FAIL:
         return {
            ...state,
            loading: false,
            error: payload,
         }
      default:
         return state
   }
}
