import {
    WEBINFO_FAIL,
    WEBINFO_REQUEST,
    WEBINFO_SUCCESS
} from '../actionType'

export const webinfoReducer = (
   state = {
      loading: true,
      webinfo: null,
   },
   action
) => {
   const { payload, type } = action

   switch (type) {
      case WEBINFO_REQUEST:
         return {
            ...state,
            loading: true,
         }
      case WEBINFO_SUCCESS:
         return {
            ...state,
            webinfo: payload,
            loading: false,
         }
      case WEBINFO_FAIL:
         return {
            ...state,
            loading: false,
            error: payload,
         }

      default:
         return state
   }
}
