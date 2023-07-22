import {
    GET_PUBLICIDAD_REQUEST,
    GET_PUBLICIDAD_SUCCESS,
    GET_PUBLICIDAD_FAIL,
} from '../actionType'

export const publicidadReducer = (
    state = {
        loading: true,
        publicidad: [],
    },
    action
) => {
    const { payload, type } = action

    switch (type) {
        case GET_PUBLICIDAD_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_PUBLICIDAD_SUCCESS:
            return {
                ...state,
                publicidad: payload,
                loading: false,
            }
        case GET_PUBLICIDAD_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            }
        default:
            return state
    }
}