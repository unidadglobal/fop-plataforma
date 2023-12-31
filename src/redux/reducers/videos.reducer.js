import {
   RELATED_VIDEO_FAIL,
   RELATED_VIDEO_REQUEST,
   RELATED_VIDEO_SUCCESS,
   SELECTED_VIDEO_FAIL,
   SELECTED_VIDEO_REQUEST,
   SELECTED_VIDEO_SUCCESS,
} from '../actionType'

export const selectedVideoReducer = (
   state = {
      loading: true,
      video: null,
   },
   action
) => {
   const { payload, type } = action

   switch (type) {
      case SELECTED_VIDEO_REQUEST:
         return {
            ...state,
            loading: true,
         }
      case SELECTED_VIDEO_SUCCESS:
         return {
            ...state,
            video: payload,
            loading: false,
         }
      case SELECTED_VIDEO_FAIL:
         return {
            ...state,
            video: null,
            loading: false,
            error: payload,
         }

      default:
         return state
   }
}

export const relatedVideoReducer = (
   state = {
      loading: true,
      videos: [],
   },
   action
) => {
   const { payload, type } = action

   switch (type) {
      case RELATED_VIDEO_REQUEST:
         return {
            ...state,
            loading: true,
         }
      case RELATED_VIDEO_SUCCESS:
         return {
            ...state,
            videos: payload,
            loading: false,
         }
      case RELATED_VIDEO_FAIL:
         return {
            ...state,
            loading: false,
            error: payload,
         }

      default:
         return state
   }
}
