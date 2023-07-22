import {
   SEARCH_REQUEST,
   SEARCH_SUCCESS,
   SEARCH_FAIL,
   SEARCH_EMPTY
} from '../actionType'

export const searchReducer = (
   state = {
      loading: true,
      resultados: [],
   },
   action
) => {
   const { payload, type } = action

   switch (type) {
      case SEARCH_REQUEST:
         return {
            ...state,
            loading: true,
         }
      case SEARCH_SUCCESS:
         return {
            ...state,
            resultados: payload,
            loading: false,
         }
      case SEARCH_FAIL:
         return {
            ...state,
            loading: false,
            error: payload,
         }
      case SEARCH_EMPTY:
         return {
            ...state,
            loading: false,
            resultados: null,
         }
      default:
         return state
   }
}