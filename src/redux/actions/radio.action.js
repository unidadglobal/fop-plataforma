import {
   GET_RADIO_FAIL,
   GET_RADIO_REQUEST,
   GET_RADIO_SUCCESS,
} from '../actionType'

import firebase from 'firebase/app'
require('firebase/firestore');
const db = firebase.firestore();

export const getRadioStreaming = () => async (dispatch, getState) => {
   try {
      dispatch({
         type: GET_RADIO_REQUEST,
      })
      
      let radio;
      const docRadio = await db.collection("radios").doc("radio")
         .get();
      if (docRadio.exists && docRadio.data().stream) {
         radio = {
            id: docRadio.id,
            stream: docRadio.data().stream,
            activa: docRadio.data().activa
         }
      }
      dispatch({
         type: GET_RADIO_SUCCESS,
         payload: radio,
      })
   } catch (error) {
      console.log(error)
      dispatch({
         type: GET_RADIO_FAIL,
         payload: error,
      })
   }
}