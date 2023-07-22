import {
    GET_RADIO_FAIL,
    GET_RADIO_REQUEST,
    GET_RADIO_SUCCESS
} from '../actionType'

export const radioReducer = (
   state = {
      loading: true,
      radio: null,
   },
   action
) => {
   const { payload, type } = action

   switch (type) {
      case GET_RADIO_REQUEST:
         return {
            ...state,
            loading: true,
         }
      case GET_RADIO_SUCCESS:
         return {
            ...state,
            radio: payload,
            loading: false,
         }
      case GET_RADIO_FAIL:
         return {
            ...state,
            loading: false,
            error: payload,
         }

      default:
         return state
   }
}
